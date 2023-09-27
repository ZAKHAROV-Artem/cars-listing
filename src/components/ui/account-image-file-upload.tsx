import {
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { Button } from "./button";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import useCurrentUser from "@/hooks/useCurrentUser";
import { getInitials } from "@/lib/utils";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  setAcceptedFiles: (files: FileWithPath[]) => void;
}
export default function AccountImageFileUpload({
  disabled,
  setAcceptedFiles,
  ...rest
}: Props) {
  const { data: user } = useCurrentUser();
  const [base64, setBase64] = useState<string>();
  const handleDrop = useCallback(
    (files: FileWithPath[]) => {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setBase64(event.target.result);
        setAcceptedFiles(files);
      };
      reader.readAsDataURL(file);
    },
    [setAcceptedFiles],
  );
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    maxSize: 2000000,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
  });

  return (
    <div className="justify-self-center">
      <div
        {...getRootProps({
          className: `w-[150px] h-[150px] overflow-hidden bg-accent-light dark:bg-slate-800 rounded-full grid place-content-center text-center cursor-pointer outline-none`,
        })}
      >
        <input {...getInputProps({ ...rest })} />

        {base64 ? (
          <Image
            alt="User"
            src={base64}
            width={400}
            height={400}
            className="h-[150px] w-[150px] object-cover"
          />
        ) : (
          <Avatar className="h-[150px] w-[150px] hover:border-2 dark:border-paper-dark">
            <AvatarImage src={user?.image?.url} />

            <AvatarFallback className="text-2xl">
              {getInitials(user?.name || "")}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
}
