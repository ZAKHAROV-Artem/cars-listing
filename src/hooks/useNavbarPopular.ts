import getNavbarPopular from "@/actions/get/getNavbarPopular";
import { useQuery } from "@tanstack/react-query";

const useNavbarPopular = () => {
  const query = useQuery({
    queryFn: getNavbarPopular,
    queryKey: ["navbar-popular"],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return query;
};

export default useNavbarPopular;
