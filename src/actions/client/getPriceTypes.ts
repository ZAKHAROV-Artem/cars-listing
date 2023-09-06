import { Payload } from "@/types/api/common";
import { PriceType } from "@/types/api/price";
import axios from "axios";

export default async function getPriceTypes() {
  return await axios.get<Payload<PriceType[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/price-types`,
  );
}
