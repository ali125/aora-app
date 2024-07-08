/// <reference types="nativewind/types" />

declare module "*.jpg";
declare module "*.png";

declare module "@env" {
  export const APP_WRITE_PROJECT_ID: string;
  export const APP_WRITE_DB_ID: string;
  export const APP_WRITE_USER_COLLECTION_ID: string;
  export const APP_WRITE_VIDEO_COLLECTION_ID: string;
  export const APP_WRITE_STORAGE_ID: string;
}
