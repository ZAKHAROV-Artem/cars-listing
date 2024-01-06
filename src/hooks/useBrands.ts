import getBrands from "@/actions/get/getBrands";
import { useQuery } from "@tanstack/react-query";

const useBrands = () => {
  const query = useQuery({
    queryFn: async () =>
      getBrands({
        "sort[0]": "name",
        "pagination[pageSize]": "40",
      }),
    queryKey: ["brands"],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return query;
};

export default useBrands;
