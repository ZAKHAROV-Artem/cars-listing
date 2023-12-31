export enum Currency {
  Etb = "ETB",
  Usd = "USD",
  Eur = "EUR",
}

export interface PricePackage {
  name: string;
  currency: Currency;
  price: string;
  includes: string[];
  href: string;
  points:number;
}
export interface PricePackagePlain {
  name: string;
  currency: Currency;
  price: string;
  includes: string[];
  href: string;
  points:number;
}
