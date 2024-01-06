import { fetcher } from "@/lib/fetcher";
import { UserPlain } from "@/types/api/user";
import dayjs from "dayjs";

export default async function getSellers(sellerType: string, page: number) {
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
