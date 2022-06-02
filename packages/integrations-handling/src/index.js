import axios from "axios";
import { promises as fs } from "fs";
import * as yaml from "js-yaml";
import path from "path";
import { formatIntegrationFileContents } from "./format.js";

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
  projectName,
  githubFileContents,
  version,
  displayName,
  knowledgeCategoriesPaths,
}) => {
  const contents = `${githubFileContents}`;
  const formattedFile = await formatIntegrationFileContents(contents);

  return {
    githubFileContents: formattedFile,
    projectName,
    version,
    displayName,
    knowledgeCategoriesPaths,
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
  } else {
    return "not-found";
  }
};

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
  try {
    await fs.writeFile(docFilePath, githubFileContents, {
      encoding: "utf-8",
    });
    return true;
  } catch (e) {
    console.log(e, "WRITE Error", docFilePath);
    return false;
  }
};

async function generateRenderableIntegrationConfigs(integrationConfigs) {
  const completedRequests = [];

  for (let i = 0; i < integrationConfigs.length; i++) {
    const {
      projectName,
      displayName,
      knowledgeCategoriesPaths,
      alternateLocationOfDoc,
    } = integrationConfigs[i];
    let version = undefined;
    try {
      version = await getRepoVersion(projectName);
    } catch (e) {
      console.log("VERSION FETCH ERROR:", projectName);
    }

    try {
      let urlLocationOfDoc = buildGithubDocFileUrl(projectName);
      if (alternateLocationOfDoc) {
        urlLocationOfDoc = alternateLocationOfDoc;
      }
      const result = await axios.get(urlLocationOfDoc);

      let docContents = {
        projectName,
        githubFileContents: "",
        version,
        knowledgeCategoriesPaths,
        displayName,
        projectName,
      };

      if (result.data) {
        try {
          docContents = await cleanIntegrationPageContents({
            projectName,
            githubFileContents: result.data,
            version,
            displayName,
            knowledgeCategoriesPaths,
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
        projectName,
        githubFileContents: "not-found",
        version,
        knowledgeCategoriesPaths,
        displayName,
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
    const {
      githubFileContents,
      version,
      projectName,
      knowledgeCategoriesPaths,
    } = renderableConfigs[r];
    console.log(
      projectName,
      "knowledgeCategoriesPaths",
      knowledgeCategoriesPaths
    );
    if (
      githubFileContents !== "" &&
      version !== "not-found" &&
      projectName &&
      knowledgeCategoriesPaths
    ) {
      const docDirPath = path.join(
        path.resolve(),
        `../../knowledgeBase/`,
        knowledgeCategoriesPaths
      );

      const markdownName = `${projectName}`;
      await createDirIfNotExist(docDirPath);
      const docFilePath = path.join(
        docDirPath,
        `${markdownName.replace(/\s/g, "-")}.md`
      );

      await createFileIfNotExist(docFilePath, githubFileContents);

      changes.push({ githubFileContents, version, projectName });
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

(async () => {
  const docsConfig = await readDocsConfig(
    path.join(path.resolve(), "../../integrations.config.yaml")
  );

  const successes = await createAllIntegrationProjectDocFilesFromConfig(
    docsConfig.integrations
  );
  const changesNeededForPR = successes.changes.map((c) => c.projectName);
  console.log("Integrations added:", changesNeededForPR);
  console.log(
    "Integrations NOT Added:",
    successes.existing.map((c) => c.projectName)
  );
})().catch((err) => {
  console.error("Error generating integration docs: ", err);
});
