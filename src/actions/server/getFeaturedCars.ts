import { Car } from "@/types/api/car";
import { Payload } from "@/types/api/common";
import { fetcherServer } from "@/lib/api-server";
import { QueryParams } from "../client/getSearchedCars";

export default async function getFeaturedCars(filters?: QueryParams) {
  return await fetcherServer.get<Payload<Car[]>>(`/cars`, {
    params: {
      "filters[featured][$eq]": "true",
      "filters[status][$eq]": "active",
      "fields[0]": "title",
      "fields[1]": "createdAt",
      "fields[2]": "featured",
      "fields[3]": "slug",
      "populate[car_ch][fields][0]": "year_made",
      "populate[car_ch][fields][1]": "fuel",
      "populate[seller][populate]": "*",
      "populate[price][populate]": "*",
      "populate[images][fields][0]": "url",
      "sort[1]":"car_publication_date:desc",
      ...filters,
    },
  });
}
