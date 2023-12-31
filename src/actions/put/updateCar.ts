import { fetcherAuth } from "@/lib/fetcher";
import { Car } from "@/types/api/car";
import { Payload } from "@/types/api/common";
import { PostCarFields } from "@/validation/post-car-validation-schema";

export default async function updateCar(carId: number, data: PostCarFields) {
  return await fetcherAuth.put<Payload<Car>>(`/cars/${carId}`, {
    data: {
      title: data.title,
      location: data.location,
      description: data.description,

      car_ch: {
        year_made: data.year,
        engine_size: data.engineSize,
        fuel: data.fuel,
        transmission: data.transmission,
        mileage: data.mileage || -1,
        brand: {
          connect: [data.brandId],
        },
        ...(data.modelId
          ? {
              model: {
                connect: [data.modelId],
              },
            }
          : {}),
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
        seller_type: {
          connect: [data.sellerTypeId],
        },
        social_media: [
          ...(data.telegram ? ["telegram"] : []),
          ...(data.whatsapp ? ["whatsapp"] : []),
          ...(data.viber ? ["viber"] : []),
        ],
      },
      ...(data.userId && {
        user: {
          connect: [data.userId],
        },
      }),
      category: {
        connect: [data.categoryId],
      },
      images: data.imagesIds,
    },
  });
}
