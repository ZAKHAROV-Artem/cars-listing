import { fetcherAuth } from "@/lib/fetcher";
import { UserPlain } from "@/types/api/user";
import { ChangePasswordFields } from "@/validation/auth-validation-schema";

export async function changePassword(data: ChangePasswordFields) {
  return await fetcherAuth.post<UserPlain>(`/auth/change-password`, data);
}
