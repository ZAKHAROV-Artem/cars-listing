import { QueryParams } from "@/actions/get/getSearchedCars";
import getCars from "@/actions/get/infinity/getCars";
import { useQuery } from "@tanstack/react-query";

const useCars = (page: number, filters?: QueryParams) => {
  const query = useQuery({
    queryKey: [`all-cars-infinity`, page, filters],
    queryFn: async () => await getCars({ page, filters }),

    refetchOnMount: false,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
  return query;
};

export default useCars;
