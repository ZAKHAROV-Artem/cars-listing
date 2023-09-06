import getSearchedCars from "@/actions/client/getSearchedCars";
import { Filter } from "@/state/FiltersState";
import { useInfiniteQuery } from "@tanstack/react-query";

const useSearchedCars = (filters: Filter[]) => {
  const query = useInfiniteQuery({
    queryKey: [`searched-cars-infinity`],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getSearchedCars({
        filters,
        page: pageParam,
      });
      return res;
    },
    getNextPageParam: (res, pages) => {
      return res.data.meta.pagination?.page ===
        res.data.meta.pagination?.pageCount ||
        !res.data.meta.pagination?.pageCount
        ? undefined
        : pages.length + 1;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return query;
};

export default useSearchedCars;
