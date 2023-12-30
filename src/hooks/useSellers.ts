import getSellers from "@/actions/client/infinity/getSellers";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useSellers = (sellerType: string) => {
  const query = useInfiniteQuery({
    queryKey: [`sellers-${sellerType}-infinity`],
    queryFn: async ({ pageParam = 0 }) =>
      await getSellers(sellerType, pageParam),
    getNextPageParam: (res, pages) => {
      console.log(pages);
      return res.data.length < 12 ? undefined : pages.length + 1;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return query;
};
