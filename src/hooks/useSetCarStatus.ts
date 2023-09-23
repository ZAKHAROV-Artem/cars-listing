import setCarStatus from "@/actions/client/setCarStatus";
import { Status } from "@/types/api/car";
import { useMutation } from "@tanstack/react-query";

export const useSetCarStatus = () => {
  const mutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: Status }) =>
      await setCarStatus(id, status),
  });
  return mutation;
};
