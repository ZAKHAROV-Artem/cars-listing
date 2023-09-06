import getSellerCars from "@/actions/client/infinity/getSellerCars";
import { useInfiniteQuery } from "@tanstack/react-query";

const useSellerCars = (sellerId: string) => {
  const query = useInfiniteQuery({
    queryKey: [`seller-${sellerId}-cars-infinity`],
    queryFn: async ({ pageParam = 1 }) =>
      await getSellerCars(sellerId, pageParam),
    getNextPageParam: (res, pages) => {
      return res.data.meta.pagination?.page ===
        res.data.meta.pagination?.pageCount
        ? undefined
        : pages.length + 1;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return query;
};

export default useSellerCars;
