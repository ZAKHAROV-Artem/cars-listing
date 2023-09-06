"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/hooks/useLoginMutation";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  LoginFields,
  LoginValidationSchema,
} from "@/validation/auth-validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useAuth } from "@/state/AuthState";
import { StrapiError } from "@/types/response";
import { REGISTER_ROUTE } from "@/data/navigation-data";
import { Separator } from "@/components/ui/separator";
import GoolgeButton from "@/components/ui/google-button";
import FacebookButton from "@/components/ui/facebook-button";
import { useQueryClient } from "@tanstack/react-query";

export default function LoginPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setToken = useAuth((state) => state.setToken);
  const { mutateAsync } = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFields>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: zodResolver(LoginValidationSchema),
  });
  const onSubmit: SubmitHandler<LoginFields> = async (data) => {
    await mutateAsync(data)
      .then((res) => {
        setToken(res.data.jwt);
        queryClient.invalidateQueries(["current-user"]);
        toast.success("Logined successfully !");
        router.push("/");
      })
      .catch((err: StrapiError) => {
        toast.error(
          err.response?.data.error.message || "Something went wrong :(",
        );
      });
  };

  return (
    <div className="container flex items-center justify-center py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[500px] space-y-2 rounded-2xl border border-slate-400 p-6 "
      >
        <div>
          <h1 className="text-center text-xl">Login</h1>
        </div>
        <div>
          <Label>Email</Label>
          <Input {...register("email")} />
          <span className="ml-5 text-sm text-primary-light">
            {errors.email?.message}
          </span>
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" {...register("password")} />
          <span className="ml-5 text-sm text-primary-light">
            {errors.password?.message}
          </span>
        </div>
        <Button type="submit" disabled={!isValid}>
          Login
        </Button>
        <Separator />
        <GoolgeButton />
        {/* <FacebookButton /> */}
        <div className="mt-3 text-sm">
          {"Don't have an account yet ? "}
          <Link href={REGISTER_ROUTE} className="text-blue-400 underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
