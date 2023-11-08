import { Car } from "@/types/api/car";
import { Payload } from "@/types/api/common";
import { QueryParams } from "./getSearchedCars";
import { fetcher } from "@/lib/api-client";

export default async function getFeaturedCars(filters?: QueryParams) {
  return await fetcher.get<Payload<Car[]>>(`/cars`, {
    params: {
      "filters[featured][$eq]": "true",
      "fields[0]": "title",
      "filters[status][$eq]": "active",
      "fields[1]": "createdAt",
      "fields[2]": "featured",
      "fields[3]": "slug",
      "populate[seller][fields]": "phone",
      "populate[car_ch][fields][0]": "year_made",
      "populate[car_ch][fields][1]": "fuel",
      "populate[car_ch][populate][0]": "brand",
      "populate[car_ch][populate][1]": "model",
      "populate[price][populate]": "*",
      "populate[images][fields][0]": "url",
      "sort[1]": "car_publication_date:desc",
      ...filters,
    },
  });
}
