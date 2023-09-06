import { BodyType } from "@/types/api/body-type";
import { Payload } from "@/types/api/common";
import axios from "axios";

export default async function getBodyTypes() {
  return await axios.get<Payload<BodyType[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/body-types`,
    {
      params: {
        populate: "*",
      },
    },
  );
}
