import {
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { Button } from "./button";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  setAcceptedFiles: any;
}
export default function CarPostFormFileUpload({
  disabled,
  setAcceptedFiles,
  ...rest
}: Props) {
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setAcceptedFiles(acceptedFiles);
    },
    [setAcceptedFiles],
  );
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 6,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    onDrop,
  });
  return (
    <div>
      <div
        {...getRootProps({
          className: `w-full h-[200px] bg-accent-light dark:bg-slate-800 rounded-3xl grid place-content-center text-center cursor-pointer outline-none`,
        })}
      >
        <input {...getInputProps({ ...rest })} />

        <div className="">Drag and drop here or click to select files</div>
        <div className="my-3">
          <Button>Browse files</Button>
        </div>
      </div>
      <div className="ml-5">
        {acceptedFiles.map((file, i) => (
          <div key={i}>{file.name}</div>
        ))}
      </div>
    </div>
  );
}
