import { Car, CarPlain } from "./car";

export interface Category {
  id: number;
  attributes: {
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    name: string;
    slug: string;
    cars: { data: Car[] };
  };
}
export interface CategoryPlain {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  name: string;
  slug: string;
  cars: CarPlain[];
}
