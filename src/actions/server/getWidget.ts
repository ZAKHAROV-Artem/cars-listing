import { Payload } from "@/types/api/common";
import { fetcherServer } from "@/lib/api-server";
import { Widget } from "@/types/api/widget";

export default async function getWidget(slug: string) {
  return await fetcherServer.get<Payload<Widget[]>>(`/widgets`, {
    params: {
      "filters[slug][$eq]": slug,
      "pagination[pageSize]": 1,
    },
  });
}
