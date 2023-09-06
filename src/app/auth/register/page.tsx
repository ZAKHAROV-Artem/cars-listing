"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  RegisterFields,
  RegisterValidationSchema,
} from "@/validation/auth-validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRegisterMutation } from "@/hooks/useRegisterMutation";
import { useAuth } from "@/state/AuthState";
import { StrapiError } from "@/types/response";
import { LOGIN_ROUTE } from "@/data/navigation-data";
import FacebookButton from "@/components/ui/facebook-button";
import GoolgeButton from "@/components/ui/google-button";
import { Separator } from "@radix-ui/react-separator";
import { useQueryClient } from "@tanstack/react-query";
import useSellerTypes from "@/hooks/useSellerTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RegisterPage() {
  const queryClient = useQueryClient();
  const setToken = useAuth((state) => state.setToken);
  const { data: sellerTypes } = useSellerTypes();
  const { mutateAsync } = useRegisterMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<RegisterFields>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
      sellerTypeId: "2",
    },
    resolver: zodResolver(RegisterValidationSchema),
  });
  const onSubmit: SubmitHandler<RegisterFields> = async (data) => {
    
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
          <h1 className="text-center text-xl">Create account</h1>
        </div>
        <div>
          <Label>Email</Label>
          <Input {...register("email")} />
          <span className="ml-5 text-sm text-primary-light">
            {errors.email?.message}
          </span>
        </div>
        <div>
          <Label>Name</Label>
          <Input {...register("name")} />
          <span className="ml-5 text-sm text-primary-light">
            {errors.name?.message}
          </span>
        </div>
        <div>
          <Label>Phone</Label>
          <Input {...register("phone")} />
          <span className="ml-5 text-sm text-primary-light">
            {errors.phone?.message}
          </span>
        </div>
        {/* SELLER TYPE */}
        <div>
          <Select
            {...register("sellerTypeId")}
            defaultValue={getValues().sellerTypeId}
            onValueChange={(value) =>
              setValue("sellerTypeId", value, { shouldValidate: true })
            }
          >
            <Label>Seller type:</Label>
            <SelectTrigger>
              <SelectValue placeholder="Select seller type" />
            </SelectTrigger>
            <SelectContent>
              {sellerTypes?.data.data.map((sellerType) => (
                <SelectItem
                  value={String(sellerType.id)}
                  key={sellerType.attributes.slug}
                >
                  {sellerType.attributes.type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" {...register("password")} />
          <span className="ml-5 text-sm text-primary-light">
            {errors.password?.message}
          </span>
        </div>
        <Button type="submit" disabled={!isValid}>
          Create
        </Button>
        <Separator />
        <GoolgeButton />
        <FacebookButton />
        <div className="mt-3 text-sm">
          Already have an account ?{" "}
          <Link href={LOGIN_ROUTE} className="text-blue-400 underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
