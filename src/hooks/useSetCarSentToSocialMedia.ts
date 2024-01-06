import setCarSentToSocialMedia from "@/actions/put/setCarSentToSocialMedia";
import { useMutation } from "@tanstack/react-query";

export const useSetCarSentToSocialMedia = () => {
  const mutation = useMutation({
    mutationFn: setCarSentToSocialMedia,
  });
  return mutation;
};
