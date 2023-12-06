import { AxiosError } from "axios";
import { UserPlain } from "./api/user";

export interface AuthResponse {
  jwt: string;
  user: UserPlain;
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
