import { resetPassword } from "@/actions/post/auth/resetPassword";
import { useMutation } from "@tanstack/react-query";

export const useResetPasswordMutation = () => {
  const mutation = useMutation({
    mutationFn: resetPassword,
    mutationKey: ["reset-password"],
  });

  return mutation;
};
