import sendEmail from "@/actions/client/sendEmail";
import { useMutation } from "@tanstack/react-query";

export const useEmail = () => {
  const mutation = useMutation({
    mutationFn: sendEmail,
    mutationKey: ["information-email-to-user"],
  });
  return mutation;
};
