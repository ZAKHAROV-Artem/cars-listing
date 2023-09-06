export enum Currency {
  Eur = "EUR",
  Usd = "USD",
  Etb = "ETB",
}

export interface PriceType {
  id: number;
  attributes: {
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    type: string;
    slug: string;
  };
}

export interface Price {
  price_type?: { data: PriceType };
  currency: Currency;
  price: number;
}
export interface PricePlain {
  price_type?: {
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    type: string;
    slug: string;
  };
  currency: Currency;
  price: number;
}
