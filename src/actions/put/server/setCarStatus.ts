import { Status } from "@/types/api/car";
import { fetcher } from "@/lib/fetcher";

export default async function setCarStatus(id: number, status: Status) {
  return await fetcher.put(
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
