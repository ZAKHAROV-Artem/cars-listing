import { login } from "@/actions/post/auth/login";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  const mutation = useMutation({
    mutationFn: login,
    mutationKey: ["login"],
  });
  return mutation;
};
