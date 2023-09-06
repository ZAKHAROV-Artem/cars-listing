import { Category } from "@/types/api/category";
import { Payload } from "@/types/api/common";
import axios from "axios";

export default async function getCategories() {
  return await axios.get<Payload<Category[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
  );
}
