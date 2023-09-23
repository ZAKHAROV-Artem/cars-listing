import { fetcherServer } from "@/lib/api-server";
import { User } from "@/types/api/user";

export default async function getSeller(id: string) {
  return await fetcherServer.get<User>(`/users/${id}`, {
    params: {
      "populate[cars][populate][price][populate]": "*",
      "populate[cars][populate][car_ch][populate][brand]": "*",
      "populate[cars][populate][car_ch][populate][model]": "*",
      "populate[cars][populate][images][populate]": "*",
      populate: "image",
    },
  });
}
