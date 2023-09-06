import { Payload } from "@/types/api/common";
import { SellerType } from "@/types/api/seller";
import axios from "axios";

export default async function getSellerTypes() {
  return await axios.get<Payload<SellerType[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/seller-types`,
  );
}
