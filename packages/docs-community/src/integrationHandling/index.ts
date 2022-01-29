import axios from "axios";
import fs from "fs";
import * as yaml from "js-yaml";
import path from "path";
import HttpClient from "../httpClient";
import { logger } from "../loggingUtil";
import {
  isArticleType,
  VanillaArticle,
  VanillaKnowledgeCategory,
} from "../utils";
import { editArticle } from "../VanillaAPI";

export interface YamlShape {
  integrations: {
    projectName: string;
    displayName: string;
    knowledgeCategoriesPaths: string;
    ignoreUpdates?: string;
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
  const proceduresPaths = docsConfig.integrations.map((i) =>
    i.ignoreUpdates ? "" : `${i.knowledgeCategoriesPaths}/${i.projectName}.md`
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
    console.log(projectName, "\n error:", e);
  }
};

export interface ProceduresReplaceArticleBodyWithIntegrationReturn {
  alteredProcedures: (VanillaArticle | VanillaKnowledgeCategory)[];
}

export interface ReplaceArticleBodyWithIntegrationProps {
  procedures: (VanillaArticle | VanillaKnowledgeCategory)[];
  httpClient: HttpClient;
}
export const replaceArticleBodyWithIntegration = async ({
  procedures,
  httpClient,
}: ReplaceArticleBodyWithIntegrationProps): Promise<ProceduresReplaceArticleBodyWithIntegrationReturn> => {
  const { integrations } = await readDocsConfig();

  const alteredProcedures: (VanillaArticle | VanillaKnowledgeCategory)[] =
    procedures || [];

  for (let p = 0; p < alteredProcedures.length; p++) {
    const procedure = alteredProcedures[p];
    if (isArticleType(procedure) && procedure.articleID) {
      if (integrations) {
        const [integrationInfo] = integrations.filter(
          (i) =>
            `${i.displayName} Integration with JupiterOne` === procedure.name
        );
        if (integrationInfo) {
          const articleBody = await getProjectDoc(integrationInfo.projectName);
          if (articleBody) {
            const bodyWithremovedFirstTitle = articleBody.replace(
              "# Integration with JupiterOne",
              ""
            );
            procedure.body = bodyWithremovedFirstTitle;
            alteredProcedures[p] = procedure;
            try {
              await editArticle(httpClient, procedure.articleID, {
                body: bodyWithremovedFirstTitle,
              });
            } catch (e) {
              logger.error(
                `error editing for integration doc: ${integrationInfo.projectName}\n ${e}`
              );
            }
          }
        }
      }
    }
  }

  return { alteredProcedures };
};
