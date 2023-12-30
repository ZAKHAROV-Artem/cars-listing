import { fetcher } from "@/lib/api-client";
import { UserPlain } from "@/types/api/user";
import dayjs from "dayjs";

export default async function getSellers(sellerType: string, page: number) {
  console.log(page);
  return await fetcher.get<UserPlain[]>(`/users`, {
    params: {
      start: page * 12,
      limit: 12,
      "filters[seller_type][slug][$eq]": sellerType,
      "filters[pointsExpirationDate][$gt]": dayjs().toISOString(),
      populate: "image",
    },
  });
}
