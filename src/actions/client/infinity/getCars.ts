import { fetcher } from "@/lib/api-client";
import { Car } from "@/types/api/car";
import { Payload } from "@/types/api/common";
import { QueryParams } from "../getSearchedCars";

export default async function getCars({
  page,
  filters,
}: {
  page?: number;
  filters?: QueryParams;
}) {
  return fetcher.get<Payload<Car[]>>(`/cars`, {
    params: {
      "sort[0]": "car_publication_date:desc",
    
      "pagination[page]": page,
      "pagination[pageSize]": 12,
      "fields[0]": "title",
      "fields[1]": "createdAt",
      "fields[2]": "featured",
      "fields[3]": "slug",
      "fields[4]": "status",
      "fields[5]": "car_publication_date",
      "populate[car_ch][fields][0]": "year_made",
      "populate[car_ch][fields][1]": "fuel",
      "populate[car_ch][populate][0]": "brand",
      "populate[car_ch][populate][1]": "model",
      "populate[price][populate]": "*",
      "populate[seller][populate]": "*",
      "populate[images][fields][0]": "url",
      ...filters,
    },
  });
}
