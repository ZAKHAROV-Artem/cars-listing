import { fetcher } from "@/lib/fetcher";
import { Payload } from "@/types/api/common";
import { Model } from "@/types/api/model";

export default async function getModels({
  id,
  slug,
}: {
  id?: string;
  slug?: string;
}) {
  return await fetcher.get<Payload<Model[]>>(`/models`, {
    params: {
      populate: "*",
      "sort[0]": "name",
      "pagination[pageSize]": "999",
      ...(id && {
        "filters[brand][id]": id,
      }),
      ...(slug && {
        "filters[brand][slug]": slug,
      }),
    },
  });
}
