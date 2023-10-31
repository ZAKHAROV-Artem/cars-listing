import updateCarAdmin from "@/actions/client/updateCarAdmin";
import { useMutation } from "@tanstack/react-query";

export const useAdminButtonsMutation = () => {
  const mutation = useMutation({
    mutationFn: updateCarAdmin,
  });
  return mutation;
};
