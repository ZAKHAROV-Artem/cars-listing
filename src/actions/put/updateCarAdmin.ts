import { fetcherAuth } from "@/lib/fetcher";
import { Status } from "@/types/api/car";
import dayjs from "dayjs";

export default async function updateCarAdmin({
  id,
  status,
  featured,
}: {
  id: number;
  status: Status;
  featured: boolean;
}) {
  return await fetcherAuth.put(`/cars/${id}`, {
    data: {
      status,
      ...(status === Status.Active
        ? {
            car_publication_date: dayjs(),
            car_expiration_date: dayjs().add(30, "day"),
            visits: 0,
          }
        : {}),
      featured,
      ...(featured && {
        car_featured_expiration_date: dayjs().add(10, "day"),
      }),
    },
  });
}
