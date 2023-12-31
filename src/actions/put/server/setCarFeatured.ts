import { fetcher } from "@/lib/fetcher";

import dayjs from "dayjs";

export default async function setCarFeatured(id: number, featured: boolean) {
  return await fetcher.put(
    `/cars/${id}`,
    {
      data: {
        featured,
        ...(featured && {
          car_featured_expiration_date: dayjs().add(10, "day"),
        }),
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.UPDATE_CAR_API_TOKEN}`,
      },
    },
  );
}
