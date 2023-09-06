import getModels from "@/actions/client/getModels";
import { useQuery } from "@tanstack/react-query";

const useModels = () => {
  const query = useQuery({
    queryFn: async () => await getModels(),
    queryKey: ["models"],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return query;
};

export default useModels;
