import { BodyType } from "./body-type";
import { Brand, BrandPlain } from "./brand";
import { Model, ModelPlain } from "./model";

export enum Fuel {
  Diesel = "Diesel",
  Gazoline = "Gazoline",
  Benzine = "Benzine",
  Hybrid = "Hybrid",
  Electric = "Electric",
  GazolineBenzine = "Gazoline/Benzine",
  GzaolineDiesel = "Gzaoline/Diesel",
}
export enum Transmission {
  Automatic = "Automatic",
  Manual = "Manual",
  AutomatedManual = "Automated Manual",
  ContinuouslyVariable = "Continuously Variable",
}
export enum Color {
  Red = "Red",
  Blue = "Blue",
  Green = "Green",
  Black = "Black",
  White = "White",
  Silver = "Silver",
  Gray = "Gray",
  Yellow = "Yellow",
  Orange = "Orange",
  Purple = "Purple",
  Multi = "Multi",
  Another = "Another",
}

export interface CarCharacteristics {
  year_made: string;
  fuel: Fuel;
  transmission: Transmission;
  brand?: { data: Brand };
  model?: { data: Model };
  engine_size: string;
  body_type?: { data: BodyType };
  color: Color;
  mileage: number;
}
export interface CarCharacteristicsPlain {
  year_made: string;
  fuel: Fuel;
  transmission: Transmission;
  brand?: BrandPlain;
  model?: ModelPlain;
  engine_size: string;
  body_type?: BodyType;
  color: Color;
  mileage: number;
}
