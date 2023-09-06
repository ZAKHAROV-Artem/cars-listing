import { Brand } from "./brand";

export interface Model {
  id: number;
  attributes: {
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    name: string;
    slug: string;
    brand?: { data: Brand };
  };
}
export interface ModelPlain {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  name: string;
  slug: string;
}
