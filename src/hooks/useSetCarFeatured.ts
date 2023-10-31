import setCarFeatured from "@/actions/client/setCarFeatured";
import { useMutation } from "@tanstack/react-query";

export const useSetCarFeatured = () => {
  const mutation = useMutation({
    mutationFn: setCarFeatured,
    mutationKey: ["set-car-featured"],
  });
  return mutation;
};
