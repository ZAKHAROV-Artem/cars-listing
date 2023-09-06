import getPriceTypes from "@/actions/client/getPriceTypes";
import { useQuery } from "@tanstack/react-query";

const usePriceTypes = () => {
  const query = useQuery({
    queryFn: getPriceTypes,
    queryKey: ["price-types"],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return query;
};

export default usePriceTypes;
