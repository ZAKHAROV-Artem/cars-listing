import { CarPlain, Location } from "./car";
import { MediaPlain } from "./media";
import { SellerTypePlain } from "./seller";

export enum UserAuthType {
  PROVIDER = "provider",
  CREDENTIALS = "credentials",
}
export interface User {
  id: number;
  attributes: {
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    phone: string;
    seller_type?: SellerTypePlain;
    location?: Location;
    description?: string;
    dateOfBirth?: string;
    image?: MediaPlain;
    points: number;
    pointsExpirationDate?: Date;
    auth_type: UserAuthType;
    role: UserRole;
  };
}
export interface UserPlain {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  phone: string;
  seller_type?: SellerTypePlain;
  location?: Location;
  description?: string;
  dateOfBirth?: string;
  image?: MediaPlain;
  points: number;
  pointsExpirationDate?: Date;
  auth_type: UserAuthType;
  role: UserRole;
}
export interface UserRole {
  id: number;
  createdAt: Date;
  name: string;
  type: string;
  description: string;
}
