import { slugify } from "@/lib/utils";
import { Car } from "@/types/api/car";
import { Payload } from "@/types/api/common";
import { PostCarFields } from "@/validation/post-car-validation-schema";
import axios from "axios";
import dayjs from "dayjs";

export default async function postCar(data: PostCarFields) {
  return await axios.post<Payload<Car>>(
    `${process.env.NEXT_PUBLIC_API_URL}/cars`,
    {
      data: {
        status: "inactive",
        car_expiration_date: dayjs().add(30, "day").toDate(),
        car_featured_expiration_date: null,
        title: data.title,
        location: data.location,
        description: data.description,
        slug: slugify(`${data.title} ${Date.now()}`),
        ...(data.userId && {
          user: {
            connect: [data.userId],
          },
        }),
        car_ch: {
          year_made: data.year,
          engine_size: data.engineSize,
          fuel: data.fuel,
          transmission: data.transmission,
          mileage: data.mileage || -1,
          brand: {
            connect: [data.brandId],
          },
          model: {
            connect: [data.modelId],
          },
          body_type: {
            connect: [data.bodyTypeId],
          },
          color: data.color,
        },
        price: {
          price: data.price || -1,
          price_type: {
            connect: [data.priceTypeId],
          },
          currency: data.currency,
        },
        seller: {
          name: data.sellerName,
          phone: data.sellerPhone,
          social_media: [
            ...(data.telegram ? ["telegram"] : []),
            ...(data.whatsapp ? ["whatsapp"] : []),
            ...(data.viber ? ["viber"] : []),
          ],
          seller_type: {
            connect: [data.sellerTypeId],
          },
        },
        category: {
          connect: [data.categoryId],
        },
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_POST_CAR_API_TOKEN}`,
      },
    },
  );
}
