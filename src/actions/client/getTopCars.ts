import { QueryParams } from "../client/getSearchedCars";
import { Payload } from "@/types/api/common";
import { Car } from "@/types/api/car";
import { fetcher } from "@/lib/api-client";
import dayjs from "dayjs";

export default async function getTopCars(filters?: QueryParams) {
  const date = dayjs().subtract(7, "day").toDate();
  return await fetcher.get<Payload<Car[]>>(`/cars`, {
    params: {
      "sort[0]": "visits:desc",
      "filters[status][$eq]": "active",
      "fields[0]": "title",
      "fields[1]": "createdAt",
      "fields[2]": "featured",
      "fields[3]": "slug",
      "populate[car_ch][fields][0]": "year_made",
      "populate[car_ch][fields][1]": "fuel",
      "populate[car_ch][populate][0]": "brand",
      "populate[car_ch][populate][1]": "model",
      "populate[seller][populate]": "*",
      "populate[price][populate]": "*",
      "populate[images][fields][0]": "url",
      "filters[car_publication_date][$gte]": date,
      ...filters,
    },
  });
}
