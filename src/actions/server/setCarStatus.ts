import { fetcherServer } from "@/lib/api-server";
import { Status } from "@/types/api/car";

export default async function setCarStatus(id: number, status: Status) {
  return await fetcherServer.put(
    `/cars/${id}`,
    {
      data: {
        status,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.UPDATE_CAR_API_TOKEN}`,
      },
    },
  );
}
