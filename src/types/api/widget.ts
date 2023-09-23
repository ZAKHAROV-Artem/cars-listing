export interface Widget {
  id: number;
  attributes: {
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    name: string;
    html: string;
    slug?: string;
  };
}
export interface WidgetPlain {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  name: string;
  html: string;
  slug?: string;
}
