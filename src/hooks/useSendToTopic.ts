import sendToTopic from "@/actions/client/sendToTopic";
import { useMutation } from "@tanstack/react-query";

export const useSendToTopic = () => {
  const mutation = useMutation({
    mutationFn: sendToTopic,
  });
  return mutation;
};
