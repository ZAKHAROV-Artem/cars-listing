import { fetcherServer } from "@/lib/api-server";
import { User } from "@/types/collections";

export default async function getSellers(sellerType: string) {
  return await fetcherServer.get<User[]>(`/users`, {
    params: {
      "filters[seller_type][slug]": sellerType,
      populate: "image",
    },
  });
}
