import getMe from "@/actions/server/getMe";
import { cookies } from "next/headers";
export async function getServerAuth() {
  try {
    const jwt = cookies().get("jwt")?.value;
    const authenticated = cookies().get("authenticated")?.value;
    if (!jwt || !authenticated) return null;
    return await getMe(jwt).then((res) => res.data);
  } catch (error) {
    return null;
  }
}
