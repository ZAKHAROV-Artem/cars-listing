import { fetcher } from "@/lib/api-client";
import { Car } from "@/types/api/car";
import { Payload } from "@/types/api/common";

export default async function getSellerCars(sellerId: string, page?: number) {
  return fetcher.get<Payload<Car[]>>(`/cars`, {
    params: {
      "filters[user][id]": sellerId,
      "pagination[page]": page,
      "pagination[pageSize]": 12,
      "filters[status][$eq]": "active",
      "fields[0]": "title",
      "fields[1]": "createdAt",
      "fields[2]": "featured",
      "fields[3]": "slug",
      "populate[seller][fields]": "phone",
      "populate[car_ch][fields][0]": "year_made",
      "populate[car_ch][fields][1]": "fuel",
      "populate[car_ch][populate][0]": "brand",
      "populate[car_ch][populate][1]": "model",
      "populate[price][populate]": "*",
      "populate[seller][populate]": "*",
      "populate[images][fields][0]": "url",
      "sort[1]": "createdAt:desc",
    },
  });
}
