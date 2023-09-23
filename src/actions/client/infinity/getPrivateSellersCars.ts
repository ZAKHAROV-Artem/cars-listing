import { Car } from "@/types/api/car";
import { Payload } from "@/types/api/common";
import axios from "axios";

export default async function getPrivateSellersCars(page?: number) {
  return axios.get<Payload<Car[]>>(`${process.env.NEXT_PUBLIC_API_URL}/cars`, {
    params: {
      "pagination[page]": page,
      "pagination[pageSize]": 12,
      "filters[status][$eq]": "active",
      "filters[seller][seller_type][slug]": "private",
      "fields[0]": "title",
      "fields[1]": "createdAt",
      "fields[2]": "featured",
      "fields[3]": "slug",
      "populate[seller][fields]": "phone",
      "populate[car_ch][fields][0]": "year_made",
      "populate[car_ch][fields][1]": "fuel",
      "populate[price][populate]": "*",
      "populate[seller][populate]": "*",
      "populate[images][fields][0]": "url",
      "sort[1]": "createdAt:desc",
    },
  });
}
