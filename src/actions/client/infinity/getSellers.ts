import { fetcher } from "@/lib/api-client";
import { User } from "@/types/api/user";

export default async function getSellers(sellerType: string, page: number) {
  return await fetcher.get<User[]>(`/users`, {
    params: {
      "pagination[page]": page,
      "pagination[pageSize]": 12,
      "filters[seller_type][slug]": sellerType,
      populate: "image",
    },
  });
}
