import { fetcher } from "@/lib/api-client";
import { Brand } from "@/types/api/brand";
import { Payload } from "@/types/api/common";

export default async function getBrands() {
  return await fetcher.get<Payload<Brand[]>>(`/brands`, {
    params: {
      "sort[0]": "name",
    },
  });
}
