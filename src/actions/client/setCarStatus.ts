import { fetcherAuth } from "@/lib/api-client";
import { Status } from "@/types/api/car";
import dayjs from "dayjs";

export default async function setCarStatus({
  id,
  status,
}: {
  id: number;
  status: Status;
}) {
  return await fetcherAuth.put(`/cars/${id}`, {
    data: {
      status,
      ...(status === Status.Active
        ? {
            car_publication_date: dayjs(),
            car_expiration_date: dayjs().add(30, "day"),
          }
        : {}),
    },
  });
}
