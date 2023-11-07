import { fetcherAuth } from "@/lib/api-client";
import { User } from "@/types/api/user";
import { ChangePasswordFields } from "@/validation/auth-validation-schema";

export async function changePassword(data: ChangePasswordFields) {
  return await fetcherAuth.post<User>(`/auth/change-password`, data);
}
