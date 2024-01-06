import { fetcher } from "@/lib/fetcher";
import { Payload } from "@/types/api/common";
import { NavbarPopular } from "@/types/api/navbar-popular";

export default async function getNavbarPopular() {
  return await fetcher.get<Payload<NavbarPopular>>(`/navbar-popular`);
}
