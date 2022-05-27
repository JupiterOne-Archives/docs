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

export interface IntegrationsConfigProps {
  integrations: {
    projectName: string;
    displayName: string;
    knowledgeCategoriesPaths: string;
    ignoreUpdates?: string;
    alternateLocationOfDoc?: string;
  }[];
}
export const readDocsConfig = async (): Promise<IntegrationsConfigProps> => {
  const pathOfDocsConfig = path.join(
    __dirname,
    "../../../../integrations.config.yaml"
  );

  const fileContents = await fs.promises.readFile(pathOfDocsConfig, {
    encoding: "utf-8",
  });

  try {
    const yamlContents = yaml.load(fileContents);
    return yamlContents as IntegrationsConfigProps;
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

export const getProjectDoc = async (
  projectName: string,
  alternateLocationOfDoc?: string
) => {
  const url = alternateLocationOfDoc
    ? alternateLocationOfDoc
    : buildGithubDocFileUrl(projectName);
  try {
    const body = await axios.get(url);
    if (body.data) {
      return body.data;
    }
  } catch (e) {
    logger.error(`Get docs error for ${projectName} \n ${e}`);
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
  try {
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
            const articleBody = await getProjectDoc(
              integrationInfo.projectName,
              integrationInfo.alternateLocationOfDoc
            );

            if (articleBody) {
              logger.info(`articleBody found: ${JSON.stringify(articleBody)}`);

              const bodyWithremovedFirstTitle = articleBody.replace(
                "# Integration with JupiterOne",
                ""
              );
              procedure.body = bodyWithremovedFirstTitle;
              alteredProcedures[p] = procedure;
              try {
                logger.info(
                  `editing article with: articleID: ${
                    procedure.articleID
                  } and body: ${JSON.stringify(bodyWithremovedFirstTitle)}`
                );

                const editResult = await editArticle(httpClient, procedure.articleID, {
                  body: bodyWithremovedFirstTitle,
                });

                logger.info(`Edit Article Result: ${JSON.stringify(editResult)}`)
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
  } catch (e) {
    logger.error(`Integrations Yaml Error: ${e}`);
    return { alteredProcedures: [] };
  }
};
