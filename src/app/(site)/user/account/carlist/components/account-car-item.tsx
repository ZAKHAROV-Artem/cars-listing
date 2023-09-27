"use client";
import { Car, Status } from "@/types/api/car";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BsTrash } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { useSetCarStatus } from "@/hooks/useSetCarStatus";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  car: Car;
  refetch: any;
};
export default function AccountCarItem({ car, refetch }: Props) {
  const { mutateAsync } = useSetCarStatus();
  const handleMarkAsSold = async () => {
    await mutateAsync({ id: car.id, status: Status.Sold });
    await refetch();
  };
  const handleMarkAsInactive = async () => {
    await mutateAsync({ id: car.id, status: Status.Inactive });
    await refetch();
  };
  const handleMarkAsActive = async () => {
    await mutateAsync({ id: car.id, status: Status.Active });
    await refetch();
  };
  const router = useRouter();
  return (
    <div className="grid gap-y-3 sm:grid-cols-[2fr,1fr]">
      <div className="flex gap-x-3">
        <div className="h-[80px] w-[120px] overflow-hidden rounded-md">
          <Image
            src={car.attributes.images.data[0].attributes.url}
            alt={car.attributes.images.data[0].attributes.alternativeText || ""}
            width={120}
            height={80}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          {car.attributes.status === "active" ? (
            <Link
              href={`/cars/${car.attributes.slug}-${car.id}`}
              className="text-xl"
            >
              {car.attributes.title}
            </Link>
          ) : (
            <div className="text-xl">{car.attributes.title}</div>
          )}
          <div className="flex items-center gap-x-1">
            <div
              className={cn("h-5 w-5 rounded-full", {
                "bg-green-400": car.attributes.status === Status.Active,
                "bg-yellow-400": car.attributes.status === Status.Inactive,
                "bg-red-400": car.attributes.status === Status.Expired,
                "bg-slate-400": car.attributes.status === Status.Sold,
              })}
            />
            <div className="text-md">{car.attributes.status}</div>
          </div>
          {(car.attributes.status === Status.Active ||
            car.attributes.status === Status.Sold) && (
            <div className="text-md">order id: {car.id}</div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-x-3 sm:justify-self-end">
        {car.attributes.status === Status.Active && (
          <Button onClick={handleMarkAsSold}>Mark as sold</Button>
        )}
        {car.attributes.status !== Status.Sold && (
          <AiOutlineEdit
            size={23}
            onClick={() => router.push(`/cars/edit/${car.id}`)}
            className="cursor-pointer duration-200 hover:text-green-500"
          />
        )}
        {car.attributes.status === Status.Active && (
          <BsTrash
            onClick={handleMarkAsInactive}
            size={23}
            className="cursor-pointer duration-200 hover:text-primary-main"
          />
        )}
        {/* {car.attributes.status === Status.Inactive && (
          <FaCheck
            onClick={handleMarkAsActive}
            size={23}
            className="cursor-pointer duration-200 hover:text-primary-main"
          />
        )} */}
      </div>
    </div>
  );
}
