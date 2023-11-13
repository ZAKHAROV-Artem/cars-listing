import getSearchedCars from "@/actions/client/getSearchedCars";
import { Filter } from "@/state/FiltersState";
import { useQuery } from "@tanstack/react-query";

const useSearchedCars = (filters: Filter[], page: number) => {
  const query = useQuery({
    queryKey: [`searched-cars-infinity`, page],
    queryFn: async () =>
      await getSearchedCars({
        filters,
        page,
      }),

    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return query;
};

export default useSearchedCars;
