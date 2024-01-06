import upload from "@/actions/post/upload";
import { useMutation } from "@tanstack/react-query";

export const useUpload = () => {
  const mutation = useMutation({
    mutationFn: upload,
  });
  return mutation;
};
