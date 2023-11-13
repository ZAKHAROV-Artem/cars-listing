import { Car } from "@/types/api/car";
import { formatDistance } from "date-fns";
import Link from "next/link";
import CarItemImage from "./car-item-image";
import SellerTypeBadge from "../ui/seller-type-badge";
type Props = {
  car: Car;
};
export default function CarItem({ car }: Props) {
  return (
    <Link
      href={`/cars/${car.attributes.slug}-${car.id}`}
      className="cur relative overflow-hidden rounded-xl bg-white shadow-xl dark:bg-default-dark"
    >
      <CarItemImage
        image={
          car.attributes.images?.data
            ? car.attributes.images?.data[0].attributes.url
            : ""
        }
        featured={car.attributes.featured}
        alt={`${car.attributes.title}`}
        price={car.attributes.price?.price}
        currency={car.attributes.price?.currency}
        priceType={car.attributes.price?.price_type?.data.attributes.type}
      />

      <div className="p-4">
        <div className="text-sm sm:text-md">{car.attributes.title}</div>
        <div className="mt-3 text-sm">{car.attributes.seller?.phone}</div>
        <div className="text-disabled text-[12px] sm:text-sm">{`${car.attributes.car_ch?.year_made} | ${car.attributes.car_ch?.fuel} `}</div>
        <div className="mt-3 flex justify-between text-xs">
          <div>
            {formatDistance(
              new Date(car.attributes.createdAt).getTime(),
              Date.now(),
              {
                addSuffix: true,
              },
            )}
          </div>
          <SellerTypeBadge
            type={
              car.attributes.seller?.seller_type?.data.attributes.type || ""
            }
            slug={
              car.attributes.seller?.seller_type?.data.attributes.slug || ""
            }
          />
        </div>
      </div>
    </Link>
  );
}
