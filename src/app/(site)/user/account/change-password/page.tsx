"use client";

import { ChangePasswordFields } from "@/validation/change-password-schema";
import { ChangePasswordSchema } from "./../../../../../validation/change-password-schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { changePassword } from "@/actions/client/auth/changePassword";
import { useRouter } from "next/navigation";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function AccountChangePasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFields>({
    mode: "onBlur",
    defaultValues: {
      currentPassword: "",
      password: "",
      passwordConfirmation: "",
    },
    resolver: zodResolver(ChangePasswordSchema),
  });
  const { refetch } = useCurrentUser();
  const router = useRouter();
  const onSubmit: SubmitHandler<ChangePasswordFields> = async (data) => {
    await changePassword(data)
      .then(() => {
        toast.success("Account updated successfully !");
        router.back();
      })
      .catch(() => {
        toast.error("Invalid credentials !");
      });
    await refetch();
  };
  return (
    <div className="space-y-3">
      <div>
        <Label>Current password</Label>
        <Input {...register("currentPassword")} type="password" />
        {errors.currentPassword && (
          <span className="ml-3 text-sm text-primary-light">
            {errors.currentPassword?.message}
          </span>
        )}
      </div>
      <div className="grid gap-x-3 sm:grid-cols-2">
        <div>
          <Label>New password</Label>
          <Input {...register("password")} type="password" />
          {errors.password && (
            <span className="ml-3 text-sm text-primary-light">
              {errors.password?.message}
            </span>
          )}
        </div>
        <div>
          <Label>Confirm new password</Label>
          <Input {...register("passwordConfirmation")} type="password" />
          {errors.passwordConfirmation && (
            <span className="ml-3 text-sm text-primary-light">
              {errors.passwordConfirmation?.message}
            </span>
          )}
        </div>
      </div>
      <Button onClick={handleSubmit(onSubmit)} className="mt-5 w-fit">
        Change password
      </Button>
    </div>
  );
}
