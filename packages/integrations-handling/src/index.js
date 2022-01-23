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
// .use(remarkParse)
// .use(remarkGfm)
// .use(remarkRehype)
// .use(rehypeStringify)
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
}) => {
  const file = await remark()
    // .use(remarkParse)
    .use(remarkGfm)

    // .use(rehypeStringify)
    // .use(remarkRehype)
    .process(githubFileContents);
  console.log(file, "immafile");
  return {
    githubFileContents: file.toString(),
    integrationName,
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

/**
 * Example input: Google Cloud
 * Example output: google-cloud
 */
function getIntegrationDocFileBaseName(displayName) {
  return displayName.trim().toLowerCase().replace(/ /g, "-");
}

async function createDirIfNotExist(dirPath) {
  try {
    const dir = await fs.stat(dirPath);
    console.log(dirPath, "dirpatsssssh");
    if (!dir.isDirectory()) {
      throw new Error(
        `A file that is not a directory already exists at this path (path=${dirPath})`
      );
    }
  } catch (err) {
    if (err.code == "ENOENT") {
      await fs.mkdir(dirPath);
    } else {
      throw err;
    }
  }
}

async function generateRenderableIntegrationConfigs(integrationConfigs) {
  const completedRequests = [];

  for (let i = 0; i < integrationConfigs.length; i++) {
    try {
      const result = await axios.get(
        buildGithubDocFileUrl(integrationConfigs[i].projectName),
        {}
      );
      let docContents = {
        integrationName: integrationConfigs[i].projectName,
        githubFileContents: result.data,
      };

      if (result.data) {
        docContents = await generateIntegrationPageContents({
          integrationName: integrationConfigs[i].projectName,
          githubFileContents: result.data,
        });
      }

      completedRequests.push(docContents);
    } catch (e) {
      console.log(e, "EEEIRR");
    }
  }
  console.log(completedRequests, "I DIDIDIDID");
  return completedRequests;

  // console.log(completedRequests,'completed reeeeeuuuu')
  //   const result = await pMap(
  //     integrationConfigs,
  //     async (config) => {
  //       const response = await axios.get(
  //         buildGithubDocFileUrl(config.projectName),
  //         {}
  //       );

  //       if (response.status === 404) {
  //         console.log(
  //           "Could not fetch documentation file for project",
  //           config.projectName
  //         );
  //         return null;
  //       }

  //       const docContents = generateIntegrationPageContents({
  //         integrationName: config.displayName,
  //         githubFileContents: await response.data,
  //       });
  //       completedRequests.push(docContents);

  //       const renderableConfig: IntegrationProjectConfigRenderable = {
  //         ...config,
  //         body: docContents.githubFileContents,
  //       };

  //       return renderableConfig;
  //     },
  //     {
  //       concurrency: 5,
  //     }
  //   );
  //   console.log(
  //     completedRequests,
  //     "completedRequestscompletedRequestscompletedRequests"
  //   );
  //   return result.filter(
  //     (r) => r !== null
  //   ) as IntegrationProjectConfigRenderable[];
}

async function createAllIntegrationProjectDocFilesFromConfig(
  integrationConfigs
) {
  const renderableConfigs = await generateRenderableIntegrationConfigs(
    integrationConfigs
  );
  console.log(renderableConfigs, "renderableConfigsrenderableConfigs");
  const getthing = await pMap(renderableConfigs, async (config) => {
    const docDirPath = path.join(
      path.resolve(),
      `./docs/integrations/${getIntegrationDocFileBaseName(
        config.integrationName
      )}`
    );
    console.log(docDirPath, "dddddddooockkk");
    await createDirIfNotExist(docDirPath);

    const docFilePath = path.join(docDirPath, `index.md`);

    await fs.writeFile(docFilePath, config.githubFileContents, {
      encoding: "utf-8",
    });
  });
  console.log("getTHigns", getthing);
}

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

  await createAllIntegrationProjectDocFilesFromConfig(docsConfig.integrations);
})().catch((err) => {
  console.error("Error generating integration docs: ", err);
});
