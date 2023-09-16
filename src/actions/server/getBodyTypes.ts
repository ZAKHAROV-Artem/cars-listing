import { fetcherServer } from "@/lib/api-server";
import { BodyType } from "@/types/api/body-type";
import { Payload } from "@/types/api/common";

export default async function getBodyTypes() {
  return await fetcherServer.get<Payload<BodyType[]>>(`/body-types`, {
    params: {
      populate: "*",
    },
  });
}
