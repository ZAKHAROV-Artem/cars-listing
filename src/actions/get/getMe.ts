import { UserPlain } from "@/types/api/user";
import { fetcher } from "@/lib/fetcher";

export default async function getMe(jwt: string) {
  return await fetcher.get<UserPlain>(`/users/me`, {
    params: {
      "populate[0]": "seller_type",
      "populate[1]": "image",
      "populate[2]": "role",
    },

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
}
