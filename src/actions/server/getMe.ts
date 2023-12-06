import { UserPlain } from "@/types/api/user";
import { fetcherServer } from "@/lib/api-server";
export default async function getMe(jwt: string) {
  return await fetcherServer.get<UserPlain>(`/users/me`, {
    params: {
      "populate[0]": "seller_type",
      "populate[1]": "role",
    },

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
}
