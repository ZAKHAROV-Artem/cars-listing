import sendToSocialMedia from "@/actions/client/sendToSocialMedia";
import { useMutation } from "@tanstack/react-query";

export const useSendToSocialMediaMutation = () => {
  const mutation = useMutation({
    mutationFn: sendToSocialMedia,
    mutationKey: ["send-to-social-media"],
  });

  return mutation;
};
