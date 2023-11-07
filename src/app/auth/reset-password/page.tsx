"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LOGIN_ROUTE } from "@/data/navigation-data";
import { useForgotPasswordMutation } from "@/hooks/useForgotPasswordMutation";
import { useResetPasswordMutation } from "@/hooks/useResetPasswordMutation";
import {
  ForgotPasswordFields,
  ForgotPasswordValidationSchema,
  ResetPasswordFields,
  ResetPasswordValidationSchema,
} from "@/validation/auth-validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RiseLoader } from "react-spinners";
import { useToggle } from "usehooks-ts";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const {
    register: registerForgotPassword,
    handleSubmit: handleSubmitForgotPassword,
    formState: { errors: errorsForgotPassword, isValid: isValidForgotPassword },
  } = useForm<ForgotPasswordFields>({
    mode: "onBlur",
    defaultValues: {
      email: "",
    },

    resolver: zodResolver(ForgotPasswordValidationSchema),
  });
  const {
    register: registerResetPassword,
    handleSubmit: handleSubmitResetPassword,
    formState: { errors: errorsResetPassword, isValid: isValidResetPassword },
  } = useForm<ResetPasswordFields>({
    mode: "onBlur",
    defaultValues: {
      code: searchParams.get("code") || "",
      password: "",
      passwordConfirmation: "",
    },

    resolver: zodResolver(ResetPasswordValidationSchema),
  });
  const router = useRouter();
  const [isLoading, toggle, setIsLoading] = useToggle();
  const { mutateAsync: forgotPasswordAsync } = useForgotPasswordMutation();
  const { mutateAsync: resetPasswordAsync } = useResetPasswordMutation();
  const onSubmitForgotPassword: SubmitHandler<ForgotPasswordFields> = async (
    data,
  ) => {
    toggle();
    await forgotPasswordAsync(data, {
      onSuccess: () => {
        toast.success("Reset code sent successfully !");
      },
      onError: () => {
        toast.error("Something went wrong !");
      },
      onSettled: toggle,
    });
  };
  const onSubmitCreatePassword: SubmitHandler<ResetPasswordFields> = async (
    data,
  ) => {
    toggle();
    await resetPasswordAsync(data, {
      onSuccess: () => {
        toast.success("Password updated successfully !");
        router.push(LOGIN_ROUTE);
      },
      onError: () => {
        toast.error("Something went wrong !");
      },
      onSettled: toggle,
    });
  };

  return (
    <div className="container flex items-center justify-center py-10">
      {isLoading && (
        <div className="fixed left-0 top-0 z-20 flex h-screen w-full items-center justify-center backdrop-blur-sm">
          <RiseLoader color="#ef4444" />
        </div>
      )}
      <form className="w-[500px] space-y-2 rounded-2xl border border-slate-400 p-6 ">
        {searchParams.has("code") ? (
          <>
            <div>
              <h1 className="text-center text-xl">Create new password</h1>
            </div>
            <div>
              <Label htmlFor="password">New password</Label>
              <Input
                type="password"
                id="password"
                autoComplete="off"
                {...registerResetPassword("password")}
              />
              <span className="ml-5 text-sm text-primary-light">
                {errorsResetPassword.password?.message}
              </span>
            </div>
            <div>
              <Label htmlFor="passwordConfirmation">
                New password confirmation
              </Label>
              <Input
                autoComplete="off"
                type="password"
                id="passwordConfirmation"
                {...registerResetPassword("passwordConfirmation")}
              />
              <span className="ml-5 text-sm text-primary-light">
                {errorsResetPassword.passwordConfirmation?.message}
              </span>
            </div>

            <Button
              onClick={handleSubmitResetPassword(onSubmitCreatePassword)}
              disabled={!isValidResetPassword}
            >
              Set new password
            </Button>
          </>
        ) : (
          <>
            {" "}
            <div>
              <h1 className="text-center text-xl">Reset password</h1>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...registerForgotPassword("email")} />
              <span className="ml-5 text-sm text-primary-light">
                {errorsForgotPassword.email?.message}
              </span>
            </div>
            <Button
              onClick={handleSubmitForgotPassword(onSubmitForgotPassword)}
              disabled={!isValidForgotPassword}
            >
              Send reset code
            </Button>
          </>
        )}
      </form>
    </div>
  );
}
