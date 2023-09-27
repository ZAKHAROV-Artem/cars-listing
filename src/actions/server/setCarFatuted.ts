import { fetcherServer } from "@/lib/api-server";

export default async function setCarFatuted(id: number, featured: boolean) {
  return await fetcherServer.put(
    `/cars/${id}`,
    {
      data: {
        featured,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.UPDATE_CAR_API_TOKEN}`,
      },
    },
  );
}
