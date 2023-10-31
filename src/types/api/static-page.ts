export interface StaticPage {
  id: number;
  attributes: {
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    title: string;
    html: string;
    slug: string;
    css: any;
    js: string;
  };
}
export interface StaticPagePlain {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  title: string;
  html: string;
  slug: string;
  css: any;
  js: string;
}
