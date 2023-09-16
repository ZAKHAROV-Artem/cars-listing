import facebook from "@/../public/imgs/socials/facebook.svg";
import twitter from "@/../public/imgs/socials/twitter.svg";
import telegram from "@/../public/imgs/socials/telegram.svg";
import youtube from "@/../public/imgs/socials/youtube.svg";
import { IconType } from "react-icons";
import { AiOutlineUser } from "react-icons/ai";
import { BsFillCarFrontFill } from "react-icons/bs";
import { HiOutlineClipboardList } from "react-icons/hi";
export type MenuItemRouteType = {
  label: string;
  href: string;
  targetBlank?: boolean;
};

const carsMenuItemRoutes: MenuItemRouteType[] = [
  {
    label: "All cars",
    href: "/cars/search/",
  },
  {
    label: "Private sellers cars",
    href: "/cars/search?sellerType=private",
  },
  {
    label: "Dealership cars",
    href: "/cars/search?sellerType=dealership",
  },
  {
    label: "Broker cars",
    href: "/cars/search?sellerType=broker",
  },
  {
    label: "Search cars",
    href: "/cars/search",
  },
];
const sellersMenuItemRoutes: MenuItemRouteType[] = [
  {
    label: "Dealerships",
    href: "/sellers/dealership",
  },
  {
    label: "Brokers",
    href: "/sellers/broker",
  },
  {
    label: "Importers / Exporters",
    href: "/sellers/importer-exporter",
  },
];
const sellMenuItemRoutes: MenuItemRouteType[] = [
  {
    label: "Publish your car",
    href: "/cars/post",
  },
  {
    label: "How to sell your car ?",
    href: "/guides/how-to-sell-your-car",
  },
];
const servicesMenuItemRoutes: MenuItemRouteType[] = [
  {
    label: "Loans / Financing",
    href: "/services/loans-and-financing",
  },
  {
    label: "Insurance",
    href: "/services/insurance",
  },
  {
    label: "Spare Parts",
    href: "/services/spare-parts",
  },
  {
    label: "Import Services",
    href: "/services/import",
  },
];
export const menuRoutes = {
  cars: carsMenuItemRoutes,
  sellers: sellersMenuItemRoutes,
  sell: sellMenuItemRoutes,
  services: servicesMenuItemRoutes,
  search: "/cars/search",
};
export const socialsLinks = [
  { name: "Facebook", icon: facebook, href: "#" },
  { name: "Twitter", icon: twitter, href: "#" },
  { name: "Youtube", icon: youtube, href: "#" },
  { name: "Telegram", icon: telegram, href: "#" },
];
export type MenuPopoverItemType = {
  icon: IconType;
} & MenuItemRouteType;
export const menuPopoverItemsMain: MenuPopoverItemType[] = [
  {
    href: "/user/account/information",
    label: "Account",
    icon: AiOutlineUser,
  },
  {
    href: "/checkout",
    label: "My Order",
    icon: HiOutlineClipboardList,
  },
  {
    href: "/user/account/carlist",
    label: "My cars",
    icon: BsFillCarFrontFill,
  },
];

export const accountPageRoutes: MenuItemRouteType[] = [
  {
    label: "Account info",
    href: "/user/account/information",
  },
  {
    label: "Carlist",
    href: "/user/account/carlist",
  },
  {
    label: "Change password",
    href: "/user/account/change-password",
  },
];

export const LOGIN_ROUTE = "/auth/login";
export const REGISTER_ROUTE = "/auth/register";
