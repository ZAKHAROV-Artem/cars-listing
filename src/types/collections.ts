import { CarPlain, Location } from "./api/car";
import { MediaPlain } from "./api/media";
import { SellerType } from "./api/seller";

export interface User {
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
  seller_type?: SellerType;
  location?: Location;
  description?: string;
  dateOfBirth?: string;
  image?: MediaPlain;
  cars?: CarPlain[];
  points: number;
}
