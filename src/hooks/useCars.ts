import getCars from "@/actions/client/infinity/getCars";
import { useQuery } from "@tanstack/react-query";

const useCars = (page: number) => {
  const query = useQuery({
    queryKey: [`all-cars-infinity`, page],
    queryFn: async () => await getCars(page),

    refetchOnMount: false,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
  return query;
};

export default useCars;
