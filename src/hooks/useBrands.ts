import getBrands from "@/actions/client/getBrands";
import { useQuery } from "@tanstack/react-query";

const useBrands = () => {
  const query = useQuery({
    queryFn: getBrands,
    queryKey: ["brands"],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return query;
};

export default useBrands;
