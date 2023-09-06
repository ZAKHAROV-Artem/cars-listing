import getCurrentUserCars from "@/actions/client/infinity/getCurrentUserCars";
import { useInfiniteQuery } from "@tanstack/react-query";

const useCurrentUserCars = (userId: string) => {
  const query = useInfiniteQuery({
    queryKey: [`current-user-cars-infinity`],
    queryFn: async ({ pageParam = 1 }) => {
      return await getCurrentUserCars(userId, pageParam);
    },
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

export default useCurrentUserCars;
