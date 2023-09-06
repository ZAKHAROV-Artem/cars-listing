import getCars from "@/actions/client/infinity/getCars";
import { useInfiniteQuery } from "@tanstack/react-query";

const useCars = () => {
  const query = useInfiniteQuery({
    queryKey: [`all-cars-infinity`],
    queryFn: async ({ pageParam = 1 }) => await getCars(pageParam),
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

export default useCars;
