import { fetcherServer } from "@/lib/api-server";
import { UserPlain } from "@/types/api/user";

export default async function getSellers(sellerType: string) {
  return await fetcherServer.get<UserPlain[]>(`/users`, {
    params: {
      "filters[seller_type][slug]": sellerType,
      populate: "image",
    },
  });
}
