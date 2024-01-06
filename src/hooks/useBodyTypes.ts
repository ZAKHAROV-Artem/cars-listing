import getBodyTypes from "@/actions/get/getBodyTypes";
import { useQuery } from "@tanstack/react-query";

const useBodyTypes = () => {
  const query = useQuery({
    queryFn: getBodyTypes,
    queryKey: ["body-types"],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return query;
};

export default useBodyTypes;
