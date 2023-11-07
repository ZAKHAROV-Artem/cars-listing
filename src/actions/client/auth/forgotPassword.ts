import { fetcher } from "@/lib/api-client";
import { ForgotPasswordFields } from "@/validation/auth-validation-schema";

export async function forgotPassword(data: ForgotPasswordFields) {
  return await fetcher.post(`/auth/forgot-password`, data);
}
