import { User } from "@/types/collections";
import axios from "axios";

export default async function getSeller(id: string) {
  return await axios.get<User>(`${process.env.API_URL}/users/${id}`, {
    params: {
      "populate[cars][populate][price][populate]": "*",
      "populate[cars][populate][car_ch][populate][brand]": "*",
      "populate[cars][populate][car_ch][populate][model]": "*",
      "populate[cars][populate][images][populate]": "*",
      populate: "image",
    },
  });
}
