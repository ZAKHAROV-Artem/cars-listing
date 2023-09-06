import { User } from "@/types/collections";
import axios from "axios";

export default async function getSellers(sellerType: string) {
  return await axios.get<User[]>(`${process.env.API_URL}/users`, {
    params: {
      "filters[seller_type][slug]": sellerType,
      populate: "image",
    },
  });
}
