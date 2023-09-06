import { CarPlain, Location } from "./api/car";
import { MediaPlain } from "./api/media";

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
  seller_type?: string;
  location?: Location;
  description?: string;
  dateOfBirth?: string;
  image?: MediaPlain;
  cars?: CarPlain[];
}
