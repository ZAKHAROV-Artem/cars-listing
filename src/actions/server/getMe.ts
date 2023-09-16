import { User } from "@/types/collections";
import { fetcherServer } from "@/lib/api-server";
export default async function getMe(jwt: string) {
  return await fetcherServer.get<User>(`/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
}
