import { Car } from "@/types/api/car";
import { Payload } from "@/types/api/common";
import { fetcherServer } from "@/lib/api-server";

export default async function getCar(carId: string) {
  return await fetcherServer
    .get<Payload<Car[]>>(`/cars`, {
      params: {
        "filters[id][$eq]": carId,
        "filters[status][$eq]": "active",
        "populate[car_ch][populate]": "*",
        "populate[price][populate]": "*",
        "populate[seller][populate]": "*",
        "populate[images]": "*",
      },
    })
    .then((res) => res.data.data[0]);
}
