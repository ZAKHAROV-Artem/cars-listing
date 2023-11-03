import upload from "@/actions/client/upload";
import { useMutation } from "@tanstack/react-query";

export const useUpload = () => {
  const mutation = useMutation({
    mutationFn: upload,
  });
  return mutation;
};
