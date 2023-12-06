"use client";
import { useEffect, useState } from "react";
import Filters from "./components/filters";
import SearchedCars from "./components/searched-cars";
import { Filter, useFilters } from "@/state/FiltersState";
import CarSkeletonLayout from "@/components/ui/car-skeleton-layout";
import { useSearchParams } from "next/navigation";
import PostCarFloatingButton from "@/components/ui/post-car-floating-button";
import FiltersSearch from "./components/filters-search";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    setBodyType,
    setSellerType,
    setBrand,
    setModel,
    setQuery,
    setCategory,
    setColor,
    setFuel,
    setYearMade,
    setMinPrice,
    setMaxPrice,
    setMinMileage,
    setMaxMileage,
    setTransmission,
    setIsOpen,
    isOpen,
  } = useFilters();
  const [title, setTitle] = useState<string>("");
  const [initialFilters, setInitialFilters] = useState<Filter[]>([]);
  useEffect(() => {
    setIsLoading(true);
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
    if (searchParams.has("category") || "") {
      filters.push({
        key: "filters[category][slug][$eq]",
        value: searchParams.get("category") || "",
      });
      setCategory(searchParams.get("category") || "");
    }
    if (searchParams.has("color") || "") {
      filters.push({
        key: "filters[car_ch][color][$eq]",
        value: searchParams.get("color") || "",
      });
      setColor(searchParams.get("color") || "");
    }
    if (searchParams.has("fuel") || "") {
      filters.push({
        key: "filters[car_ch][fuel][$eq]",
        value: searchParams.get("fuel") || "",
      });
      setFuel(searchParams.get("fuel") || "");
    }
    if (searchParams.has("yearMade") || "") {
      filters.push({
        key: "filters[car_ch][year_made][$eq]",
        value: searchParams.get("yearMade") || "",
      });
      setYearMade(searchParams.get("yearMade") || "");
    }
    if (searchParams.has("sellerType") || "") {
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
    if (searchParams.has("model")) {
      filters.push({
        key: "filters[car_ch][model][slug][$eq]",
        value: searchParams.get("model") || "",
      });
      setModel(searchParams.get("model") || "");
    }
    if (searchParams.has("transmission")) {
      filters.push({
        key: "filters[car_ch][transmission][$eq]",
        value: searchParams.get("transmission") || "",
      });
      setTransmission(searchParams.get("transmission") || "");
    }
    if (searchParams.has("minPrice")) {
      filters.push({
        key: "filters[price][price][$gt]",
        value: searchParams.get("minPrice") || "",
      });
      setMinPrice(Number(searchParams.get("minPrice")) || 0);
    }
    if (searchParams.has("maxPrice")) {
      filters.push({
        key: "filters[price][price][$lt]",
        value: searchParams.get("maxPrice") || "",
      });
      setMaxPrice(Number(searchParams.get("maxPrice")) || 0);
    }
    if (searchParams.has("minMileage")) {
      filters.push({
        key: "filters[car_ch][mileage][$gt]",
        value: searchParams.get("minMileage") || "0",
      });
      setMinMileage(Number(searchParams.get("minMileage")));
    }
    if (searchParams.has("maxMileage")) {
      filters.push({
        key: "filters[car_ch][mileage][$lt]",
        value: searchParams.get("maxMileage") || "1000000",
      });
      setMaxMileage(Number(searchParams.get("maxMileage")));
    }
    if (searchParams.has("q")) {
      filters.push({
        key: "filters[title][$containsi]",
        value: searchParams.get("q") || "",
      });
      setQuery(searchParams.get("q") || "");
    }

    if (searchParams.has("bodyType")) {
      setTitle(
        `Search results for body type - ${searchParams.get("bodyType")}`,
      );
    } else if (searchParams.has("model")) {
      setTitle(`Search results for model - ${searchParams.get("model")}`);
    } else if (searchParams.has("brand")) {
      setTitle(`Search results for brand - ${searchParams.get("brand")}`);
    } else {
      setTitle(`Search results`);
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
        <div className="mt-7 text-2xl font-[400]">{title}</div>
        {isLoading ? (
          <CarSkeletonLayout className="mt-5" />
        ) : (
          <>
            {" "}
            <Filters />
            <SearchedCars initialFilters={initialFilters} />
          </>
        )}
      </div>
      <PostCarFloatingButton />
    </div>
  );
}
