import { fetcherServer } from "@/lib/api-server";
import { Brand } from "@/types/api/brand";
import { Payload } from "@/types/api/common";

export default async function getBrands() {
  return await fetcherServer.get<Payload<Brand[]>>(`/brands`, {
    params: {
      populate: "image",
    },
  });
}
