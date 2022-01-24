import axios from "axios";
import { promises as fs } from "fs";
import * as yaml from "js-yaml";
import pMap from "p-map";
import path from "path";
import remarkRehype from "remark-rehype";
import { remark } from "remark";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";

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

const generateIntegrationPageContents = async ({
  integrationName,
  githubFileContents,
  version,
}) => {
  const file = await remark()
    // .use(remarkParse)
    .use(remarkGfm)

    // .use(rehypeStringify)
    // .use(remarkRehype)
    .process(githubFileContents);

  return {
    githubFileContents: file.toString(),
    integrationName,
    version,
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
    return data.version;
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
  if (!exists) {
    return await fs.mkdir(dirPath, { recursive: true });
  }
};

const createFileIfNotExist = async (docFilePath, githubFileContents) => {
  const exists = await directoryOrFileExists(docFilePath);

  if (!exists) {
    try {
      await fs.writeFile(docFilePath, githubFileContents, {
        encoding: "utf-8",
      });
      return true;
    } catch (e) {
      return false;
    }
  }
};

async function generateRenderableIntegrationConfigs(integrationConfigs) {
  const completedRequests = [];

  for (let i = 0; i < integrationConfigs.length; i++) {
    const projectName = integrationConfigs[i].projectName;

    try {
      const result = await axios.get(buildGithubDocFileUrl(projectName), {});
      const version = await getRepoVersion(projectName);

      let docContents = {
        integrationName: projectName,
        githubFileContents: result.data,
        version,
      };

      if (result.data) {
        docContents = await generateIntegrationPageContents({
          integrationName: projectName,
          githubFileContents: result.data,
          version,
        });
      }

      completedRequests.push(docContents);
    } catch (e) {
      console.log(projectName, ":NOT FOUND");
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
  const missing = [];
  for (let r = 0; r < renderableConfigs.length; r++) {
    const { githubFileContents, version, integrationName } =
      renderableConfigs[r];
    if (
      githubFileContents !== "" &&
      version !== "not-found" &&
      integrationName
    ) {
      const docDirPath = path.join(
        path.resolve(),
        `./integrations/${getIntegrationDocFileBaseName(integrationName)}`
      );

      await createDirIfNotExist(docDirPath);
      const docFilePath = path.join(
        docDirPath,
        `${version.replace(/\./g, "-")}.md`
      );

      const createChange = await createFileIfNotExist(docFilePath);

      if (createChange) {
        changes.push({ githubFileContents, version, integrationName });
      }
    } else {
      missing.push({ githubFileContents, version, integrationName });
    }
  }
  return { changes, missing };
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

  const successes = await createAllIntegrationProjectDocFilesFromConfig(
    docsConfig.integrations
  );
  console.log(
    "Changes added:",
    successes.changes.map((c) => i.integrationName)
  );
  console.log(
    "Changes MISSING:",
    successes.missing.map((c) => i.integrationName)
  );
})().catch((err) => {
  console.error("Error generating integration docs: ", err);
});
