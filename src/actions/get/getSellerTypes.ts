import { fetcher } from "@/lib/fetcher";
import { Payload } from "@/types/api/common";
import { SellerType } from "@/types/api/seller";

export default async function getSellerTypes() {
  return await fetcher.get<Payload<SellerType[]>>(`/seller-types`);
}
