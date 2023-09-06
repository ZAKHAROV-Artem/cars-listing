import getMe from "@/actions/server/getMe";
import { cookies } from "next/headers";
export async function getServerAuth() {
  try {
    const jwt = cookies().get("jwt")?.value;
    if (!jwt) return null;
    return await getMe(jwt).then((user) => user.data);
  } catch (error) {
    return null;
  }
}