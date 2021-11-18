import path from "path";
import {
  MARKDOWN_IMAGE_REGEX,
  PATH_OF_DIRECTORY_TO_WATCH,
  SUPPORTED_MEDIA_TYPES,
} from "../utils";

export const getMediaPath = (imagePath: string): string => {
  // we also want to use this to see if the file got deleted! the git diff wont differenitate
  const imageLocation = path.join(
    __dirname,
    `../${PATH_OF_DIRECTORY_TO_WATCH}`,
    `/${imagePath}`
  );
  let supportedTypeOfFile = false;
  SUPPORTED_MEDIA_TYPES.forEach((extention: string) => {
    if (imageLocation.endsWith(extention)) {
      supportedTypeOfFile = true;
    }
  });
  if (!supportedTypeOfFile) {
    return imagePath;
  }
  return imageLocation;
};
// paw through the body, grab each ()[relativeLink]
// for each link find that resource, upload it and replace the relativeLink with the returned from vanilla.url
// return [imageSrc, imageSrc,imageSrc] using the

// export const replaceBodyImages =(
//     body:string
// )=>{

// }

export const markdownAssetRegularExpression = new RegExp(MARKDOWN_IMAGE_REGEX);

export const replaceBodyLinks = (body: string, newLocation: string): any => {
  const bodyTemp = `${body}`;
  // make a new regular expression that matches exactly to target the uploading image src in the markdown
  return bodyTemp.replace(
    markdownAssetRegularExpression,
    "](https://us.v-cdn.net/6035554/uploads/2QGC57M0ZHO4/api-key-access-view.png)"
  );
};

export const modifyBodyImageLinks = (
  body: string,
  newLocation: string
): string => {
  let bodyAlterations = `${body}`;

  bodyAlterations = bodyAlterations.replace(
    markdownAssetRegularExpression,
    `(${newLocation})`
  );

  return bodyAlterations;
};
