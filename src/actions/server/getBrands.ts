import { Brand } from "@/types/api/brand";
import { Payload } from "@/types/api/common";
import axios from "axios";

export default async function getBrands() {
  return await axios.get<Payload<Brand[]>>(`${process.env.API_URL}/brands`, {
    params: {
      populate: "image",
    },
  });
}
