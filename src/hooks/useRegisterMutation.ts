import { register } from "@/actions/post/auth/register";
import { useMutation } from "@tanstack/react-query";

export const useRegisterMutation = () => {
  const mutation = useMutation({
    mutationFn: register,
    mutationKey: ["register"],
  });
  return mutation;
};
