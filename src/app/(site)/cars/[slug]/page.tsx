import getCar from "@/actions/get/getCar";
import CarImagesSlider from "./components/car-images-slider";
import SellerInfoFooter from "./components/seller-info-footer";
import incrementVisits from "@/actions/put/server/incrementVisits";
import ClientOnly from "@/components/client-only";
import dayjs from "dayjs";
import setCarStatus from "@/actions/put/server/setCarStatus";
import setCarFeatured from "@/actions/put/server/setCarFeatured";
import CarDetailSliderSkeleton from "@/components/ui/car-detail-slider-skeleton";
import Breadcrumbs from "./components/breadcrumbs";
import SecTopCars from "../../components/sections/sec-top-cars";
import Widget from "@/components/ui/widget";
import SellerTypeBadge from "@/components/ui/seller-type-badge";
import Link from "next/link";
import AdminButtons from "./components/admin-buttons";
import sendEmail from "@/actions/post/sendEmail";
import { formatNumberWithCommas } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Status } from "@/types/api/car";
import { BsTelegram, BsWhatsapp } from "react-icons/bs";
import { FaViber } from "react-icons/fa";
import { getServerAuth } from "@/lib/getServerAuth";

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
    if (car) {
      return {
        title: `${car.data.data.attributes?.title} - ${car.data.data.attributes
          .price?.currency}${formatNumberWithCommas(
          car.data.data.attributes.price?.price || 0,
        )}`,
        description: car.data.data.attributes.description,
        keywords: [
          `${car.data.data.attributes.title}`,
          `${car.data.data.attributes.car_ch?.brand?.data.attributes.name}`,
          `${
            car.data.data.attributes.car_ch?.model?.data?.attributes.name || ""
          }`,
          "used car price in ethiopia 2021, car price in ethiopia, car market in ethiopia, car for sale in ethiopia, new car price in ethiopia 2021, buy and sell cars, suzuki car price in ethiopia, car sales in ethiopia, car sell in ethiopia, cars for sale in ethiopia, used car price in ethiopia, diplomatic car for sale in ethiopia 2021",
        ],
        openGraph: {
          title: `${car.data.data.attributes.title} - ${car.data.data.attributes
            .price?.currency}${formatNumberWithCommas(
            car.data.data.attributes.price?.price || 0,
          )}`,
          description: car.data.data.attributes.description,
          images: [
            car.data.data.attributes.images?.data[0]?.attributes.url || "",
          ],
          type: "article",
          url: `${process.env.NEXTAUTH_URL}/cars/${car.data.data.attributes.slug}-${car.data.data.id}`,
          siteName: process.env.DOMAIN,
        },
        twitter: {
          title: `${car.data.data.attributes.title} - ${car.data.data.attributes
            .price?.currency}${formatNumberWithCommas(
            car.data.data.attributes.price?.price || 0,
          )}`,
          site: "@mekinanet",
          creator: "@mekinanet",
          description: car.data.data.attributes.description,
          images: [car.data.data.attributes.images.data[0].attributes.url],
        },
      };
    }
  }
  return {
    title: "Car detail page",
  };
}

