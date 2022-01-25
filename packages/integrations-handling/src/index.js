import axios from "axios";
import { promises as fs, existsSync } from "fs";
// import simpleGit from 'simple-git'
import * as yaml from "js-yaml";

import path from "path";
// import remarkRehype from "remark-rehype";
import { remark } from "remark";
// import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
// import remarkParse from "remark-parse";

// interface DocsConfig {
//   integrations: IntegrationProjectConfig[];
// }

// interface IntegrationProjectConfig {
//   /**
//    * e.g. graph-google-cloud
//    */
//   projectName: string;
//   /**
//    * e.g. Google Cloud
//    */
//   displayName: string;
// }

// type generatedGithubContents = {
//   integrationName: string;
//   githubFileContents: string;
// };
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
  const file = await remark()
    .use(remarkGfm)

    // .use(rehypeStringify)
    // .use(remarkRehype)
    .process(githubFileContents);

  return {
    githubFileContents: file.toString(),
    integrationName,
    version,
    displayName,
  };
};
// interface IntegrationProjectConfigRenderable extends IntegrationProjectConfig {
//   /**
//    * The body contents of the integration documentation
//    */
//   body: string;
// }

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

/**
 * Example input: Google Cloud
 * Example output: google-cloud
 */
function getIntegrationDocFileBaseName(displayName) {
  return displayName.trim().toLowerCase().replace(/ /g, "-");
}

export const directoryOrFileExists = async (filePath) => {
  try {
    await fs.access(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const createDirIfNotExist = async (dirPath) => {
  const exists = await directoryOrFileExists(dirPath);
  console.log(dirPath, "THIS IS THE DUR PATH");
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
      console.log(e, "WRITE ERRRIR");
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
      console.log("VERSION FETCH ERROR");
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
        docContents = await cleanIntegrationPageContents({
          integrationName: projectName,
          githubFileContents: result.data,
          version,
          displayName,
        });
        docContents.githubFileContents = addVersionToIntegrationDoc(
          addTitleToIntegrationDoc(docContents.githubFileContents, displayName),
          version
        );
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
      const docFilePath = path.join(docDirPath, `${markdownName}.md`);
      console.log(docFilePath, "DOCK FILE FATH");
      const createChange = await createFileIfNotExist(
        docFilePath,
        githubFileContents
      );
      console.log(createChange, "createChangecreateChange");
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

(async () => {
  const docsConfig = await readDocsConfig(
    path.join(path.resolve("src"), "./integrations.config.yaml")
  );
  // simplegit checkout new branch
  const successes = await createAllIntegrationProjectDocFilesFromConfig(
    docsConfig.integrations
  );
  console.log(
    "Changes added:",
    successes.changes.map((c) => c.integrationName)
  );
  console.log(
    "Changes MISSING:",
    successes.existing.map((c) => c.integrationName)
  );
  // simplegit if changes commit and push to new branch
})().catch((err) => {
  console.error("Error generating integration docs: ", err);
});
