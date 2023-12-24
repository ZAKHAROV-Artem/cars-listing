import { bodyTypes, brands, categories, models, transmissions } from "./data";

type Record = {
  url: string;
  lastModified: Date;
  changeFrequency: string;
  priority: number;
};
export class Generator {
  generateCategories() {
    let res: Record[] = [];
    categories.forEach((category) => {
      res.push({
        url: `https://www.mekina.net/cars/search?category=${category.attributes.slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      });
    });
    return res;
  }

  generateTransmissions() {
    let res: Record[] = [];
    transmissions.forEach((transmission) => {
      res.push({
        url: `https://www.mekina.net/cars/search?transmission=${transmission}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      });
    });
    return res;
  }

  generateBodyTypes() {
    let res: Record[] = [];
    bodyTypes.forEach((type) => {
      res.push({
        url: `https://www.mekina.net/cars/search?bodyType=${type.attributes.slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      });
    });
    return res;
  }

  generateModels() {
    let res: Record[] = [];
    models.forEach((model) => {
      res.push({
        url: `https://www.mekina.net/cars/search?model=${model.attributes.slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      });
    });
    return res;
  }
  generateBrands() {
    let res: Record[] = [];
    brands.forEach((brand) => {
      res.push({
        url: `https://www.mekina.net/cars/search?brand=${brand.attributes.slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      });
    });
    return res;
  }

  main() {
    const brands = this.generateBrands();
    const models = this.generateModels();
    const bodyTypes = this.generateBodyTypes();
    const categories = this.generateCategories();
    const transmission = this.generateTransmissions();
    return [...brands, ...models, ...bodyTypes, ...categories, ...transmission];
  }
}

export const generator = new Generator();
