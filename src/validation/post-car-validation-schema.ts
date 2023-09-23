import { z } from "zod";
export const PostCarValidationSchema = z.object({
  title: z.string().nonempty("Title is required"),
  location: z.string().nonempty("Location is required"),
  description: z
    .string()
    .max(3000, { message: "Must be 1000 or fewer characters long" }),
  categoryId: z.string().nonempty("Category is required"),
  brandId: z.string().nonempty("Model is required"),
  modelId: z.string().nonempty("Model is required"),
  bodyTypeId: z.string().nonempty("Body type is required"),
  transmission: z.string().nonempty("Transmission is required"),
  year: z.string().nonempty("Year is required"),
  fuel: z.string().nonempty("Fuel is required"),
  engineSize: z.string().nonempty("Engine size is required"),
  price: z.string(),
  color: z.string().nonempty("Color is required"),
  mileage: z.string(),
  priceTypeId: z.string().nonempty("Price type is required"),
  currency: z.string().nonempty("Currency type is required"),
  sellerTypeId: z.string().nonempty("Seller type is required"),
  sellerName: z.string().nonempty("Seller name is required"),
  sellerPhone: z.string(),
  userId: z.string().optional(),
});
export type PostCarFields = z.infer<typeof PostCarValidationSchema>;
