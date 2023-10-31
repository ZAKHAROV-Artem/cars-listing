import updateSellerPoints from "@/actions/client/updateSellerPoints";
import { useMutation } from "@tanstack/react-query";

const useUpdateSellerPoints = () => {
  const mutation = useMutation({
    mutationFn: updateSellerPoints,
    mutationKey: ["update-seller-points"],
  });
  return mutation;
};

export default useUpdateSellerPoints;
