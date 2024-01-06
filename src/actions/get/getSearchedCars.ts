import { Filter } from "@/state/FiltersState";
import { Payload } from "@/types/api/common";
import { Car } from "@/types/api/car";
import { fetcher } from "@/lib/fetcher";

export type QueryParams = {
  [key: string]: string;
};
export default async function getSearchedCars({
  filters,
  page,
}: {
  filters: Filter[];
  page?: number;
}) {
  let queryParams: QueryParams = {};
  for (let filter of filters) {
    queryParams[filter.key] = filter.value;
  }
  return await fetcher.get<Payload<Car[]>>(`/cars`, {
    params: {
      "pagination[pageSize]": "20",
      "pagination[page]": page,
      "filters[status][$eq]": "active",
      "fields[0]": "title",
      "fields[1]": "createdAt",
      "fields[2]": "featured",
      "fields[3]": "slug",
      "populate[car_ch][fields][0]": "year_made",
      "populate[car_ch][fields][1]": "fuel",
      "populate[price][populate]": "*",
      "populate[seller][populate]": "*",
      "populate[images][fields][0]": "url",
      "sort[0]": "car_publication_date:desc",
      ...queryParams,
    },
  });
}
