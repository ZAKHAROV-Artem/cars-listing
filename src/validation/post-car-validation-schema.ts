import { z } from "zod";
export const PostCarValidationSchema = z.object({
  title: z.string().nonempty("Title is required"),
  location: z.string().nonempty("Location is required"),
  description: z
    .string()
    .max(3000, { message: "Must be 1000 or fewer characters long" }),
  categoryId: z.string().nonempty("Category is required"),
  brandId: z.string().nonempty("Model is required"),
  modelId: z.string(),
  bodyTypeId: z.string().nonempty("Body type is required"),
  transmission: z.string().nonempty("Transmission is required"),
  year: z.string().nonempty("Year is required"),
  fuel: z.string().nonempty("Fuel is required"),
  engineSize: z.string().nonempty("Engine size is required"),
  color: z.string().nonempty("Color is required"),
  mileage: z.string(),
  price: z.string().nonempty("Price is required"),
  priceTypeId: z.string().nonempty("Price type is required"),
  currency: z.string().nonempty("Currency type is required"),
  sellerTypeId: z.string().nonempty("Seller type is required"),
  sellerName: z.string().nonempty("Seller name is required"),
  sellerPhone: z
    .string()
    .startsWith("+", "Phone should start with +")
    .nonempty("Seller phone is required"),
  telegram: z.boolean(),
  whatsapp: z.boolean(),
  viber: z.boolean(),
  userId: z.string().optional(),
});
export type PostCarFields = z.infer<typeof PostCarValidationSchema>;

export const PostCarStep1ValidationSchema = z.object({
  title: z.string().nonempty("Title is required"),
  location: z.string().nonempty("Location is required"),
  description: z
    .string()
    .max(3000, { message: "Must be 1000 or fewer characters long" }),
  categoryId: z.string().nonempty("Category is required"),
});
export type PostCarStep1Fields = z.infer<typeof PostCarStep1ValidationSchema>;

export const PostCarStep2ValidationSchema = z.object({
  brandId: z.string().nonempty("Model is required"),
  modelId: z.string(),
  bodyTypeId: z.string().nonempty("Body type is required"),
  transmission: z.string().nonempty("Transmission is required"),
  year: z.string().nonempty("Year is required"),
  fuel: z.string().nonempty("Fuel is required"),
  engineSize: z.string().nonempty("Engine size is required"),
  color: z.string().nonempty("Color is required"),
  mileage: z.string(),
});
export type PostCarStep2Fields = z.infer<typeof PostCarStep2ValidationSchema>;

export const PostCarStep3ValidationSchema = z.object({
  price: z.string().nonempty("Price is required"),
  priceTypeId: z.string().nonempty("Price type is required"),
  currency: z.string().nonempty("Currency type is required"),
});
export type PostCarStep3Fields = z.infer<typeof PostCarStep3ValidationSchema>;
export const PostCarStep4ValidationSchema = z.object({
  sellerTypeId: z.string().nonempty("Seller type is required"),
  sellerName: z.string().nonempty("Seller name is required"),
  sellerPhone: z
    .string()
    .startsWith("+", "Phone should start with +")
    .nonempty("Seller phone is required"),
  telegram: z.boolean(),
  whatsapp: z.boolean(),
  viber: z.boolean(),
  userId: z.string().optional(),
});
export type PostCarStep4Fields = z.infer<typeof PostCarStep4ValidationSchema>;
