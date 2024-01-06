import getCars from "@/actions/get/infinity/getCars";
import { useInfiniteQuery } from "@tanstack/react-query";

const useCarsDealership = () => {
  const query = useInfiniteQuery({
    queryKey: [`dealership-cars-infinity`],
    queryFn: async ({ pageParam = 1 }) =>
      await getCars({
        page: pageParam,
        filters: {
          "filters[seller][seller_type][slug]": "dealership",
          "filters[status][$eq]": "active",
        },
      }),
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