export default async function CarDetail({ params: { slug } }: Props) {
  const id = slug.split("-").at(-1);
  if (!id) return redirect("/");
  const user = await getServerAuth();
  const car = await getCar(id, {
    ...(user?.role.type !== "admin"
      ? { "filters[status][$eq]": "active" }
      : {}),
  }).catch(() => {
    notFound();
  });
  if (!car) notFound();
  if (dayjs() > dayjs(car.data.data.attributes.car_expiration_date)) {
    await setCarStatus(car.data.data.id, Status.Inactive);
  }
  if (
    car.data.data.attributes?.featured &&
    car?.data.data.attributes?.car_featured_expiration_date &&
    dayjs() > dayjs(car.data.data.attributes.car_featured_expiration_date)
  ) {
    await setCarFeatured(car.data.data.id, false);
    if (user) {
      await sendEmail({
        templateReferenceId: "2",
        to: user.email,
        data: {
          user,
        },
      });
    }
  }
  await incrementVisits(
    car.data.data.id,
    car.data.data.attributes.visits,
  ).catch((err) => console.log(err.response.data));
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
              label:
                car.data.data.attributes.car_ch?.brand?.data.attributes.name ||
                "",
              href: `/cars/search?brand=${car.data.data.attributes.car_ch?.brand?.data.attributes.slug}`,
            },
            ...(car.data.data.attributes.car_ch?.model?.data?.attributes.name
              ? [
                  {
                    label:
                      car.data.data.attributes.car_ch?.model?.data.attributes
                        .name || "",
                    href: `/cars/search?brand=${car.data.data.attributes.car_ch?.brand?.data.attributes.slug}&model=${car.data.data.attributes.car_ch?.model?.data.attributes.slug}`,
                  },
                ]
              : []),
          ]}
          title={car.data.data.attributes.title}
        />
      </div>
      <div className="grid grid-cols-1 md:gap-4 lg:grid-cols-[65%_35%]">
        <ClientOnly fallback={<CarDetailSliderSkeleton />}>
          <CarImagesSlider
            images={car.data.data.attributes.images.data.sort((a, b) => {
              const nameA = a.attributes.name;
              const nameB = b.attributes.name;
              return nameA.localeCompare(nameB);
            })}
          />
        </ClientOnly>
        <div className="space-y-3 bg-paper-light p-4 dark:bg-paper-dark md:rounded-2xl lg:h-full lg:p-8">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4">
            <h1 className="text-xl font-semibold text-primary sm:text-3xl">
              {car.data.data.attributes.title}
            </h1>
            <div className="text-2xl text-md text-light-main dark:text-dark-main  sm:text-xl">
              {car.data.data.attributes.price?.price_type?.data.attributes
                .slug !== "on-call" && (
                <>
                  {formatNumberWithCommas(
                    car.data.data.attributes.price?.price || 0,
                  )}{" "}
                  {car.data.data.attributes.price?.currency}
                </>
              )}{" "}
              (
              {car.data.data.attributes.price?.price_type?.data.attributes.type}
              )
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">Seller</h2>
            <div className="flex flex-col gap-3 md:pl-5">
              <div className="flex  items-center gap-x-3 lg:block">
                <div>{car.data.data.attributes.seller?.name}</div>
                <Link
                  className="text-violet-700 underline"
                  href={`tel:${car.data.data.attributes.seller?.phone}`}
                >
                  {car.data.data.attributes.seller?.phone}
                </Link>
              </div>
              {car.data.data.attributes.seller?.social_media && (
                <div className="my-3 flex flex-wrap gap-3">
                  {car.data.data.attributes.seller?.social_media.includes(
                    "telegram",
                  ) && (
                    <Link
                      href={`https://t.me/${car.data.data.attributes.seller?.phone}`}
                      target="_blank"
                      className="flex items-center gap-x-1"
                    >
                      <BsTelegram size={30} className="text-blue-400" />{" "}
                      Telegram
                    </Link>
                  )}
                  {car.data.data.attributes.seller?.social_media.includes(
                    "whatsapp",
                  ) && (
                    <Link
                      href={`https://wa.me/${car.data.data.attributes.seller?.phone}`}
                      target="_blank"
                      className="flex items-center gap-x-1"
                    >
                      <BsWhatsapp size={30} className="text-green-400" />{" "}
                      Whatsapp
                    </Link>
                  )}
                  {car.data.data.attributes.seller?.social_media.includes(
                    "viber",
                  ) && (
                    <Link
                      href={`viber://contact?number=${car.data.data.attributes.seller?.phone}`}
                      target="_blank"
                      className="flex items-center gap-x-1"
                    >
                      <FaViber size={30} className="text-purple-400" /> Viber
                    </Link>
                  )}
                </div>
              )}
              <SellerTypeBadge
                type={
                  car.data.data.attributes.seller?.seller_type?.data.attributes
                    .type || ""
                }
                slug={
                  car.data.data.attributes.seller?.seller_type?.data.attributes
                    .slug || ""
                }
              />
              <AdminButtons car={car.data.data} />
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
                      {
                        car.data.data.attributes.car_ch?.brand?.data.attributes
                          .name
                      }
                    </span>
                  </div>
                  <Separator className="my-1" />
                </div>
                <div>
                  <div className="flex w-full justify-between">
                    Model :{" "}
                    <span className="text-light-light dark:text-dark-light">
                      {car.data.data.attributes.car_ch?.model?.data?.attributes
                        .name || "No model"}
                    </span>
                  </div>
                  <Separator className="my-1" />
                </div>
                <div>
                  <div className="flex w-full justify-between">
                    Body type :{" "}
                    <span className="text-light-light dark:text-dark-light">
                      {
                        car.data.data.attributes.car_ch?.body_type?.data
                          .attributes.type
                      }
                    </span>
                  </div>
                  <Separator className="my-1" />
                </div>
                <div>
                  <div className="flex w-full justify-between">
                    Year made :{" "}
                    <span className="text-light-light dark:text-dark-light">
                      {car.data.data.attributes.car_ch?.year_made}
                    </span>
                  </div>
                  <Separator className="my-1" />
                </div>
                {Number(car.data.data.attributes.car_ch?.mileage) !== -1 && (
                  <div>
                    <div className="flex w-full justify-between">
                      Mileage :{" "}
                      <span className="text-light-light dark:text-dark-light">
                        {car.data.data.attributes.car_ch?.mileage}
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
                      {car.data.data.attributes.car_ch?.color}
                    </span>
                  </div>{" "}
                  <Separator className="my-1" />
                </div>{" "}
                <div>
                  <div className="flex w-full justify-between">
                    Fuel :{" "}
                    <span className="text-light-light dark:text-dark-light">
                      {car.data.data.attributes.car_ch?.fuel}
                    </span>
                  </div>
                  <Separator className="my-1" />
                </div>
                <div>
                  <div className="flex w-full justify-between">
                    Transmission :{" "}
                    <span className="text-light-light dark:text-dark-light">
                      {car.data.data.attributes.car_ch?.transmission}
                    </span>
                  </div>
                  <Separator className="my-1" />
                </div>
                <div>
                  <div className="flex w-full justify-between">
                    Engine size :{" "}
                    <span className="text-light-light dark:text-dark-light">
                      {car.data.data.attributes.car_ch?.engine_size}
                    </span>
                  </div>
                  <Separator className="my-1" />
                </div>
                <div>
                  <div className="flex w-full justify-between">
                    Location :{" "}
                    <span className="text-light-light dark:text-dark-light">
                      {car.data.data.attributes.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5">{car.data.data.attributes.description}</div>
          </div>
        </div>
        <div className="bg-paper-light p-4 dark:bg-paper-dark md:rounded-2xl lg:p-8 ">
          <Widget slug="detail-page-widget-2" />
        </div>
      </div>
      <SellerInfoFooter seller={car.data.data.attributes.seller} />
      <SecTopCars className="mt-5" />
    </div>
  );
}
