import getSellers from "@/actions/client/infinity/getSellers";
import { useInfiniteQuery } from "@tanstack/react-query";

const useSellers = (sellerType: string) => {
  const query = useInfiniteQuery({
    queryKey: [`sellers-${sellerType}-infinity`],
    queryFn: async ({ pageParam = 1 }) =>
      await getSellers(sellerType, pageParam),
    getNextPageParam: (res, pages) => {
      return res.data.length < 10 ? undefined : pages.length + 1;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return query;
};

export default useSellers;
