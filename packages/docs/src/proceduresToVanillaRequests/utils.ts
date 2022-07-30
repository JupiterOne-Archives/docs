import HttpClient from '../httpClient';
import {
  getMarkdownImageSrcs,
  isSupportedMediaType,
  modifyBodyLinkForImage,
} from '../linksAndMediaHandlers';
import { logger } from '../loggingUtil';
import {
  createDisplayName,
  isArticleType,
  isKnowledgeCategoryType,
  SHOULD_REALLY_UPLOAD_IMAGES,
  VanillaArticle,
  VanillaKnowledgeCategory,
} from '../utils';
import {
  createKnowledgeCategory,
  uploadImageAndReturnUrl,
} from '../VanillaAPI';

export type hasKnowledgeCategoryBeenMovedProps = {
  proceduresWithVanillaInfo: (VanillaKnowledgeCategory | VanillaArticle)[];
  procedure: VanillaKnowledgeCategory;
};

export const hasKnowledgeCategoryBeenMoved = ({
  proceduresWithVanillaInfo,
  procedure,
}: hasKnowledgeCategoryBeenMovedProps): number | null | string => {
  const knowledgeCategoriesArray = proceduresWithVanillaInfo
    .filter(isKnowledgeCategoryType)
    .filter((k) => k.name !== procedure.name);

  const { parentID, path } = procedure;
  if (parentID && parentID <= 5) {
    return parentID;
  }
  const splitProcedurePath = path?.split('/');
  let parentKnowledgeCategroyName: string | undefined = undefined;
  if (splitProcedurePath?.length) {
    if (splitProcedurePath.length === 1) {
      parentKnowledgeCategroyName = splitProcedurePath[0];
    } else {
      parentKnowledgeCategroyName =
        splitProcedurePath[splitProcedurePath.length - 2];
    }
  }

  if (parentKnowledgeCategroyName) {
    const nameOfKnowledgeCategroyBelongsTo = createDisplayName(
      parentKnowledgeCategroyName
    );
    const [existingKnowledgeCategory] = knowledgeCategoriesArray.filter(
      (k) => k.name === nameOfKnowledgeCategroyBelongsTo
    );

    if (!existingKnowledgeCategory) {
      return nameOfKnowledgeCategroyBelongsTo;
    }
    if (existingKnowledgeCategory.knowledgeCategoryID !== parentID) {
      return existingKnowledgeCategory.knowledgeCategoryID;
    } else {
      return parentID;
    }
  }
  return null;
};

export const uploadImagesAndAddToMarkdown = async (
  imageSrcArray: string[],
  markdownAsString: string
) => {
  logger.info(`Uploading and adding images: ${imageSrcArray}`);
  let markdownTarget = markdownAsString;
  const supportedImages = imageSrcArray.filter((m) => isSupportedMediaType(m));
  for (let i = 0; i < supportedImages.length; i++) {
    if (SHOULD_REALLY_UPLOAD_IMAGES) {
      const newLocation = await uploadImageAndReturnUrl(supportedImages[i]);
      markdownTarget = modifyBodyLinkForImage(
        markdownTarget,
        supportedImages[i],
        newLocation
      );
    }
  }

  return markdownTarget;
};

export const addImagesToArticleMarkdown = async (markdownAsString: string) => {
  if (!markdownAsString || !markdownAsString.length) {
    return '';
  }
  const alteredMarkdown = markdownAsString;
  const imageSrcArray = getMarkdownImageSrcs(alteredMarkdown);
  if (!imageSrcArray.length) {
    return alteredMarkdown;
  } else {
    return await uploadImagesAndAddToMarkdown(imageSrcArray, markdownAsString);
  }
};

export const kCategoriesByPathSize = (
  deletedKCategories: VanillaKnowledgeCategory[]
) => {
  if (!deletedKCategories.length) {
    return deletedKCategories;
  }

  return deletedKCategories.sort((a, b) => {
    const aPath = a.path?.split('/');
    const bPath = b.path?.split('/');
    if (!aPath) {
      return 0;
    }
    if (!bPath) {
      return 0;
    }
    if (aPath.length > bPath.length) {
      return -1;
    }
    if (bPath.length > aPath.length) {
      return 1;
    }
    return 0;
  });
};

