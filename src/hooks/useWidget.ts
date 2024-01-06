import getWidget from "@/actions/get/getWidget";
import { useQuery } from "@tanstack/react-query";

const useWidget = (slug: string) => {
  const query = useQuery({
    queryFn: async () => await getWidget(slug),
    queryKey: [`widget-${slug}`],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return query;
};

export default useWidget;
