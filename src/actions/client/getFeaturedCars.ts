import { Car } from "@/types/api/car";
import { Payload } from "@/types/api/common";
import axios from "axios";
import { QueryParams } from "./getSearchedCars";

export default async function getFeaturedCars(filters?: QueryParams) {
  return await axios.get<Payload<Car[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/cars`,
    {
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
        ...filters,
      },
    },
  );
}
