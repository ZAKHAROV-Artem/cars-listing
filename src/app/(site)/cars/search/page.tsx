"use client";
import { useEffect, useState } from "react";
import Filters from "./components/filters";
import SearchedCars from "./components/searched-cars";
import { Filter, useFilters } from "@/state/FiltersState";
import CarSkeletonLayout from "@/components/ui/car-skeleton-layout";
import { useSearchParams } from "next/navigation";
import PostCatFloatingButton from "@/components/ui/post-car-floating-button";
import FiltersSearch from "./components/filters-search";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setBodyType, setSellerType, setBrand, setQuery, setIsOpen, isOpen } =
    useFilters((state) => ({
      setBodyType: state.setBodyType,
      setSellerType: state.setSellerType,
      setBrand: state.setBrand,
      setQuery: state.setQuery,
      setIsOpen: state.setIsOpen,
      isOpen: state.isOpen,
    }));

  const [initialFilters, setInitialFilters] = useState<Filter[]>([]);
  useEffect(() => {
    const filters: Filter[] = [];
    if (searchParams.has("bodyType")) {
      filters.push({
        key: "filters[car_ch][body_type][slug][$eq]",
        value: searchParams.get("bodyType") || "",
      });

      setBodyType(searchParams.get("bodyType") || "");
    }
    if (searchParams.has("sellerType")) {
      filters.push({
        key: "filters[seller][seller_type][slug][$eq]",
        value: searchParams.get("sellerType") || "",
      });
      setSellerType(searchParams.get("sellerType") || "");
    }
    if (searchParams.has("brand") || "") {
      filters.push({
        key: "filters[car_ch][brand][slug][$eq]",
        value: searchParams.get("brand") || "",
      });
      setBrand(searchParams.get("brand") || "");
    }
    if (searchParams.has("q")) {
      filters.push({
        key: "filters[title][$contains]",
        value: searchParams.get("q") || "",
      });
      setQuery(searchParams.get("q") || "");
    }
    setInitialFilters(filters);
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  return (
    <div>
      <div className="relative flex w-full items-center justify-center">
        <FiltersSearch />
      </div>
      <div className="grid gap-x-5 space-y-5 pb-10 sm:container">
        {isLoading ? (
          <CarSkeletonLayout />
        ) : (
          <>
            {" "}
            <Filters />
            <SearchedCars initialFilters={initialFilters} />
          </>
        )}
      </div>
      <PostCatFloatingButton />
    </div>
  );
}
