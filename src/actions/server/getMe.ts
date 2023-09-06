import { User } from "@/types/collections";
import axios from "axios";

export default async function getMe(jwt: string) {
  return await axios.get<User>(`${process.env.API_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
}
