import { fetcherServer } from "@/lib/api-server";
import { Payload } from "@/types/api/common";
import { Car } from "@/types/api/car";

export async function generateSitemaps() {
  const count = await fetcherServer.get<number>(`/cars/count/view`);
  const pageCount = Math.ceil(count.data / 1000);
  const res = [];
  for (let i = 1; i <= pageCount; i++) {
    res.push({ id: i });
  }
  return res;
}
export default async function sitemap({ id }: { id: number }) {
  const cars = await fetcherServer.get<Payload<Car[]>>(`/cars`, {
    params: {
      "fields[0]": "slug",
      "fields[1]": "publishedAt",
      "pagination[pageSize]": "1000",
      "pagination[page]": id,
    },
  });
  return cars.data.data.map((car) => ({
    url: `https://www.mekina.net/cars/${car.attributes.slug}`,
    lastModified: car.attributes.publishedAt,
  }));
}
