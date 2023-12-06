"use client";
import { Filter, useFilters } from "@/state/FiltersState";
import { useEffect, useState } from "react";
import useSearchedCars from "@/hooks/useSearchedCars";
import CarsList from "@/components/cars/cars-list";
import CarSkeletonLayout from "@/components/ui/car-skeleton-layout";
import Pagination from "@/components/ui/pagination";

type Props = {
  initialFilters?: Filter[];
};
export default function SearchedCars({ initialFilters = [] }: Props) {
  const filters = useFilters((state) => state.filters);
  const [page, setPage] = useState<number>(1);
  const {
    data: searchedCars,
    refetch,
    isLoading,
  } = useSearchedCars([...initialFilters, ...filters], page);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, initialFilters]);

  return (
    <div className="relative z-10 space-y-1 sm:space-y-4">
      {!!searchedCars?.data.meta.pagination?.pageCount  && (

        <div>
        Page {page} of {searchedCars?.data.meta.pagination?.pageCount}
      </div>
        )}
      {searchedCars?.data.data && <CarsList cars={searchedCars.data.data} />}
      {isLoading && <CarSkeletonLayout />}
      <div className="flex justify-center">
        <Pagination
          page={page}
          setPage={setPage}
          pageCount={searchedCars?.data.meta.pagination?.pageCount || 0}
        />
      </div>
    </div>
  );
}
