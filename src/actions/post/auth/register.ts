import { RegisterFields } from "@/validation/auth-validation-schema";
import axios from "axios";
import { AuthResponse } from "@/types/response";
import { v4 as uuidv4 } from "uuid";
import { UserAuthType } from "@/types/api/user";

export async function register(values: RegisterFields) {
  const data = {
    username: uuidv4(),
    email: values.email,
    name: values.name,
    phone: values.phone,
    seller_type: {
      connect: [values.sellerTypeId],
    },
    auth_type: UserAuthType.CREDENTIALS,
    password: values.password,
    points: 0,
  };
  return await axios.post<AuthResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`,
    data,
  );
}
