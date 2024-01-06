import getCars from "@/actions/get/infinity/getCars";
import { useQuery } from "@tanstack/react-query";

const useCarsRecent = () => {
  const query = useQuery({
    queryFn: async () =>
      await getCars({
        filters: {
          "filters[car_publication_date][$notNull]": "true",
          "filters[status][$eq]": "active",
        },
      }),
    queryKey: ["cars-recent"],
    retry: false,
    refetchOnMount: false,
  });
  return query;
};

export default useCarsRecent;
