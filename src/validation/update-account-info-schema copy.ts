import { z } from "zod";

export const UpdateAccountValidationSchema = z.object({
  name: z.string().nonempty("Name is required"),
  phone: z.string().startsWith("+", "Phone should start with +"),
  location: z.string().nonempty("Location is required"),
  description: z.string(),
  email: z
    .string()
    .email({ message: "Invalid email" })
    .nonempty("Email is required"),
});
export type UpdateAccountFields = z.infer<typeof UpdateAccountValidationSchema>;
