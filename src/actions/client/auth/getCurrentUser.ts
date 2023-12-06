import { fetcherAuth } from "@/lib/api-client";
import { UserPlain } from "@/types/api/user";
import Cookies from "js-cookie";

export async function getCurrentUser() {
  const jwt = Cookies.get("jwt");
  const authenticated = Cookies.get("authenticated");
  if (!jwt || !authenticated) return null;
  return await fetcherAuth.get<UserPlain>(`/users/me`, {
    params: {
      "populate[0]": "seller_type",
      "populate[1]": "image",
      "populate[2]": "role",
    },
  });
}
