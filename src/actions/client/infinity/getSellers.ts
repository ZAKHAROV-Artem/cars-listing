import { User } from "@/types/api/user";
import axios from "axios";

export default async function getSellers(sellerType: string, page: number) {
  const start = (page - 1) * 10;
  return await axios.get<User[]>(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    params: {
      start: start,
      limit: 10,
      "filters[seller_type][slug]": sellerType,
      populate: "image",
    },
  });
}
