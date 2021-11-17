// temporary until get env file set up
import { authToken } from "../auth";
export const FLAG_FOR_DELETE: string = "FILE_DOES_NOT_EXIST";
export const SUPPORTED_FILE_TYPE_EXTENTIONS: string[] = [".md"];
export const PATH_OF_DIRECTORY_TO_WATCH: string = "docs/";
export const DEV_URL: string = "https://jupiterone.vanillastaging.com/api/v2";
export const Authorization: string = authToken;
export const POST_DELAY_TIME: number = 1200;
export const SUPPORTED_MEDIA_TYPES = ["png", "jpg", "jpeg", "gif"];
