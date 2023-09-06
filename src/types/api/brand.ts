import { Media } from "./media";
import { Model } from "./model";

export interface Brand {
  id: number;
  attributes: {
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    name: string;
    slug: string;
    image: { data: Media };
    models: { data: Model[] };
  };
}
export interface BrandPlain {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  name: string;
  slug: string;
}
