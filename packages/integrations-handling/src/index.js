import axios from "axios";
import { promises as fs, existsSync } from "fs";
import simpleGit from "simple-git";
import * as yaml from "js-yaml";
import remarkSqueezeParagraphs from "remark-squeeze-paragraphs";
import path from "path";
import { remark } from "remark";
import remarkPresetLintConsistent from "remark-preset-lint-consistent";
import remarkPresetLintRecommended from "remark-preset-lint-recommended";
import remarkLintListItemIndent from "remark-lint-list-item-indent";
import remarkGfm from "remark-gfm";

const addTitleToIntegrationDoc = (body, name) => {
  let bodyAlterations = `${body}`;
  const target = "# Integration with JupiterOne";

  const markdownAssetRegularExpression = new RegExp(target, "gi");

  bodyAlterations = bodyAlterations.replace(
    markdownAssetRegularExpression,
    `# ${name} Integration with JupiterOne`
  );
  return bodyAlterations;
};
const addVersionToIntegrationDoc = (body, version) => {
  return `${body} \n<!--  jupiterOneDocVersion=${version} -->`;
};

const cleanIntegrationPageContents = async ({
  integrationName,
  githubFileContents,
  version,
  displayName,
}) => {
  const contents = `${githubFileContents}`;

  const file = await remark()
    .use(remarkSqueezeParagraphs)
    .use(remarkPresetLintRecommended)
    .use(remarkPresetLintConsistent)
    .use(remarkLintListItemIndent)
    .use(remarkGfm)

    .process(contents);

  return {
    githubFileContents: file.toString(),
    integrationName,
    version,
    displayName,
  };
};

function buildGithubDocFileUrl(projectName) {
  return `https://raw.githubusercontent.com/JupiterOne/${projectName}/main/docs/jupiterone.md`;
}

const getRepoVersion = async (projectName) => {
  const url = `https://raw.githubusercontent.com/JupiterOne/${projectName}/main/package.json`;
  const result = await axios.get(url);
  const { data } = result;

  if (data) {
    return data.version.replace(/\./g, "-");
  } else{
    return 'not-found'
  }
};

function getIntegrationDocFileBaseName(displayName) {
  return displayName.trim().toLowerCase().replace(/ /g, "-");
}

export const directoryExists = async (filePath) => {
  try {
    await fs.access(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const createDirIfNotExist = async (dirPath) => {
  const exists = await directoryExists(dirPath);

  if (!exists) {
    return await fs.mkdir(dirPath, { recursive: true });
  }
};

const createFileIfNotExist = async (docFilePath, githubFileContents) => {
  let exists = false;
  if (existsSync(docFilePath)) {
    // path exists
    exists = true;
  } else {
    exists = false;
  }

  if (!exists) {
    try {
      await fs.writeFile(docFilePath, githubFileContents, {
        encoding: "utf-8",
      });
      return true;
    } catch (e) {
      console.log(e, "WRITE Error", docFilePath);
      return false;
    }
  }
  return false;
};

async function generateRenderableIntegrationConfigs(integrationConfigs) {
  const completedRequests = [];

  for (let i = 0; i < integrationConfigs.length; i++) {
    const { projectName, displayName } = integrationConfigs[i];
    let version = undefined;
    try {
      version = await getRepoVersion(projectName);
    } catch (e) {
      console.log("VERSION FETCH ERROR:", projectName);
    }

    try {
      const result = await axios.get(buildGithubDocFileUrl(projectName));

      let docContents = {
        integrationName: projectName,
        githubFileContents: "",
        version,
        displayName: displayName,
      };

      if (result.data) {
        try {
          docContents = await cleanIntegrationPageContents({
            integrationName: projectName,
            githubFileContents: result.data,
            version,
            displayName,
          });
          docContents.githubFileContents = addVersionToIntegrationDoc(
            addTitleToIntegrationDoc(
              docContents.githubFileContents,
              displayName
            ),
            version
          );
        } catch (e) {
          console.log(e, "Markdown cleaning error");
        }
      }

      completedRequests.push(docContents);
    } catch (e) {
      completedRequests.push({
        integrationName: projectName,
        githubFileContents: "not-found",
        version,
        displayName: integrationConfigs[i].displayName,
      });
    }
  }

  return completedRequests;
}

const createAllIntegrationProjectDocFilesFromConfig = async (
  integrationConfigs
) => {
  const renderableConfigs = await generateRenderableIntegrationConfigs(
    integrationConfigs
  );
  const changes = [];
  const existing = [];
  for (let r = 0; r < renderableConfigs.length; r++) {
    const { githubFileContents, version, integrationName, displayName } =
      renderableConfigs[r];
    if (
      githubFileContents !== "" &&
      version !== "not-found" &&
      integrationName
    ) {
      const docDirPath = path.join(
        path.resolve(),
        `../../integrations/${integrationName}`
      );
      const markdownName = `${displayName}-integration_with-JupiterOne-VERSION${version}`;
      await createDirIfNotExist(docDirPath);
      const docFilePath = path.join(
        docDirPath,
        `${markdownName.replace(/\s/g, "-")}.md`
      );

      const createChange = await createFileIfNotExist(
        docFilePath,
        githubFileContents
      );

      if (createChange) {
        changes.push({ githubFileContents, version, integrationName });
      } else {
        existing.push({ githubFileContents, version, integrationName });
      }
    }
  }
  return { changes, existing };
};

async function readDocsConfig(docsConfigFilePath) {
  const fileContents = await fs.readFile(docsConfigFilePath, {
    encoding: "utf-8",
  });

  try {
    const yamlContents = yaml.load(fileContents);
    return yamlContents;
  } catch (err) {
    throw new Error(
      `Failed to convert config file to YAML (path=${fileContents}, msg=${err.message})`
    );
  }
}

const createCommitMessage = (arrayOfDocNames) => {
  const commitInfo = arrayOfDocNames.join(" \n ");

  return `Changes to: \n${commitInfo}`;
};

(async () => {
  const docsConfig = await readDocsConfig(
    path.join(path.resolve("src"), "./integrations.config.yaml")
  );
  // simplegit checkout new branch
  const successes = await createAllIntegrationProjectDocFilesFromConfig(
    docsConfig.integrations
  );
  const changesNeededForPR = successes.changes.map((c) => c.integrationName);
  console.log("Changes added:", changesNeededForPR);
  console.log(
    "Changes MISSING:",
    successes.existing.map((c) => c.integrationName)
  );
  if (changesNeededForPR && changesNeededForPR.length) {
    const dateString = new Date();
    const formatedDate = dateString.toISOString()//.split("T")[0];
    const branchName = `integrationDocs-updated${formatedDate}`;
    const git = simpleGit();
    await git.stash();
    try {
      console.log("Creating branch", branchName);
      await git.checkout(["-b", branchName]);
      await git.stash(["pop"]);
      await git.add(["-A"]);
      await git.commit(["-m", createCommitMessage(changesNeededForPR)]);
      await git.push(["--set-upstream", "origin", branchName]);
    } catch (e) {
      console.log("Branch already Exists ", e);
      await git.checkout(branchName);
      await git.pull();
      await git.stash(["pop"]);
      await git.add(["-A"]);
      await git.commit(["-m", createCommitMessage(changesNeededForPR)]);
      await git.push();
    }
    await git.checkout(["-"]);
  }
})().catch((err) => {
  console.error("Error generating integration docs: ", err);
});
