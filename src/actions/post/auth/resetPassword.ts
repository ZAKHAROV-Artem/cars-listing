import { fetcher } from "@/lib/fetcher";
import { ResetPasswordFields } from "@/validation/auth-validation-schema";

export async function resetPassword(data: ResetPasswordFields) {
  return await fetcher.post(`/auth/reset-password`, data);
}
