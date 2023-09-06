import { z } from "zod";

export const LoginValidationSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
    .nonempty("Email is required"),
  password: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" })
    .max(20, { message: "Must be 20 or fewer characters long" })
    .nonempty("Password is required"),
});
export type LoginFields = z.infer<typeof LoginValidationSchema>;

export const RegisterValidationSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
    .nonempty("Email is required"),
  name: z.string().nonempty("Name is required"),
  phone: z.string().nonempty("Phone is required"),
  sellerTypeId: z.string().nonempty("Seller type is required"),
  password: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" })
    .max(20, { message: "Must be 20 or fewer characters long" })
    .nonempty("Password is required"),
});
export type RegisterFields = z.infer<typeof RegisterValidationSchema>;