export const getPreviousKnowledgeID = (
  completedProcedures: (VanillaArticle | VanillaKnowledgeCategory)[],
  procedureBeingWorkedOn: VanillaArticle | VanillaKnowledgeCategory,
  existingknowledgeCategoryInfo: VanillaKnowledgeCategory[]
): number | null => {
  const tempExistingknowledgeCategoryInfo =
    existingknowledgeCategoryInfo && existingknowledgeCategoryInfo.length
      ? [...existingknowledgeCategoryInfo]
      : [];

  const pathSplit = procedureBeingWorkedOn?.path?.split('/');

  if (pathSplit && procedureBeingWorkedOn?.fileName) {
    const indexInPath = pathSplit?.indexOf(procedureBeingWorkedOn?.fileName);

    if (indexInPath !== -1) {
      if (pathSplit[indexInPath - 1]) {
        const targetCategory = pathSplit[indexInPath - 1];
        const nameToLookFor = createDisplayName(targetCategory);

        const matches = tempExistingknowledgeCategoryInfo.filter(
          (c) =>
            c.name.trim().toLowerCase() === nameToLookFor.trim().toLowerCase()
        );

        if (matches && matches.length) {
          return matches[0].knowledgeCategoryID;
        }
      }
      if (indexInPath === 0) {
        const targetCategory = pathSplit[indexInPath];
        const nameToLookFor = createDisplayName(targetCategory);

        const matches = tempExistingknowledgeCategoryInfo.filter(
          (c) =>
            c.name.trim().toLowerCase() === nameToLookFor.trim().toLowerCase()
        );

        if (matches && matches.length) {
          return matches[0].knowledgeCategoryID;
        }
      }
    }
  }

  const tempCompletedProcedures = [...completedProcedures];
  const categoryOnlyProcedures: VanillaKnowledgeCategory[] =
    tempCompletedProcedures.filter(isKnowledgeCategoryType) || [];
  if (!categoryOnlyProcedures.length) {
    return null;
  }
  const lastCategoryInArray = categoryOnlyProcedures.pop();
  if (isArticleType(procedureBeingWorkedOn)) {
    return lastCategoryInArray?.knowledgeCategoryID || null;
  }
  if (
    lastCategoryInArray &&
    procedureBeingWorkedOn.fileName &&
    lastCategoryInArray.fileName
  ) {
    const indexOfLastCatFileName = procedureBeingWorkedOn.childrenPath.indexOf(
      lastCategoryInArray.fileName
    );

    if (indexOfLastCatFileName === -1) {
      return getPreviousKnowledgeID(
        categoryOnlyProcedures,
        procedureBeingWorkedOn,
        existingknowledgeCategoryInfo
      );
    }
    return lastCategoryInArray.knowledgeCategoryID;
  }

  return null;
};

export interface HandleKnowledgeCategoryChangedParentCreateProps {
  procedure: VanillaKnowledgeCategory;
  newName: string;
  previousknowledgeCategoryID: number | null;
  httpClient: HttpClient;
  existingknowledgeCategoryInfo: VanillaKnowledgeCategory[];
}

export const handleKnowledgeCategoryChangedParentCreate = async ({
  procedure,
  newName,
  previousknowledgeCategoryID,
  httpClient,
  existingknowledgeCategoryInfo,
}: HandleKnowledgeCategoryChangedParentCreateProps) => {
  let isReleaseNotes = false;
  const tempExistingKnowledgeCategoryInfo = existingknowledgeCategoryInfo;
  const procedureWorkedOn = { ...procedure };
  if (
    procedureWorkedOn.path &&
    procedureWorkedOn.path.toLowerCase().indexOf('release-notes') !== -1
  ) {
    isReleaseNotes = true;
  }

  const newReqData = {
    name: newName,
    parentID: previousknowledgeCategoryID,
    knowledgeBaseID: isReleaseNotes ? 2 : 1,
  };
  try {
    const createdKnowledgeCategory = await createKnowledgeCategory(
      httpClient,
      newReqData
    );

    if (createdKnowledgeCategory) {
      tempExistingKnowledgeCategoryInfo.push({
        ...createdKnowledgeCategory,
        childCategoryCount: createdKnowledgeCategory.childCategoryCount
          ? createdKnowledgeCategory.childCategoryCount
          : 1,
      });

      return {
        existingknowledgeCategoryInfo: tempExistingKnowledgeCategoryInfo,
        updatedPreviousKnowledgeCategoryID:
          createdKnowledgeCategory.knowledgeCategoryID,
      };
    }
  } catch (e) {
    logger.error(`CREATE ERROR Already exists- \n ${e}`);
  }
};
