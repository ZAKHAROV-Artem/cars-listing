import { fetcher } from "@/lib/fetcher";

export default async function incrementVisits(id: number, visits: number) {
  return await fetcher.put(
    `/cars/${id}`,
    {
      data: {
        visits: Number(visits) + 1,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.UPDATE_CAR_API_TOKEN}`,
      },
    },
  );
}
