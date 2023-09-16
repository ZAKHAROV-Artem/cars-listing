"use client";

import CarItemImage from "@/components/cars/car-item-image";
import useSellerCars from "@/hooks/useSellerCars";
import { Fragment } from "react";
import Link from "next/link";
import { InView } from "react-intersection-observer";
import CarItem from "@/components/cars/car-item";

type Props = { sellerId: string };
export default function SellerCarsList({ sellerId }: Props) {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSellerCars(sellerId);
  const handleNextPage = async (isView: boolean) => {
    if (isView && !isFetchingNextPage) await fetchNextPage();
  };
  return (
    <div className="relative grid grid-cols-2 lg:grid-cols-3 gap-2">
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.data.data?.map((car) => <CarItem car={car} key={car.id} />)}
        </Fragment>
      ))}
      {hasNextPage && (
        <InView
          as="div"
          className="absolute bottom-[400px] h-2 w-full bg-transparent"
          onChange={handleNextPage}
        />
      )}
    </div>
  );
}
