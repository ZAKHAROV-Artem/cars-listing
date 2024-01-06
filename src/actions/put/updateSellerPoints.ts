import { fetcherAuth } from "@/lib/fetcher";
import { UserPlain } from "@/types/api/user";
import dayjs from "dayjs";

export default async function updateSellerPoints({
  sellerId,
  points,
}: {
  sellerId: number;
  points: number;
}) {
  return await fetcherAuth.put<UserPlain>(`/users/${sellerId}`, {
    points,
    pointsExpirationDate: dayjs().add(30, "day"),
  });
}
