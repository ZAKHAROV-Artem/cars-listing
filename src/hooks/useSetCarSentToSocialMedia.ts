import setCarSentToSocialMedia from "@/actions/client/setCarSentToSocialMedia";
import { useMutation } from "@tanstack/react-query";

export const useSetCarSentToSocialMedia = () => {
  const mutation = useMutation({
    mutationFn: setCarSentToSocialMedia,
  });
  return mutation;
};
