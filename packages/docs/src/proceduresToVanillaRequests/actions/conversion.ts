import HttpClient from '../../httpClient';
import { logger } from '../../loggingUtil';
import {
  directoryExists,
  FLAG_FOR_DELETE,
  isKnowledgeCategoryType,
  KNOWN_CATEGORY_BEEN_DELETED,
  VanillaArticle,
  VanillaKnowledgeCategory,
} from '../../utils';
import {
  createArticle,
  createKnowledgeCategory,
  deleteAllFlaggedCategories,
  deleteArticle,
  editArticle,
  editKnowledgeCategory,
} from '../../VanillaAPI';
import { addImagesToArticleMarkdown } from '../utils';

export const procedureToKnowledgeCategory = async (
  httpClient: HttpClient,
  procedureWorkedOn: VanillaKnowledgeCategory,
  previousknowledgeCategoryID: null | number
): Promise<VanillaKnowledgeCategory> => {
  let tempProcedureWorkedOn = { ...procedureWorkedOn };
  let isReleaseNotes = false;

  if (
    procedureWorkedOn.path &&
    procedureWorkedOn.path.toLowerCase().indexOf('release-notes') !== -1
  ) {
    isReleaseNotes = true;
  }

  const directoryExistsResult = directoryExists(tempProcedureWorkedOn?.path);

  if (tempProcedureWorkedOn.knowledgeCategoryID !== null) {
    if (directoryExistsResult) {
      if (previousknowledgeCategoryID) {
        const requestForEdit = {
          parentID: previousknowledgeCategoryID,
          name: tempProcedureWorkedOn.name,
          knowledgeBaseID: isReleaseNotes
            ? 2
            : tempProcedureWorkedOn.knowledgeBaseID,
        };
        try {
          const editedCategory = await editKnowledgeCategory(
            httpClient,
            tempProcedureWorkedOn.knowledgeCategoryID,
            requestForEdit
          );

          if (editedCategory) {
            tempProcedureWorkedOn = {
              ...tempProcedureWorkedOn,
              ...editedCategory,
            };
            return tempProcedureWorkedOn;
          } else {
            const newReqData = {
              name: tempProcedureWorkedOn.name,
              parentID: previousknowledgeCategoryID,
              knowledgeBaseID: isReleaseNotes ? 2 : 1,
            };

            try {
              const createdKnowledgeCategory = await createKnowledgeCategory(
                httpClient,
                newReqData
              );

              if (createdKnowledgeCategory) {
                tempProcedureWorkedOn = createdKnowledgeCategory;
                return tempProcedureWorkedOn;
              }
            } catch (e) {
              logger.error(
                `EDIT ERROR Already exists- ${tempProcedureWorkedOn.path}\n ${e}`
              );

              return tempProcedureWorkedOn;
            }
          }
          return tempProcedureWorkedOn;
        } catch (e) {
          logger.error(`EDIT ERROR - ${tempProcedureWorkedOn.path}\n ${e}`);
        }
      }

      return tempProcedureWorkedOn;
    } else {
      // kCategories get handled for delete later
      tempProcedureWorkedOn = {
        ...tempProcedureWorkedOn,
        description: FLAG_FOR_DELETE,
      };
      return tempProcedureWorkedOn;
    }
  } else {
    if (directoryExistsResult) {
      let reqData: any = {
        name: tempProcedureWorkedOn.name,
        parentID: 1,
        knowledgeBaseID: isReleaseNotes ? 2 : 1,
      };
      if (previousknowledgeCategoryID !== null) {
        reqData = {
          name: tempProcedureWorkedOn.name,
          parentID: previousknowledgeCategoryID,
          knowledgeBaseID: isReleaseNotes ? 2 : 1,
        };
      }

      const createdKnowledgeCategory = await createKnowledgeCategory(
        httpClient,
        reqData
      );

      if (createdKnowledgeCategory) {
        tempProcedureWorkedOn = createdKnowledgeCategory;
        return tempProcedureWorkedOn;
      }
    } else {
      tempProcedureWorkedOn.description = KNOWN_CATEGORY_BEEN_DELETED;
      return tempProcedureWorkedOn;
    }
  }

  return tempProcedureWorkedOn;
};

