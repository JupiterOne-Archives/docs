// temporary until get env file set up
import { authToken } from "../auth";
export const FLAG_FOR_DELETE: string = "FILE_DOES_NOT_EXIST";
export const SUPPORTED_FILE_TYPE_EXTENTIONS: string[] = [".md"];
export const PATH_OF_DIRECTORY_TO_WATCH: string = "knowledgeBase";
export const DEV_URL: string = "https://jupiterone.vanillastaging.com/api/v2";
export const Authorization: string = authToken;
export const REQUEST_DELAY: number = 5000;
export const SUPPORTED_MEDIA_TYPES = ["png", "jpg", "jpeg", "gif"];
export const MARKDOWN_IMAGE_REGEX = /\]\((..\/assets.*?)\)/;
export const MARKDOWN_LINK_REGEX = /\]\((.*.md*)\)/;
export const KNOWN_CATEGORY_BEEN_DELETED = "KNOWN_CATEGORY_BEEN_DELETED";
export const SHOULD_REALLY_UPLOAD_IMAGES = true;
export const MARKDOWN_REGEX_BETWEEN_LINK = /\]\(([^)]+)\)/;
export const MARKDOWN_REGEX_NON_LINK_FILE_PATH = /(?=\/).*(?=.md)/;
export const MARKDOWN_REGEX_LINK_MARKDOWN_FILE = /\]\((.*).md\)/;
export const MARKDOWN_REGEX_FULL_MARKDOWN_PATH = /([^(\s)([^)]+.md)/;
export const MARKDOWN_VANILLA_RETURN_MARKDOWN_LINK = /(href=([^(\s)([^)]+.md))/;
