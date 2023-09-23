import { User } from "@/types/api/user";
import { fetcherServer } from "@/lib/api-server";
export default async function getMe(jwt: string) {
  return await fetcherServer.get<User>(`/users/me`, {
    params: {
      populate: "seller_type",
    },

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
}
