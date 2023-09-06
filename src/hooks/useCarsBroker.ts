import getBrokerCars from "@/actions/client/infinity/getBrokerCars";
import { useInfiniteQuery } from "@tanstack/react-query";

const useCarsBroker = () => {
  const query = useInfiniteQuery({
    queryKey: [`broker-cars-infinity`],
    queryFn: async ({ pageParam = 1 }) => await getBrokerCars(pageParam),
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

export default useCarsBroker;
