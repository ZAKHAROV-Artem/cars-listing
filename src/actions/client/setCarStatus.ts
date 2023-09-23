import { fetcherAuth } from "@/lib/api-client";
import { Status } from "@/types/api/car";

export default async function setCarStatus(id: number, status: Status) {
  return await fetcherAuth.put(`/cars/${id}`, {
    data: {
      status,
    },
  });
}
