import { Payload } from "@/types/api/common";
import { fetcher } from "@/lib/fetcher";
import { StaticPage } from "@/types/api/static-page";

export default async function getStaticPage(slug: string) {
  return await fetcher.get<Payload<StaticPage[]>>(`/static-pages`, {
    params: {
      "filters[slug][$eq]": slug,
      "pagination[pageSize]": 1,
    },
  });
}
