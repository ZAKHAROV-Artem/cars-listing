import { Payload } from "@/types/api/common";
import { fetcherServer } from "@/lib/api-server";
import { StaticPage } from "@/types/api/static-page";

export default async function getStaticPage(slug: string) {
  return await fetcherServer.get<Payload<StaticPage[]>>(`/static-pages`, {
    params: {
      "filters[slug][$eq]": slug,
      "pagination[pageSize]": 1,
    },
  });
}
