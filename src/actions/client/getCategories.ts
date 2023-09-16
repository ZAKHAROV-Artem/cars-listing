import { fetcher } from "@/lib/api-client";
import { Category } from "@/types/api/category";
import { Payload } from "@/types/api/common";

export default async function getCategories() {
  return await fetcher.get<Payload<Category[]>>(`/categories`);
}
