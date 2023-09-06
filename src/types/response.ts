import { AxiosError } from "axios";
import { User } from "./collections";

export interface AuthResponse {
  jwt: string;
  user: User;
}
export interface StrapiError_Plain {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: Record<string, unknown>;
  };
}
export type StrapiError = AxiosError<StrapiError_Plain>;
