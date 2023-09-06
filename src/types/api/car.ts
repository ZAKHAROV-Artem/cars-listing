import { User } from "../collections";
import {
  CarCharacteristics,
  CarCharacteristicsPlain,
} from "./car-characteristics";
import { Media, MediaPlain } from "./media";
import { Price, PricePlain } from "./price";
import { Seller } from "./seller";

export enum Location {
  AddisAbaba = "Addis Ababa",
  Adama = "Adama",
  BahirDar = "Bahir Dar",
  DireDawa = "Dire Dawa",
  Hawassa = "Hawassa",
  Mekelle = "Mekelle",
}
export enum Status {
  Inactive = "inactive",
  Active = "active",
  Expired = "expired",
  Sold = "sold",
}

export interface Car {
  id: number;
  attributes: {
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    title: string;
    description?: string;
    featured: boolean;
    location: Location;
    car_ch?: CarCharacteristics;
    price?: Price;
    seller?: Seller;
    images: { data: Media[] };
    at_top?: boolean;
    visits: number;
    slug: string;
    user?: { data: User };
    status: Status;
    car_expiration_date: Date;
    car_featured_expiration_date: Date;
  };
}

export interface CarPlain {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  title: string;
  description?: string;
  featured: boolean;
  location: Location;
  car_ch?: CarCharacteristicsPlain;
  price?: PricePlain;
  seller?: Seller;
  images: MediaPlain[];
  at_top?: boolean;
  visits: number;
  slug: string;
  user?: { data: User };
  status: Status;
  car_expiration_date: Date;
  car_featured_expiration_date?: Date;
}
