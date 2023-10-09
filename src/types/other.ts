import { FileWithPath } from "react-dropzone";

export type FileWithPreview = {
  preview: string;
  id:string;
} & FileWithPath;
