import { QueryParams } from "@/actions/client/getSearchedCars";
import getCars from "@/actions/client/infinity/getCars";
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
