import getModels from "@/actions/client/getModels";
import { useQuery } from "@tanstack/react-query";

const useModels = (brandId: string) => {
  const query = useQuery({
    queryFn: async () => await getModels(brandId),
    queryKey: ["models", `brand-${brandId}`],
    retry: false,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return query;
};

export default useModels;
