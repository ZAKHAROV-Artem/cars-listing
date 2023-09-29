import getCar from "@/actions/server/getCar";
import CarImagesSlider from "./components/car-images-slider";
import { Separator } from "@/components/ui/separator";
import SellerInfoFooter from "./components/seller-info-footer";
import incrementVisits from "@/actions/server/incrementVisits";
import { formatNumberWithCommas } from "@/lib/utils";
import ClientOnly from "@/components/client-only";
import { notFound, redirect } from "next/navigation";
import dayjs from "dayjs";
import setCarStatus from "@/actions/server/setCarStatus";
import { Status } from "@/types/api/car";
import setCarFatuted from "@/actions/server/setCarFatuted";
import CarDetailSliderSkeleton from "@/components/ui/car-detail-slider-skeleton";
import Breadcrumbs from "./components/breadcrumbs";
import Sec02TopCars from "../../components/sections/sec-02-top-cars";
import Widget from "@/components/ui/widget";
import SellerTypeBadge from "@/components/ui/seller-type-badge";
import type { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: { slug: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  const id = slug.split("-").at(-1);
  if (id) {
    const car = await getCar(id, {
      "filters[status][$eq]": "active",
    }).catch(() => {
      notFound();
    });
    return {
      title: `${car.attributes.title} - ${car.attributes.price?.price}${car.attributes.price?.currency}`,
      description: car.attributes.description,
      keywords: [
        `${car.attributes.title}`,
        `${car.attributes.car_ch?.brand?.data.attributes.name}`,
        `${car.attributes.car_ch?.model?.data.attributes.name}`,
        "used car price in ethiopia 2021, car price in ethiopia, car market in ethiopia, car for sale in ethiopia, new car price in ethiopia 2021, buy and sell cars, suzuki car price in ethiopia, car sales in ethiopia, car sell in ethiopia, cars for sale in ethiopia, used car price in ethiopia, diplomatic car for sale in ethiopia 2021",
      ],
      openGraph: {
        title: `${car.attributes.title} - ${car.attributes.price?.price}${car.attributes.price?.currency}`,
        description: car.attributes.description,
        images: [car.attributes.images.data[0].attributes.url],
        type: "article",
        url: `${process.env.NEXTAUTH_URL}/cars/${car.attributes.slug}-${car.id}`,
        siteName: process.env.DOMAIN,
      },
      twitter: {
        title: `${car.attributes.title} - ${car.attributes.price?.price}${car.attributes.price?.currency}`,
        site: "@mekinanet",
        creator: "@mekinanet",
        description: car.attributes.description,
        images: [car.attributes.images.data[0].attributes.url],
      },
    };
  } else {
    return {
      title: "Car detail page",
    };
  }
}

export default async function CarDetail({ params: { slug } }: Props) {
  const id = slug.split("-").at(-1);
  if (!id) return redirect("/");
  const car = await getCar(id, {
    "filters[status][$eq]": "active",
  }).catch(() => {
    notFound();
  });
  if (!car) notFound();
  if (dayjs() > dayjs(car.attributes.car_expiration_date)) {
    await setCarStatus(car.id, Status.Inactive);
  }
  if (
    car.attributes?.featured &&
    car?.attributes?.car_featured_expiration_date &&
    dayjs() > dayjs(car.attributes.car_featured_expiration_date)
  ) {
    await setCarFatuted(car.id, false);
  }

  await incrementVisits(car.id, car.attributes.visits);
  return (
    <div className="md:container md:py-10">
      <div className="mb-4 hidden items-center justify-between md:flex">
        <Breadcrumbs
          items={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: car.attributes.car_ch?.brand?.data.attributes.name || "",
              href: `/cars/search?brand=${car.attributes.car_ch?.brand?.data.attributes.slug}`,
            },
            {
              label: car.attributes.car_ch?.model?.data.attributes.name || "",
              href: `/cars/search?brand=${car.attributes.car_ch?.brand?.data.attributes.slug}&model=${car.attributes.car_ch?.model?.data.attributes.slug}`,
            },
          ]}
          title={car.attributes.title}
        />
      </div>
      <div className="grid grid-cols-1 md:gap-4 lg:grid-cols-[65%_35%]">
        <ClientOnly fallback={<CarDetailSliderSkeleton />}>
          <CarImagesSlider images={car.attributes.images.data} />
        </ClientOnly>
        <div className="space-y-3 bg-paper-light p-4 dark:bg-paper-dark md:rounded-2xl lg:h-full lg:p-8">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4">
            <h1 className="text-xl font-semibold text-primary sm:text-3xl">
              {car.attributes.title}
            </h1>
            <div className="text-2xl text-md text-light-main dark:text-dark-main  sm:text-xl">
              {car.attributes.price?.price_type?.data.attributes.slug !==
                "on-call" && (
                <>
                  {formatNumberWithCommas(car.attributes.price?.price || 0)}{" "}
                  {car.attributes.price?.currency}
                </>
              )}{" "}
              ({car.attributes.price?.price_type?.data.attributes.type})
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">Seller</h2>
            <div className="flex flex-col gap-x-3">
              <div>Name : {car.attributes.seller?.name}</div>
              <Link href={`tel:${car.attributes.seller?.phone}`}>
                Phone : {car.attributes.seller?.phone}
              </Link>
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
          <Widget slug="detail-page-widget" />
        </div>
        <div className="bg-paper-light p-4 dark:bg-paper-dark md:rounded-2xl lg:p-8 ">
          <h2 className="text-xl font-semibold sm:text-2xl">Description</h2>
          <div className="md:pl-5">
            <div className="mt-5 grid grid-cols-1 gap-10 sm:grid-cols-2">
              <div>
                <div>
                  <div className="flex w-full justify-between">
                    Brand :
                    <span className="text-light-light dark:text-dark-light">
                      {car.attributes.car_ch?.brand?.data.attributes.name}
                    </span>
                  </div>
                  <Separator className="my-1" />
                </div>
                <div>
                  <div className="flex w-full justify-between">
                    Model :{" "}
                    <span className="text-light-light dark:text-dark-light">
                      {car.attributes.car_ch?.model?.data.attributes.name}
                    </span>
                  </div>
                  <Separator className="my-1" />
                </div>
                <div>
                  <div className="flex w-full justify-between">
                    Body type :{" "}
                    <span className="text-light-light dark:text-dark-light">
                      {car.attributes.car_ch?.body_type?.data.attributes.type}
                    </span>
                  </div>
                  <Separator className="my-1" />
                </div>
                <div>
                  <div className="flex w-full justify-between">
                    Year made :{" "}
                    <span className="text-light-light dark:text-dark-light">
                      {car.attributes.car_ch?.year_made}
                    </span>
                  </div>
                  <Separator className="my-1" />
                </div>
                {Number(car.attributes.car_ch?.mileage) !== -1 && (
                  <div>
                    <div className="flex w-full justify-between">
                      Mileage :{" "}
                      <span className="text-light-light dark:text-dark-light">
                        {car.attributes.car_ch?.mileage}
                      </span>
                    </div>{" "}
                    <Separator className="my-1" />
                  </div>
                )}
              </div>
              <div>
                <div>
                  <div className="flex w-full justify-between">
                    Color :
                    <span className="text-light-light dark:text-dark-light">
                      {car.attributes.car_ch?.color}
                    </span>
                  </div>{" "}
                  <Separator className="my-1" />
                </div>{" "}
                <div>
                  <div className="flex w-full justify-between">
                    Fuel :{" "}
                    <span className="text-light-light dark:text-dark-light">
                      {car.attributes.car_ch?.fuel}
                    </span>
                  </div>
                  <Separator className="my-1" />
                </div>
                <div>
                  <div className="flex w-full justify-between">
                    Transmission :{" "}
                    <span className="text-light-light dark:text-dark-light">
                      {car.attributes.car_ch?.transmission}
                    </span>
                  </div>
                  <Separator className="my-1" />
                </div>
                <div>
                  <div className="flex w-full justify-between">
                    Engine size :{" "}
                    <span className="text-light-light dark:text-dark-light">
                      {car.attributes.car_ch?.engine_size}
                    </span>
                  </div>
                  <Separator className="my-1" />
                </div>
                <div>
                  <div className="flex w-full justify-between">
                    Location :{" "}
                    <span className="text-light-light dark:text-dark-light">
                      {car.attributes.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5">{car.attributes.description}</div>
          </div>
        </div>
        <div className="bg-paper-light p-4 dark:bg-paper-dark md:rounded-2xl lg:p-8 ">
          <Widget slug="detail-page-widget-2" />
        </div>
      </div>
      <SellerInfoFooter seller={car.attributes.seller} />
      <Sec02TopCars className="mt-5" />
    </div>
  );
}
