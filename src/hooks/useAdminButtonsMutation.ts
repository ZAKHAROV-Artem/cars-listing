import updateCarAdmin from "@/actions/put/updateCarAdmin";
import { useMutation } from "@tanstack/react-query";

export const useAdminButtonsMutation = () => {
  const mutation = useMutation({
    mutationFn: updateCarAdmin,
  });
  return mutation;
};
