import getFeaturedCars from "@/actions/client/getFeaturedCars";
import { QueryParams } from "@/actions/client/getSearchedCars";
import { useQuery } from "@tanstack/react-query";

const useFeaturedCars = (filters?: QueryParams) => {
  const query = useQuery({
    queryFn: () => getFeaturedCars(filters),
    queryKey: ["featured-cars"],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return query;
};

export default useFeaturedCars;
