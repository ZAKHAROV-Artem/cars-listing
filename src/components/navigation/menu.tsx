"use client";
import { menuRoutes } from "@/data/navigation-data";
import { BsChevronDown } from "react-icons/bs";
import RouteItem from "./route-item";
import Link from "next/link";
import { cn } from "@/lib/utils";
import useNavbarPopular from "@/hooks/useNavbarPopular";
import useCategories from "@/hooks/useCategories";
import useWidget from "@/hooks/useWidget";
import Widget from "../ui/widget";

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
  const { data } = useNavbarPopular();
  const { data: categories } = useCategories();

  return (
    <div className="hidden h-full items-center lg:flex">
      <div className={menuItemWrappperClass}>
        <div className={menuItemClass}>
          Popular <BsChevronDown size={18} />
        </div>
        <div className={cn(menuItemClassPopupDefault, menuItemClassPopupHuge)}>
          <div className="container grid grid-cols-[1fr,1fr,1fr,2fr] gap-x-5 pb-5">
            <div>
              <div className="my-4 px-3 text-xl text-primary-main dark:text-dark-main">
                Categories
              </div>
              <div>
                {categories?.data.data.map((category) => (
                  <RouteItem
                    route={{
                      label: category.attributes.name,
                      href: `/cars/search?category=${category.attributes.slug}`,
                    }}
                    key={category.id}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="my-4 px-3 text-xl text-primary-main dark:text-dark-main">
                Popular brands
              </div>
              <div>
                {data?.data.data.attributes.brands.map((routeItem) => (
                  <RouteItem route={routeItem} key={routeItem.href} />
                ))}
              </div>
            </div>
            <div>
              <div className="my-4 px-3 text-xl text-primary-main dark:text-dark-main">
                Top dealerships
              </div>
              <div>
                {data?.data.data.attributes.dealerships.map((routeItem) => (
                  <RouteItem route={routeItem} key={routeItem.href} />
                ))}
              </div>
            </div>
            <Widget slug="navbar-popular" />
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
      {/*
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
          */}
      <div className={cn(menuItemWrappperClass, "relative")}>
        <Link href={menuRoutes.search} className={menuItemClass}>
          Search
        </Link>
      </div>
    </div>
  );
}
