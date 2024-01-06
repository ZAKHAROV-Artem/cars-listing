import { fetcher } from "@/lib/fetcher";
import { Brand } from "@/types/api/brand";
import { Payload } from "@/types/api/common";
import { QueryParams } from "./getSearchedCars";
export default async function getBrands(filters?: QueryParams) {
  return await fetcher.get<Payload<Brand[]>>(`/brands`, {
    params: {
      populate: "image",
      ...filters,
    },
  });
}
