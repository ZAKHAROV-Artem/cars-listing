import { forgotPassword } from "@/actions/client/auth/forgotPassword";
import { useMutation } from "@tanstack/react-query";

export const useForgotPasswordMutation = () => {
  const mutation = useMutation({
    mutationFn: forgotPassword,
    mutationKey: ["forgot-password"],
  });

  return mutation;
};
