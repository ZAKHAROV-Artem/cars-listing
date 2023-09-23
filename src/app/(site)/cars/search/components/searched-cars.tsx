"use client";
import { Filter, useFilters } from "@/state/FiltersState";
import { useEffect } from "react";
import useSearchedCars from "@/hooks/useSearchedCars";
import CarsList from "@/components/cars/cars-list";
import CarSkeletonLayout from "@/components/ui/car-skeleton-layout";
import { InView } from "react-intersection-observer";

type Props = {
  initialFilters?: Filter[];
};
export default function SearchedCars({ initialFilters = [] }: Props) {
  const filters = useFilters((state) => state.filters);
  const {
    data,
    refetch,
    isInitialLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchedCars([...initialFilters, ...filters]);
  const handleNextPage = async (isView: boolean) => {
    if (isView && !isFetchingNextPage) await fetchNextPage();
  };
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, initialFilters]);

  return (
    <div className="relative z-10 space-y-1 sm:space-y-4">
      {data?.pages.map((page, i) => <CarsList cars={page.data.data} key={i} />)}
      {(isInitialLoading || isFetchingNextPage) && <CarSkeletonLayout />}
      {hasNextPage && (
        <InView
          as="div"
          className="absolute bottom-[400px] h-2 w-full bg-red-500 bg-transparent"
          onChange={handleNextPage}
        />
      )}
    </div>
  );
}
