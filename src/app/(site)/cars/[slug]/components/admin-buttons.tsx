"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Car, Status, statusValues } from "@/types/api/car";
import { useSetCarStatus } from "@/hooks/useSetCarStatus";
import toast from "react-hot-toast";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useSetCarFeatured } from "@/hooks/useSetCarFeatured";
import { useSendToSocialMediaMutation } from "@/hooks/useSendToSocialMediaMutation";
import { CheckedState } from "@radix-ui/react-checkbox";

type Props = {
  car: Car;
  refetch?: any;
};
export default function AdminButtons({ car, refetch }: Props) {
  const [status, setStatus] = useState<Status>(car.attributes.status);
  const [featured, setFeatured] = useState<boolean>(car.attributes.featured);

  const { data: user, isSuccess } = useCurrentUser();
  const { mutateAsync: sendToSocialMedia } = useSendToSocialMediaMutation();
  const { mutateAsync: setCarStatus } = useSetCarStatus();
  const { mutateAsync: setCarFeatured } = useSetCarFeatured();
  const handleFeaturedChange = async (value: CheckedState) => {
    setFeatured(value === "indeterminate" ? false : value);
    await setCarFeatured(
      {
        id: car.id,
        featured: value === "indeterminate" ? false : value,
      },
      {
        onSuccess: () => {
          refetch && refetch();
          toast.success("Updated successfully !");
        },
      },
    );
  };
  const handleStatusChange = async () => {
    await setCarStatus(
      {
        id: car.id,
        status,
      },
      {
        onSuccess: () => {
          toast.success("Car successfully updated !");
        },
      },
    );
    // const body = {
    //   value1:
    //     car.attributes.title +
    //     " - " +
    //     car.attributes.price?.currency +
    //     " " +
    //     car.attributes.price?.price +
    //     "<br>" +
    //     car.attributes.seller?.phone +
    //     "<br>Click for more details",
    //   value2: car.attributes.images?.data[0].attributes.url,
    //   value3:
    //     "https://www.meina.net/cars/" +
    //     car.attributes.slug +
    //     "-" +
    //     car.id +
    //     "?utm_source=facebook&utm_medium=social",
    // };
    // if (status === Status.Active) {
    //   await sendToSocialMedia(body, {
    //     onSuccess: () => {
    //       toast.success("sent to social !");
    //     },
    //   });
    // }
  };

  if (!isSuccess || user?.role?.type !== "admin") return null;
  return (
    <div className="flex flex-wrap items-center gap-2 border p-1">
      <Link href={`/cars/edit/${car.id}`}>
        <Button variant="outline" className="rounded-none">
          Edit car
        </Button>{" "}
      </Link>
      <Select
        value={status}
        onValueChange={(value: Status) => setStatus(value)}
      >
        <SelectTrigger className="w-fit">
          <SelectValue placeholder="Select price type" />
        </SelectTrigger>
        <SelectContent>
          {statusValues.map((value) => (
            <SelectItem value={value} key={value}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={handleStatusChange}>Save</Button>
      <Checkbox
        className="h-7 w-7"
        checked={featured}
        onCheckedChange={handleFeaturedChange}
      />
    </div>
  );
}
