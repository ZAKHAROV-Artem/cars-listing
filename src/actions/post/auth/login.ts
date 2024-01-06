import { AuthResponse } from "@/types/response";
import { LoginFields } from "@/validation/auth-validation-schema";
import axios from "axios";

export async function login({ email, password }: LoginFields) {
  return await axios.post<AuthResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
    {
      identifier: email,
      password,
    },
  );
}
