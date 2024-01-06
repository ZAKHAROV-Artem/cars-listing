import sendToTopic from "@/actions/post/sendToTopic";
import { useMutation } from "@tanstack/react-query";

export const useSendToTopic = () => {
  const mutation = useMutation({
    mutationFn: sendToTopic,
  });
  return mutation;
};
