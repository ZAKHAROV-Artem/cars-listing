import { QueryParams } from "@/actions/get/getSearchedCars";
import getTopCars from "@/actions/get/getTopCars";
import { useQuery } from "@tanstack/react-query";

const useTopCars = (filters?: QueryParams) => {
  const query = useQuery({
    queryFn: () => getTopCars(filters),
    queryKey: ["top-cars"],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return query;
};

export default useTopCars;
