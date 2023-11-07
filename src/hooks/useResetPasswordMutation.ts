import { resetPassword } from "@/actions/client/auth/resetPassword";
import { useMutation } from "@tanstack/react-query";

export const useResetPasswordMutation = () => {
  const mutation = useMutation({
    mutationFn: resetPassword,
    mutationKey: ["reset-password"],
  });

  return mutation;
};
