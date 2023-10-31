import { fetcherAuth } from "@/lib/api-client";
import { User } from "@/types/api/user";
import dayjs from "dayjs";

export default async function updateSellerPoints({
  sellerId,
  points,
}: {
  sellerId: number;
  points: number;
}) {
  console.log(sellerId, points);
  return await fetcherAuth.put<User>(`/users/${sellerId}`, {
    points,
    pointsExpirationDate: dayjs().add(30, "day"),
  });
}
