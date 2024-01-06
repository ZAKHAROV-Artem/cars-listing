import { QueryParams } from "./getSearchedCars";
import { Payload } from "@/types/api/common";
import { Car } from "@/types/api/car";
import dayjs from "dayjs";
import { fetcher } from "@/lib/fetcher";

export default async function getTopCars(filters?: QueryParams) {
  const date = dayjs().subtract(7, "day").toDate();
  return await fetcher.get<Payload<Car[]>>(`/cars`, {
    params: {
      "sort[0]": "visits:desc",
      "filters[status][$eq]": "active",
      "filters[car_publication_date][$gte]": date,
      "fields[0]": "title",
      "fields[1]": "createdAt",
      "fields[2]": "featured",
      "fields[3]": "slug",
      "populate[car_ch][fields][0]": "year_made",
      "populate[car_ch][fields][1]": "fuel",
      "populate[car_ch][fields][2]": "brand",
      "populate[car_ch][fields][3]": "model",
      "populate[car_ch][populate][0]": "brand",
      "populate[car_ch][populate][1]": "model",
      "populate[seller][populate]": "*",
      "populate[price][populate]": "*",
      "populate[images][fields][0]": "url",
      "sort[1]": "car_publication_date:desc",
      ...filters,
    },
  });
}
