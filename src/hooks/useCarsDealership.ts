import getDealershipCars from "@/actions/client/infinity/getDealershipCars";
import { useInfiniteQuery } from "@tanstack/react-query";

const useCarsDealership = () => {
  const query = useInfiniteQuery({
    queryKey: [`dealership-cars-infinity`],
    queryFn: async ({ pageParam = 1 }) => await getDealershipCars(pageParam),
    getNextPageParam: (res, pages) => {
      return res.data.meta.pagination?.page ===
        res.data.meta.pagination?.pageCount ||
        !res.data.meta.pagination?.pageCount
        ? undefined
        : pages.length + 1;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return query;
};

export default useCarsDealership;
