import { fetcher } from "@/lib/fetcher";
import { Payload } from "@/types/api/common";
import { PaymentPage } from "@/types/api/payment-page";

export default async function getPaymentPage() {
  return await fetcher.get<Payload<PaymentPage>>(`/payment-page`, {
    params: {
      populate: "*",
    },
  });
}
