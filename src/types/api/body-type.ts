import { Media } from "./media";

export interface BodyType {
  id: number;
  attributes: {
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    type: string;
    slug: string;
    image: { data: Media };
  };
}
export interface BodyTypePlain {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  type: string;
  slug: string;
  image: { data: Media };
}
