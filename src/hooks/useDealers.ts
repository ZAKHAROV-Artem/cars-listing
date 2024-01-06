import getSellers from "@/actions/get/infinity/getSellers";
import { useInfiniteQuery } from "@tanstack/react-query";

const useDealers = () => {
  const query = useInfiniteQuery({
    queryKey: [`dealerships-infinity`],
    queryFn: async ({ pageParam = 1 }) =>
      await getSellers("dealership", pageParam),
    getNextPageParam: (res, pages) => {
      return res.data.length < 10 ? undefined : pages.length + 1;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return query;
};

export default useDealers;
