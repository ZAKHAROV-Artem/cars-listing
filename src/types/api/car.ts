import { User } from "./user";
import {
  CarCharacteristics,
  CarCharacteristicsPlain,
} from "./car-characteristics";
import { Category, CategoryPlain } from "./category";
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
export const statusValues = ["active", "inactive", "expired", "sold"];

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
    visits: number;
    slug: string;
    user?: { data: User };
    status: Status;
    car_expiration_date: Date;
    car_featured_expiration_date: Date;
    category?: { data: Category };
    car_publication_date?: Date;
    sentToSocialMedia: boolean;
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
  visits: number;
  slug: string;
  user?: { data: User };
  status: Status;
  car_expiration_date: Date;
  car_featured_expiration_date?: Date;
  category?: CategoryPlain;
  car_publication_date?: Date;
  sentToSocialMedia: boolean;
}
