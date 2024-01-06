import setCarStatus from "@/actions/put/setCarStatus";
import { useMutation } from "@tanstack/react-query";

export const useSetCarStatus = () => {
  const mutation = useMutation({
    mutationFn: setCarStatus,
  });
  return mutation;
};
