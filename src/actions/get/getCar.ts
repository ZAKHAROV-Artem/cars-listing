import { Car } from "@/types/api/car";
import { Payload } from "@/types/api/common";
import { fetcher } from "@/lib/fetcher";

import { QueryParams } from "./getSearchedCars";

export default async function getCar(carId: string, filters?: QueryParams) {
  return await fetcher.get<Payload<Car>>(`/cars/${carId}`, {
    params: {
      "populate[car_ch][populate]": "*",
      "populate[category][populate]": "*",
      "populate[price][populate]": "*",
      "populate[seller][populate]": "*",
      "populate[user][populate]": "*",
      "populate[images]": "*",
      ...filters,
    },
  });
}
