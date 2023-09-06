import { RegisterFields } from "@/validation/auth-validation-schema";
import axios from "axios";
import { AuthResponse } from "@/types/response";
import { v4 as uuidv4 } from "uuid";

export async function register(values: RegisterFields) {
  const data = {
    email: values.email,
    name: values.name,
    phone: values.phone,
    seller_type: {
      connect: [values.sellerTypeId],
    },
    password: values.password,
  };
  return await axios.post<AuthResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`,
    { ...data, username: uuidv4() },
  );
}
