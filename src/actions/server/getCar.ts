import { Car } from "@/types/api/car";
import { Payload } from "@/types/api/common";
import { fetcherServer } from "@/lib/api-server";
import { QueryParams } from "../client/getSearchedCars";

export default async function getCar(carId: string, filters?: QueryParams) {
  return await fetcherServer
    .get<Payload<Car[]>>(`/cars`, {
      params: {
        "filters[id][$eq]": carId,
        "populate[car_ch][populate]": "*",
        "populate[category][populate]": "*",
        "populate[price][populate]": "*",
        "populate[seller][populate]": "*",
        "populate[images]": "*",
        ...filters,
      },
    })
    .then((res) => res.data.data[0]);
}
