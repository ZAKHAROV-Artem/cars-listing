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
import { useAdminButtonsMutation } from "@/hooks/useAdminButtonsMutation";

type Props = {
  car: Car;
  refetch?: any;
};
export default function AdminButtons({ car, refetch }: Props) {
  const [status, setStatus] = useState<Status>(car.attributes.status);
  const [featured, setFeatured] = useState<boolean>(car.attributes.featured);

  const { data: user, isSuccess } = useCurrentUser();
  const { mutateAsync } = useAdminButtonsMutation();
 

  
  
  async function postToSocialMedia() {
    const socialBody = JSON.stringify({
      Value1:	car.attributes.title + ' - ' + car.attributes.price?.currency + ' ' + car.attributes.price?.price + '<br>' + car.attributes.seller?.phone + '<br>Click for more details',
      Value2:	 car.attributes.images?.data[0].attributes.url,
      Value3: 'https://www.meina.net/cars/' + car.attributes.slug + '-' + car.id + '?utm_source=facebook&utm_medium=social'
    });
    
    console.log(socialBody);

    const if_url = "https://maker.ifttt.com/trigger/car_posted/with/key/bA3GfIfHiWa9WnaP3Kq2ea";
  const if_data = {
    value1: "Toyota Hiace",
    value2: "Corolla",
    value3: "https://mekina.s3.eu-west-1.amazonaws.com/22_image_2_car_47_03b1d4f561_f797c5be80.jpeg",
  };
  console.log(JSON.stringify(if_data));
  fetch(if_url, {
    method: "POST",
    mode: 'no-cors', 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(if_data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

    /*const response = await fetch('https://maker.ifttt.com/trigger/car_posted/with/key/bA3GfIfHiWa9WnaP3Kq2ea', {
      method: 'POST',
      mode: 'no-cors', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: socialBody
    });

    if (!response.ok) {
      toast.error("Failed to post to social!");
      
      throw new Error('Failed to post to social media');
    }*/
    toast.success("sent to social !");
  }
  
  const handleChange = async () => {
    await mutateAsync(
      {
        id: car.id,
        status,
        featured,
      },
      {
        onSuccess: () => {
          refetch && refetch();
          //if (status === 'active') postToSocialMedia();
          toast.success("Updated successfully !");
        },
      },
    );
  };

  if (!isSuccess || user?.role?.type !== "admin") return null;
  return (
    <div className="flex flex-wrap items-center gap-2 border p-1">
      <Link href={`/cars/edit/${car.id}`}>
        <Button variant="outline" className="rounded-none">
          Edit car
        </Button>{" "}
      </Link>
      <Select value={status} onValueChange={(value:Status)=>setStatus(value)}>
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
      <Checkbox
        className="h-7 w-7"
        checked={featured}
        onCheckedChange={(value) =>
          setFeatured(value === "indeterminate" ? false : value)
        }
      />
      <Button onClick={handleChange}>Save</Button>
    </div>
  );
}
