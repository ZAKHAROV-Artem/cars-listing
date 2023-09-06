import { User } from "@/types/collections";
import axios from "axios";
import Cookies from "js-cookie";

export async function getCurrentUser() {
  const jwt = Cookies.get("jwt");
  return await axios.get<User>(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    params: {
      populate: "*",
    },
  });
}
