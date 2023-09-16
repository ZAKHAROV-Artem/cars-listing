import { MenuItemRouteType } from "@/data/navigation-data";

export interface NavbarPopular {
  id: number;
  attributes: {
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    brands: MenuItemRouteType[];
    models: MenuItemRouteType[];
    dealerships: MenuItemRouteType[];
  };
}
export interface NavbarPopularPlain {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  brands: MenuItemRouteType[];
  models: MenuItemRouteType[];
  dealerships: MenuItemRouteType[];
}
