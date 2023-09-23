import { PricePackage, PricePackagePlain } from "./price-package";

export interface PaymentPage {
  id: number;
  attributes: {
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    packages: PricePackage[];
  };
}
export interface PaymentPagePlain {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  packages: PricePackagePlain[];
}
