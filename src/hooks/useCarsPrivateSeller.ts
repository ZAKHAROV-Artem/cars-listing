import getPrivateSellersCars from "@/actions/client/infinity/getPrivateSellersCars";
import { useInfiniteQuery } from "@tanstack/react-query";

const useCarsPrivateSeller = () => {
  const query = useInfiniteQuery({
    queryKey: [`private-seller-cars-infinity`],
    queryFn: async ({ pageParam = 1 }) =>
      await getPrivateSellersCars(pageParam),
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

export default useCarsPrivateSeller;
