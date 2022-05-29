import { authToken } from "../auth";
export const FLAG_FOR_DELETE: string = "FILE_DOES_NOT_EXIST";
export const SUPPORTED_FILE_TYPE_EXTENTIONS: string[] = [".md"];
export const PATH_OF_DIRECTORY_TO_WATCH: string = "knowledgeBase";
export const PATH_OF_INTEGRATIONS: string = "integrations";
export const DEV_URL: string = "https://jupiterone.vanillastaging.com/api/v2";
export const PROD_URL: string =
  "https://jupiterone.vanillacommunities.com/api/v2";
export const Authorization: string = authToken;
console.log(authToken);
console.log(`STAGING TOKEN ${process.env.TOKEN}`);
console.log(`STAGING ${JSON.stringify(process.env.TOKEN)}`);
export const REQUEST_DELAY: number = 1500;
export const SUPPORTED_MEDIA_TYPES = ["png", "jpg", "jpeg", "gif"];
export const MARKDOWN_IMAGE_REGEX = /\]\(((..\/){1,}assets.*?)\)/;
export const KNOWN_CATEGORY_BEEN_DELETED = "KNOWN_CATEGORY_BEEN_DELETED";
export const SHOULD_REALLY_UPLOAD_IMAGES = true;

export const MARKDOWN_VANILLA_RETURN_MARKDOWN_LINK = /(href=([^(\s)([^)]+.md))/;
export const TITLE_FROM_MARKDOWN_REGEX = /(?=^#{1}).*/;
export const MARKDOWN_VANILLA_RETURN_MARKDOWN_LINK_V2 =
  /(href=([^(\s)([^)]+.md))|(href=(.+.md\\))|(href="([^"]+.))/;
