import { Payload } from "@/types/api/common";
import { Model } from "@/types/api/model";
import axios from "axios";

export default async function getModels(brandId: string) {
  return await axios.get<Payload<Model[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/models`,
    {
      params: {
        "filters[brand][id]": brandId,
        populate: "*",
      },
    },
  );
}
