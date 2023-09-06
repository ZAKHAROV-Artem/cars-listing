import { Car } from "@/types/api/car";
import { Payload } from "@/types/api/common";

import axios from "axios";

export default async function getCurrentUserCars(id: string, page?: number) {
  return axios.get<Payload<Car[]>>(`${process.env.NEXT_PUBLIC_API_URL}/cars`, {
    params: {
      "filters[user][id]": id,
      "pagination[page]": page,
      "pagination[pageSize]": 12,
      "filters[status][$eq]": "active",
      "fields[0]": "title",
      "fields[1]": "createdAt",
      "fields[2]": "featured",
      "fields[3]": "slug",
      "fields[4]": "status",
      "populate[car_ch][fields][0]": "year_made",
      "populate[car_ch][fields][1]": "fuel",
      "populate[car_ch][populate][0]": "brand",
      "populate[car_ch][populate][1]": "model",
      "populate[price][populate]": "*",
      "populate[seller][populate]": "*",
      "populate[images][fields][0]": "url",
    },
  });
}
