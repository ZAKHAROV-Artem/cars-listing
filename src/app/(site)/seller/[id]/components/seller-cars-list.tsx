"use client";

import CarItemImage from "@/components/cars/car-item-image";
import useSellerCars from "@/hooks/useSellerCars";
import { Fragment } from "react";
import Link from "next/link";
import { InView } from "react-intersection-observer";

type Props = { sellerId: string };
export default function SellerCarsList({ sellerId }: Props) {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSellerCars(sellerId);
  const handleNextPage = async (isView: boolean) => {
    if (isView && !isFetchingNextPage) await fetchNextPage();
  };
  return (
    <div className="relative grid grid-cols-2 gap-2">
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.data.data?.map((car) => (
            <Link
              href={`/cars/${car.attributes.slug}-${car.id}`}
              className="overflow-hidden rounded-xl"
              key={car.id}
            >
              <CarItemImage
                image={car.attributes.images.data[0].attributes.url}
                featured={car.attributes.featured}
                imgWrapperClassname="h-[150px] md:h-[220px]"
                width={450}
                height={450}
                price={car.attributes.price?.price}
                currency={car.attributes.price?.currency}
                priceType={
                  car.attributes.price?.price_type?.data.attributes.type
                }
                brand={car.attributes.car_ch?.brand?.data.attributes.name}
                model={car.attributes.car_ch?.model?.data.attributes.name}
              />
            </Link>
          ))}
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
