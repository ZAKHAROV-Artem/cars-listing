import { getCurrentUser } from "@/actions/client/auth/getCurrentUser";
import { useQuery } from "@tanstack/react-query";

const useCurrentUser = () => {
  const query = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["current-user"],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return { ...query, data: query.data?.data };
};

export default useCurrentUser;