export const procedureToArticle = async (
  httpClient: HttpClient,
  procedureWorkedOn: VanillaArticle,
  previousknowledgeCategoryID: null | number
): Promise<VanillaArticle> => {
  const tempProcedureWorkedOn = { ...procedureWorkedOn };

  if (tempProcedureWorkedOn.body) {
    try {
      const mardkownWithImagesAdded = await addImagesToArticleMarkdown(
        tempProcedureWorkedOn.body
      );
      tempProcedureWorkedOn.body = mardkownWithImagesAdded;
    } catch (e) {
      logger.error(
        `Error adding images to Article markdown \n ${e} \n ${procedureWorkedOn.name}`
      );
    }
  }

  if (tempProcedureWorkedOn.articleID === null) {
    if (!previousknowledgeCategoryID) {
      return tempProcedureWorkedOn;
    }

    tempProcedureWorkedOn.knowledgeCategoryID = previousknowledgeCategoryID;

    if (tempProcedureWorkedOn.body != FLAG_FOR_DELETE) {
      const articleRequest: Partial<VanillaArticle> = {
        body: tempProcedureWorkedOn.body,
        path: tempProcedureWorkedOn.path,
        format: 'markdown',
        knowledgeCategoryID: previousknowledgeCategoryID,
        locale: 'en',
        name: tempProcedureWorkedOn.name,
        sort: 0,
      };
      let createdArticle;
      try {
        createdArticle = await createArticle(httpClient, articleRequest);
      } catch (e) {
        logger.error(`Create Error for ${tempProcedureWorkedOn.path} \n ${e}`);
      }
      if (createdArticle?.articleID) {
        return createdArticle;
      } else {
        return tempProcedureWorkedOn;
      }
    }
    return tempProcedureWorkedOn;
  } else {
    if (
      tempProcedureWorkedOn.body !== FLAG_FOR_DELETE &&
      tempProcedureWorkedOn.articleID
    ) {
      const articleRequest: Partial<VanillaArticle> = {
        body: tempProcedureWorkedOn.body,
        format: 'markdown',
        knowledgeCategoryID: previousknowledgeCategoryID,
        locale: 'en',
        name: tempProcedureWorkedOn.name?.trim(),
        sort: 0,
        path: tempProcedureWorkedOn.path,
      };

      const editedArticle = await editArticle(
        httpClient,
        tempProcedureWorkedOn.articleID,
        articleRequest
      );

      if (editedArticle?.articleID) {
        return editedArticle;
      }
    }

    if (
      tempProcedureWorkedOn.body === FLAG_FOR_DELETE &&
      tempProcedureWorkedOn.articleID
    ) {
      const deletedArticle = await deleteArticle(
        httpClient,
        tempProcedureWorkedOn.articleID
      );

      if (deletedArticle) {
        return deletedArticle;
      }
    }
  }

  return tempProcedureWorkedOn;
};

export const removeDeletedCategories = async (
  httpClient: HttpClient,
  procedures: (VanillaArticle | VanillaKnowledgeCategory)[]
) => {
  logger.info(
    `Removing deleted categories${JSON.stringify(procedures, null, 2)}`
  );

  // at this point all vanillaArticles that need deleting should be deleted.
  const deletedKCategories: VanillaKnowledgeCategory[] = procedures.filter(
    isKnowledgeCategoryType
  );

  const categoriesDelete = await deleteAllFlaggedCategories(
    httpClient,
    deletedKCategories
  );

  if (categoriesDelete) {
    return {
      categoriesDeleted: categoriesDelete,
      procedures,
    };
  }

  return {
    categoriesDeleted: categoriesDelete,
    procedures,
  };
};
