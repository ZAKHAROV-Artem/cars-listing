import getPaymentPage from "@/actions/get/getPaymentPage";
import { useQuery } from "@tanstack/react-query";

const usePaymentPage = () => {
  const query = useQuery({
    queryFn: getPaymentPage,
    queryKey: ["payment-page"],
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return query;
};

export default usePaymentPage;
