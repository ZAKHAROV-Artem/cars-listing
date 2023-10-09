import getModels from "@/actions/client/getModels";
import { useQuery } from "@tanstack/react-query";

const useModels = ({ id, slug }: { id?: string; slug?: string }) => {
  const query = useQuery({
    queryFn: async () => getModels({ id, slug }),
    queryKey: ["models", id && `models-${id}`, slug && `models-${slug}`],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return query;
};

export default useModels;
