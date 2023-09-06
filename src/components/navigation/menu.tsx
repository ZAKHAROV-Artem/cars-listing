"use client";
import { menuRoutes } from "@/data/navigation-data";
import { BsChevronDown } from "react-icons/bs";
import RouteItem from "./route-item";
import Link from "next/link";
import { cn } from "@/lib/utils";
import useTopCars from "@/hooks/useTopCars";
import useFeaturedCars from "@/hooks/useFeaturedCars";

const menuItemWrappperClass = `
group 
flex 
h-full 
items-center
`;
const menuItemClass = `
flex 
cursor-pointer 
items-center 
gap-x-2 
rounded-3xl 
px-3 py-2 
hover:bg-white hover:text-light-main
`;
const menuItemClassPopupDefault = `
    invisible 
    absolute 
    z-10
    left-0 
    top-20  
    space-y-1 
    rounded-lg 
    border 
    bg-white 
    p-2 
    shadow-sm 
    group-hover:visible 
    dark:bg-paper-dark
    dark:text-white
    dark:border-none
`;
const menuItemClassPopupSmall = `
    w-[240px] 
`;
const menuItemClassPopupHuge = `
    w-full
`;
export default function Menu() {
  const { data: topCars } = useTopCars({
    "pagination[limit]": "16",
  });
  const { data: featuredCars } = useFeaturedCars({ "pagination[limit]": "8" });
  return (
    <div className="hidden h-full items-center lg:flex">
      <div className={menuItemWrappperClass}>
        <div className={menuItemClass}>
          Popular <BsChevronDown size={18} />
        </div>
        <div className={cn(menuItemClassPopupDefault, menuItemClassPopupHuge)}>
          <div className="mx-auto grid max-w-3xl grid-cols-3 gap-x-5 pb-5">
            <div>
              <div className="my-4 text-2xl text-light-main dark:text-dark-main">
                Popular cars
              </div>
              <div>
                {topCars?.data.data.slice(0, 8).map((car) => (
                  <RouteItem
                    route={{
                      label: `${car.attributes.car_ch?.brand?.data.attributes.name} ${car.attributes.car_ch?.model?.data.attributes.name}`,
                      href: `/cars/${car.attributes.slug}-${car.id}`,
                    }}
                    key={car.id}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="my-4 text-2xl text-light-main dark:text-dark-main">
                Featured cars
              </div>
              <div>
                {featuredCars?.data.data.map((car) => (
                  <RouteItem
                    route={{
                      label: `${car.attributes.car_ch?.brand?.data.attributes.name} ${car.attributes.car_ch?.model?.data.attributes.name}`,
                      href: `/cars/${car.attributes.slug}-${car.id}`,
                    }}
                    key={car.id}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="my-4 text-2xl text-light-main dark:text-dark-main">
                Other popular cars
              </div>
              <div>
                {topCars?.data.data.slice(8, 16).map((car) => (
                  <RouteItem
                    route={{
                      label: `${car.attributes.car_ch?.brand?.data.attributes.name} ${car.attributes.car_ch?.model?.data.attributes.name}`,
                      href: `/cars/${car.attributes.slug}-${car.id}`,
                    }}
                    key={car.id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cn(menuItemWrappperClass, "relative")}>
        <div className={menuItemClass}>
          Cars <BsChevronDown size={18} />
        </div>
        <div className={cn(menuItemClassPopupDefault, menuItemClassPopupSmall)}>
          {menuRoutes.cars.map((route) => (
            <RouteItem route={route} key={route.href} />
          ))}
        </div>
      </div>
      <div className={cn(menuItemWrappperClass, "relative")}>
        <div className={menuItemClass}>
          Sellers <BsChevronDown size={18} />
        </div>
        <div className={cn(menuItemClassPopupDefault, menuItemClassPopupSmall)}>
          {" "}
          {menuRoutes.sellers.map((route) => (
            <RouteItem route={route} key={route.href} />
          ))}
        </div>
      </div>{" "}
      <div className={cn(menuItemWrappperClass, "relative")}>
        <div className={menuItemClass}>
          Sell <BsChevronDown size={18} />
        </div>
        <div className={cn(menuItemClassPopupDefault, menuItemClassPopupSmall)}>
          {" "}
          {menuRoutes.sell.map((route) => (
            <RouteItem route={route} key={route.href} />
          ))}
        </div>
      </div>
      <div className={cn(menuItemWrappperClass, "relative")}>
        <div className={menuItemClass}>
          Services <BsChevronDown size={18} />
        </div>
        <div className={cn(menuItemClassPopupDefault, menuItemClassPopupSmall)}>
          {" "}
          {menuRoutes.services.map((route) => (
            <RouteItem route={route} key={route.href} />
          ))}
        </div>
      </div>
      <div className={cn(menuItemWrappperClass, "relative")}>
        <Link href={menuRoutes.search} className={menuItemClass}>
          Search
        </Link>
      </div>
    </div>
  );
}
