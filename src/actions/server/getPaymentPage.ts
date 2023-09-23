import { fetcherServer } from "@/lib/api-server";
import { Payload } from "@/types/api/common";
import { PaymentPage } from "@/types/api/payment-page";

export default async function getPaymentPage() {
  return await fetcherServer.get<Payload<PaymentPage>>(`/payment-page`, {
    params: {
      populate: "*",
    },
  });
}
