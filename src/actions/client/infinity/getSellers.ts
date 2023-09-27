import { fetcher } from "@/lib/api-client";
import { User } from "@/types/api/user";

export default async function getSellers(sellerType: string, page: number) {
  const start = (page - 1) * 10;
  return await fetcher.get<User[]>(`/users`, {
    params: {
      start: start,
      limit: 10,
      "filters[seller_type][slug]": sellerType,
      populate: "image",
    },
  });
}
