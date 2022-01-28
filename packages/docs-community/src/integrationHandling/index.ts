import axios from "axios";
import fs from "fs";
import * as yaml from "js-yaml";
import path from "path";

export interface YamlShape {
  integrations: {
    projectName: string;
    displayName: string;
    knowledgeCategoriesPaths: string;
  }[];
}
export const readDocsConfig = async (): Promise<YamlShape> => {
  const pathOfDocsConfig = path.join(
    path.resolve(),
    "../../integrations.config.yaml"
  );

  const fileContents = await fs.promises.readFile(pathOfDocsConfig, {
    encoding: "utf-8",
  });

  try {
    const yamlContents = yaml.load(fileContents);
    return yamlContents as YamlShape;
  } catch (err) {
    throw new Error(
      `Failed to convert config file to YAML (path=${fileContents}, msg=${err.message})`
    );
  }
};

export const createDifsFromConfig = async (): Promise<string[]> => {
  const docsConfig = await readDocsConfig();
  const proceduresPaths = docsConfig.integrations.map(
    (i) => i.knowledgeCategoriesPaths
  );
  return proceduresPaths;
};

export const buildGithubDocFileUrl = (projectName: string) => {
  return `https://raw.githubusercontent.com/JupiterOne/${projectName}/main/docs/jupiterone.md`;
};

export const getProjectDoc = async (projectName: string) => {
  try {
    const body = await axios.get(buildGithubDocFileUrl(projectName));
    if (body.data) {
      return body.data;
    }
  } catch (e) {
    return e;
  }
};
