"use client";
import { Car, Status, statusValues } from "@/types/api/car";
import Image from "next/image";
import { cn, reduceString } from "@/lib/utils";
import { BsTrash } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { useSetCarStatus } from "@/hooks/useSetCarStatus";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import AdminButtons from "@/app/(site)/cars/[slug]/components/admin-buttons";

type Props = {
  car: Car;
  refetch: any;
  admin?: boolean;
};
export default function ListCarItem({ car, refetch, admin = false }: Props) {
  const { mutateAsync } = useSetCarStatus();
  const onSuccess = () => {
    refetch();
    toast.success("Updated successfully !");
  };
  const handleMarkAsSold = async () => {
    await mutateAsync({ id: car.id, status: Status.Sold }, { onSuccess });
  };

  const handleMarkAsInactive = async () => {
    await mutateAsync({ id: car.id, status: Status.Inactive }, { onSuccess });
  };
  const router = useRouter();
  return (
    <div className="grid gap-y-3 sm:grid-cols-[1.2fr,1fr]">
      <div className="flex gap-x-3">
        <div className="h-[80px] w-[120px] overflow-hidden rounded-md">
          <Image
            src={car.attributes.images.data[0].attributes.url || ""}
            alt={car.attributes.images.data[0].attributes.alternativeText || ""}
            width={120}
            height={80}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          {car.attributes.status === "active" || admin ? (
            <Link
              href={`/cars/${car.attributes.slug}-${car.id}`}
              className="text-xl"
            >
              {reduceString(car.attributes.title, 25)}
            </Link>
          ) : (
            <div className="text-xl">
              {reduceString(car.attributes.title, 25)}
            </div>
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
          <div className="text-md">order id: {car.id}</div>
        </div>
      </div>
      <div className="flex items-center gap-x-3 sm:justify-self-end">
        {admin ? (
          <AdminButtons car={car} refetch={refetch} />
        ) : (
          <>
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
            )}{" "}
          </>
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
