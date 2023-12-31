import { fetcher } from "@/lib/fetcher";
import { Payload } from "@/types/api/common";
import { PriceType } from "@/types/api/price";

export default async function getPriceTypes() {
  return await fetcher.get<Payload<PriceType[]>>(`/price-types`);
}
