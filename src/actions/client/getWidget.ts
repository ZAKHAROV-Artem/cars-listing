import { fetcher } from "@/lib/api-client";
import { Payload } from "@/types/api/common";
import { Widget } from "@/types/api/widget";

export default async function getWidget(slug: string) {
  return await fetcher.get<Payload<Widget[]>>(`/widgets`, {
    params: {
      "filters[slug][$eq]": slug,
      "pagination[pageSize]": 1,
    },
  });
}
