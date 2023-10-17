import { MenuItemRouteType } from "@/data/navigation-data";

import React from "react";
import SocialMediaList from "./social-media-list";
import Logo from "../data-display/logo";
import Link from "next/link";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: MenuItemRouteType[];
}

const widgetMenus: WidgetFooterMenu[] = [
  /*{
    id: "5",
    title: "Getting started",
    menus: [
      { href: "/getting-started/release-notes", label: "Release Notes" },
      { href: "/getting-started/upgrade-guide", label: "Upgrade Guide" },
      { href: "/getting-started/browser-support", label: "Browser Support" },
      { href: "/getting-started/help", label: "Help" },
    ],
  },*/
  {
    id: "1",
    title: "Looking for",
    menus: [
      { href: "/cars/search?sellerType=private", label: "Cars by Private sellers" },
      { href: "/cars/search?sellerType=dealership", label: "Cars by dealerships" },
      { href: "/cars/search?sellerType=broker", label: "Cars by brokers" },
      { href: "/cars/search?sellerType=importer-exporter", label: "Cars to be imported" },
    ],
  },
  {
    id: "2",
    title: "Services",
    menus: [
      { href: "/services/loans-and-financing", label: "Financing services" },
      { href: "/services/insurance", label: "insurance services" },
      { href: "/services/spare-parts", label: "Spare parts" },
      { href: "/services/import", label: "Import services" },
    ],
  },
  {
    id: "3",
    title: "List cars by price",
    menus: [
      { href: "/cars/search?maxPrice=1000000", label: "Less than ETB 1,000,000" },
      { href: "/cars/search?minPrice=1000000&maxPrice=3000000", label: "ETB 1,000,000 - ETB 3,000,000" },
      { href: "/cars/search?minPrice=3000000&maxPrice=10000000", label: "ETB 3,000,000 - ETB 10,000,000" },
      { href: "/cars/search?minPrice=10000000", label: "Above ETB 10,000,000" },
    ],
  },
];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <Link
                key={index}
                className="text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                href={item.href}
                rel="noopener noreferrer"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="nc-Footer relative border-t border-neutral-200 py-20 dark:border-neutral-700 lg:pb-24 lg:pt-28">
      <div className="container grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
        <div className="col-span-2 grid grid-cols-4 gap-5 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
          <div className="col-span-2 md:col-span-1">
            <Logo />
          </div>
          <div className="col-span-2 flex items-center md:col-span-3">
            <SocialMediaList
              withName
              className="flex items-center space-x-2 lg:flex-col lg:items-start lg:space-x-0 lg:space-y-3"
            />
          </div>
        </div>
        {widgetMenus.map(renderWidgetMenuItem)}
      </div>
    </div>
  );
};

export default Footer;
