import { Car } from "@/types/api/car";
import { formatDistance } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BsTrash } from "react-icons/bs";
type Props = {
  car: Car;
};
export default function AccountCarItem({ car }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-x-3">
        <div className="h-[60px] overflow-hidden rounded-md">
          <Image
            src={car.attributes.images.data[0].attributes.url}
            alt={car.attributes.images.data[0].attributes.alternativeText || ""}
            width={230}
            height={150}
            className="h-full w-full object-contain"
          />
        </div>
        <div>
          <div className="text-xl">{car.attributes.title}</div>
          <div className="flex items-center gap-x-1">
            <div
              className={cn("h-5 w-5 rounded-full", {
                "bg-green-400": car.attributes.status === "active",
                "bg-yellow-400": car.attributes.status === "inactive",
                "bg-red-400": car.attributes.status === "expired",
                "bg-slate-400": car.attributes.status === "sold",
              })}
            />
            <div className="text-md">{car.attributes.status}</div>
          </div>
        </div>
      </div>
      <div className="flex gap-x-3">
        <BsTrash
          size={23}
          className="cursor-pointer duration-200 hover:text-primary-main"
        />
      </div>
    </div>
  );
}
