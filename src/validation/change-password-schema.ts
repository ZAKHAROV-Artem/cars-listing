import { z } from "zod";

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(5, { message: "Must be 5 or more characters long" })
      .max(20, { message: "Must be 20 or fewer characters long" })
      .nonempty("Password is required"),
    password: z
      .string()
      .min(5, { message: "Must be 5 or more characters long" })
      .max(20, { message: "Must be 20 or fewer characters long" })
      .nonempty("Password is required"),
    passwordConfirmation: z
      .string()
      .min(5, { message: "Must be 5 or more characters long" })
      .max(20, { message: "Must be 20 or fewer characters long" })
      .nonempty("Password is required"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  });
export type ChangePasswordFields = z.infer<typeof ChangePasswordSchema>;
