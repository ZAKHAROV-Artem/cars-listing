import { fetcher } from "@/lib/api-client";
import { Payload } from "@/types/api/common";
import { Model } from "@/types/api/model";

export default async function getModels() {
  return await fetcher.get<Payload<Model[]>>(`/models`, {
    params: {
      populate: "*",
      "pagination[pageSize]": "1000",
    },
  });
}
