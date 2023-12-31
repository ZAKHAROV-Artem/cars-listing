import { fetcher } from "@/lib/fetcher";
import { BodyType } from "@/types/api/body-type";
import { Payload } from "@/types/api/common";

export default async function getBodyTypes() {
  return await fetcher.get<Payload<BodyType[]>>(`/body-types`, {
    params: {
      populate: "*",
    },
  });
}
