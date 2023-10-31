export interface SellerType {
  id: number;
  attributes: {
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    type: string;
    slug: string;
  };
}
export interface SellerTypePlain {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  type: string;
  slug: string;
}
export interface Seller {
  name: string;
  phone?: string;
  seller_type?: { data: SellerType };
  social_media?: string[];
}
