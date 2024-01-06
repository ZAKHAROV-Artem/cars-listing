import dayjs from "dayjs";
import { fetcherAuth } from "@/lib/fetcher";

export default async function setCarFeatured({
  id,
  featured,
}: {
  id: number;
  featured: boolean;
}) {
  return await fetcherAuth.put(`/cars/${id}`, {
    data: {
      featured,
      ...(featured && {
        car_featured_expiration_date: dayjs().add(10, "day"),
      }),
    },
  });
}
