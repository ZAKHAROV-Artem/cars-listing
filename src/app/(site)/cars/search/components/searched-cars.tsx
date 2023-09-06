"use client";
import { Filter, useFilters } from "@/state/FiltersState";
import { useEffect } from "react";
import useSearchedCars from "@/hooks/useSearchedCars";
import CarsList from "@/components/cars/cars-list";
import CarSkeletonLayout from "@/components/ui/car-skeleton-layout";

type Props = {
  initialFilters?: Filter[];
};
export default function SearchedCars({ initialFilters = [] }: Props) {
  const filters = useFilters((state) => state.filters);
  console.log(JSON.stringify(filters));
  const { data, refetch, isLoading } = useSearchedCars([
    ...initialFilters,
    ...filters,
  ]);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, initialFilters]);

  return (
    <div className="relative z-10">
      {isLoading ? (
        <CarSkeletonLayout />
      ) : (
        <>
          {data?.pages.map((page, i) => (
            <CarsList cars={page.data.data} key={i} />
          ))}
        </>
      )}
    </div>
  );
}
