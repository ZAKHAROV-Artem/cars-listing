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
  {
    id: "5",
    title: "Getting started",
    menus: [
      { href: "/getting-started/release-notes", label: "Release Notes" },
      { href: "/getting-started/upgrade-guide", label: "Upgrade Guide" },
      { href: "/getting-started/browser-support", label: "Browser Support" },
      { href: "/getting-started/help", label: "Help" },
    ],
  },
  {
    id: "1",
    title: "Explore",
    menus: [
      { href: "/explore/prototyping", label: "Prototyping" },
      { href: "/explore/design-systems", label: "Design systems" },
      { href: "/explore/pricing", label: "Pricing" },
      { href: "/explore/security", label: "Security" },
    ],
  },
  {
    id: "2",
    title: "Resources",
    menus: [
      { href: "/resources/best-practices", label: "Best practices" },
      { href: "/resources/support", label: "Support" },
      { href: "/resources/developers", label: "Developers" },
      { href: "/resources/learn-design", label: "Learn design" },
    ],
  },
  {
    id: "4",
    title: "Community",
    menus: [
      { href: "/community/discussion-forums", label: "Discussion Forums" },
      { href: "/community/code-of-conduct", label: "Code of Conduct" },
      { href: "/community/contributing", label: "Contributing" },
      { href: "/community/api-reference", label: "API Reference" },
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
