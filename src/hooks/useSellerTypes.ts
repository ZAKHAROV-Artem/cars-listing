import getSellerTypes from "@/actions/get/getSellerTypes";
import { useQuery } from "@tanstack/react-query";

const useSellerTypes = () => {
  const query = useQuery({
    queryFn: getSellerTypes,
    queryKey: ["seller-types"],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return query;
};

export default useSellerTypes;
