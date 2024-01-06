import getCategories from "@/actions/get/getCategories";
import { useQuery } from "@tanstack/react-query";

const useCategories = () => {
  const query = useQuery({
    queryFn: getCategories,
    queryKey: ["categories"],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return query;
};

export default useCategories;
