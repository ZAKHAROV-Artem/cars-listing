"use client";

import { Button } from "@/components/ui/button";
import CarPostFormFileUpload from "@/components/ui/car-post-form-file-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  colors,
  engineSizes,
  fuels,
  locations,
  currencies,
  transmissions,
} from "@/data/filters-data";
import useBodyTypes from "@/hooks/useBodyTypes";
import useBrands from "@/hooks/useBrands";
import useCategories from "@/hooks/useCategories";
import useCurrentUser from "@/hooks/useCurrentUser";
import useModels from "@/hooks/useModels";
import usePriceTypes from "@/hooks/usePriceTypes";
import useSellerTypes from "@/hooks/useSellerTypes";
import { cn, generateFilename, range, slugify } from "@/lib/utils";
import { Car } from "@/types/api/car";
import { Payload } from "@/types/api/common";
import {
  PostCarAuthFields,
  PostCarAuthValidationSchema,
} from "@/validation/post-car-validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FileWithPath } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { RiseLoader } from "react-spinners";
export default function PostCarForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const { data: user } = useCurrentUser();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<PostCarAuthFields>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      location: "Addis Ababa",
      category: "used-in-ethiopia",
      transmission: "Manual",
      year: "2020",
      fuel: "Benzine",
      engineSize: "1,3",
      bodyTypeId: "3",
      brandId: "1",
      modelId: "",
      color: "",
      mileage: "",
      price: "",
      priceTypeId: "",
      currency: "ETB",
      sellerTypeId: "2",
      sellerPhone: "",
      sellerName: "",
    },

    resolver: zodResolver(PostCarAuthValidationSchema),
  });
  const [acceptedFiles, setAcceptedFiles] = useState<FileWithPath[]>([]);
  const onSubmit: SubmitHandler<PostCarAuthFields> = async (data) => {
    if (!acceptedFiles.length) {
      toast.error("Upload at least one image !");
      return;
    }
    setLoading(true);
    const res = await axios.post<Payload<Car>>(
      `${process.env.NEXT_PUBLIC_API_URL}/cars`,
      {
        data: {
          status: "inactive",
          car_expiration_date: dayjs().add(30, "day").toDate(),
          car_featured_expiration_date: null,
          title: data.title,
          location: data.location,
          description: data.description,
          slug: slugify(data.title),
          car_ch: {
            year_made: data.year,
            engine_size: data.engineSize,
            fuel: data.fuel,
            transmission: data.transmission,
            mileage: data.mileage,
            brand: {
              connect: [data.brandId],
            },
            model: {
              connect: [data.modelId],
            },
            body_type: {
              connect: [data.bodyTypeId],
            },
            color: data.color,
          },
          price: {
            price: data.price,
            price_type: {
              connect: [data.priceTypeId],
            },
            currency: data.currency,
          },
          seller: {
            name: user ? user.name || user.username : data.sellerName,
            phone: data.sellerPhone,
            seller_type: {
              connect: [data.sellerTypeId],
            },
          },
        },
      },
    );
    const uploadFormData = new FormData();
    uploadFormData.append("ref", "api::car.car");
    uploadFormData.append("refId", `${res.data.data.id}`);
    uploadFormData.append("field", "images");
    uploadFormData.append(
      "path",
      `cars/${user ? `private/${user.username}` : "public"}/${
        res.data.data.id
      }`,
    );

    acceptedFiles.forEach((file, i) => {
      uploadFormData.append(
        "files",
        file,
        generateFilename(res.data.data.id, i + 1),
      );
    });
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/upload`, uploadFormData)
      .then(() => {
        toast.success("Car submitted successfully");
        router.push(`/order/${res.data.data.id}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const { data: bodyTypes } = useBodyTypes();
  const { data: brands } = useBrands();
  const { data: categories } = useCategories();
  const { data: models } = useModels();
  const { data: sellerTypes } = useSellerTypes();
  const { data: priceTypes } = usePriceTypes();
  return (
    <div className="my-5 space-y-2 rounded-2xl border-slate-400 sm:border sm:p-6 ">
      {loading && (
        <div className="fixed left-0 top-0 z-10 flex h-screen w-full items-center justify-center backdrop-blur-sm">
          <RiseLoader color="#ef4444" />
        </div>
      )}
      <h3 className="pt-5 text-xl">Main</h3>
      <div className="grid grid-cols-1 gap-x-5 gap-y-2 xs:grid-cols-2">
        {/* TITLE */}
        <div className="h-fit">
          <Label>Title:</Label>
          <Input
            {...register("title")}
            wrapperClassName={cn({
              "border border-primary-light": errors.title,
            })}
          />{" "}
          {errors.title && (
            <span className="ml-3 text-sm text-primary-light">
              {errors.title?.message}
            </span>
          )}
        </div>
        {/* LOCATION */}
        <div>
          <Select
            {...register("location")}
            defaultValue="Addis Ababa"
            onValueChange={(value) =>
              setValue("location", value, { shouldValidate: true })
            }
          >
            <Label>የሲሊንደር መጠን | Location</Label>
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>

            <SelectContent>
              {locations.map((location) => (
                <SelectItem value={location} key={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.location && (
            <span className="ml-3 text-sm text-primary-light">
              {errors.location?.message}
            </span>
          )}
        </div>
        {/* DESCRIPTION */}
        <div className="h-fit">
          <Label>የመኪናው መግለጫ | Description</Label>
          <Textarea
            {...register("description")}
            className="max-h-[300px]"
            maxLength={3000}
            minLength={10}
          />{" "}
          {errors.description && (
            <span className="ml-3 text-sm text-primary-light">
              {errors.description?.message}
            </span>
          )}
        </div>
        {/* CATEGORY */}
        <div>
          <Select
            {...register("category")}
            defaultValue="used-in-ethiopia"
            onValueChange={(value) =>
              setValue("category", value, { shouldValidate: true })
            }
          >
            <Label>የመኪናው ሁኔታ | Category</Label>
            <SelectTrigger className="">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories?.data.data.map((brand) => (
                <SelectItem
                  value={brand.attributes.slug}
                  key={brand.attributes.slug}
                >
                  {brand.attributes.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <h3 className="pt-5 text-xl">Car characteristics</h3>
      <div className="grid grid-cols-1 gap-x-5 gap-y-2 xs:grid-cols-2">
        {/* BRAND */}
        <div>
          <Select
            {...register("brandId")}
            defaultValue={getValues().brandId}
            onValueChange={(value) =>
              setValue("brandId", value, { shouldValidate: true })
            }
          >
            <Label>ስሪት | Brand</Label>
            <SelectTrigger className="">
              <SelectValue placeholder="Select brand type" />
            </SelectTrigger>
            <SelectContent>
              {brands?.data.data.map((brand) => (
                <SelectItem
                  value={String(brand.id)}
                  key={brand.attributes.slug}
                >
                  {brand.attributes.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* MODEL */}
        <div>
          <Select
            {...register("modelId")}
            onValueChange={(value) =>
              setValue("modelId", value, { shouldValidate: true })
            }
            disabled={!getValues().brandId.length}
          >
            <Label>Models</Label>
            <SelectTrigger
              className={cn({
                "border border-primary-light dark:border-primary-light":
                  errors.modelId,
              })}
            >
              <SelectValue placeholder="Select model" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value={"all"} className="mt-3">
                All models
              </SelectItem>
              {models?.data.data
                .filter(
                  (model) =>
                    String(model.attributes.brand?.data.id) ===
                    getValues().brandId,
                )
                .map((model) => (
                  <SelectItem
                    value={String(model.id)}
                    key={model.attributes.slug}
                  >
                    {model.attributes.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          {errors.modelId && (
            <span className="ml-3 text-sm text-primary-light">
              {errors.modelId?.message}
            </span>
          )}
        </div>
        {/* YEAR */}
        <div>
          <Select
            {...register("year")}
            defaultValue={getValues().year}
            onValueChange={(value) =>
              setValue("year", value, { shouldValidate: true })
            }
          >
            <Label>ዓ.ም | Year</Label>
            <SelectTrigger>
              <SelectValue placeholder="Select year made" />
            </SelectTrigger>

            <SelectContent>
              {range(
                new Date().getFullYear() - 100,
                new Date().getFullYear(),
                1,
              )
                .reverse()
                .map((year) => (
                  <SelectItem value={String(year)} key={year}>
                    {year}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        {/* TRANSMISSION */}
        <div>
          <Select
            {...register("transmission")}
            defaultValue={getValues().transmission}
            onValueChange={(value) =>
              setValue("transmission", value, { shouldValidate: true })
            }
          >
            <Label>Transmission:</Label>
            <SelectTrigger>
              <SelectValue placeholder="Select transmisison" />
            </SelectTrigger>
            <SelectContent>
              {transmissions.map((item) => (
                <SelectItem value={item} key={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* BODY TYPES */}
        <div>
          <Select
            {...register("bodyTypeId")}
            defaultValue={getValues().bodyTypeId}
            onValueChange={(value) =>
              setValue("bodyTypeId", value, { shouldValidate: true })
            }
          >
            <Label>Body type:</Label>
            <SelectTrigger>
              <SelectValue placeholder="Select body type" />
            </SelectTrigger>
            <SelectContent>
              {bodyTypes?.data.data.map((bodyType) => (
                <SelectItem
                  value={String(bodyType.id)}
                  key={bodyType.attributes.slug}
                >
                  {bodyType.attributes.type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* COLOR */}
        <div>
          <Select
            {...register("color")}
            onValueChange={(value) =>
              setValue("color", value, { shouldValidate: true })
            }
          >
            <Label>ቀለም | Color</Label>
            <SelectTrigger
              className={cn({
                "border border-primary-light dark:border-primary-light":
                  errors.color,
              })}
            >
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"all"}>All colors</SelectItem>
              {colors?.map((color) => (
                <SelectItem value={color} key={color}>
                  {color}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.color && (
            <span className="ml-3 text-sm text-primary-light">
              {errors.color?.message}
            </span>
          )}
        </div>
        {/* FUEL */}
        <div>
          <Select
            {...register("fuel")}
            defaultValue={getValues().fuel}
            onValueChange={(value) =>
              setValue("fuel", value, { shouldValidate: true })
            }
          >
            <Label>ነዳጅ | Fuel</Label>
            <SelectTrigger>
              <SelectValue placeholder="Select fuel" />
            </SelectTrigger>

            <SelectContent>
              {fuels.map((fuel) => (
                <SelectItem value={fuel} key={fuel}>
                  {fuel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* ENGINE SIZE */}
        <div>
          <Select
            {...register("engineSize")}
            defaultValue={getValues().engineSize}
            onValueChange={(value) =>
              setValue("engineSize", value, { shouldValidate: true })
            }
          >
            <Label>የሲሊንደር መጠን | Engine size</Label>
            <SelectTrigger>
              <SelectValue placeholder="Select engine size" />
            </SelectTrigger>

            <SelectContent>
              {engineSizes.map((size) => (
                <SelectItem value={size} key={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.engineSize && (
            <span className="ml-3 text-sm text-primary-light">
              {errors.engineSize?.message}
            </span>
          )}
        </div>
        {/* MILEAGE */}
        <div className="h-fit">
          <Label>Mileage:</Label>
          <Input
            name="mileage"
            value={getValues().mileage}
            onChange={(e) =>
              setValue("mileage", e.target.value.replace(/[,.\D]/g, ""), {
                shouldValidate: true,
              })
            }
            min={0}
            wrapperClassName={cn({
              "border border-primary-light": errors.mileage,
            })}
          />{" "}
          {errors.mileage && (
            <span className="ml-3 text-sm text-primary-light">
              {errors.mileage?.message}
            </span>
          )}
        </div>
      </div>
      <h3 className="pt-5 text-xl">Price</h3>
      <div className="grid grid-cols-1 gap-x-5 gap-y-2 xs:grid-cols-2">
        {/* PRICE */}
        <div className="h-fit">
          <Label>ዋጋ | Price</Label>
          <Input
            name="price"
            value={getValues().price}
            onChange={(e) =>
              setValue("price", e.target.value.replace(/[,.\D]/g, ""), {
                shouldValidate: true,
              })
            }
            wrapperClassName={cn({
              "border border-primary-light": errors.price,
            })}
          />
          {errors.price && (
            <span className="ml-3 text-sm text-primary-light">
              {errors.price?.message}
            </span>
          )}
        </div>
        {/* PRICE TYPES */}
        <div>
          <Select
            {...register("priceTypeId")}
            onValueChange={(value) =>
              setValue("priceTypeId", value, { shouldValidate: true })
            }
          >
            <Label>Price type</Label>
            <SelectTrigger
              className={cn({
                "border border-primary-light dark:border-primary-light":
                  errors.priceTypeId,
              })}
            >
              <SelectValue placeholder="Select price type" />
            </SelectTrigger>
            <SelectContent>
              {priceTypes?.data.data.map((priceType) => (
                <SelectItem
                  value={String(priceType.id)}
                  key={priceType.attributes.slug}
                >
                  {priceType.attributes.type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.priceTypeId && (
            <span className="ml-3 text-sm text-primary-light">
              {errors.priceTypeId?.message}
            </span>
          )}
        </div>
        {/* CURRENCY */}
        <div>
          <Select
            {...register("currency")}
            defaultValue="ETB"
            onValueChange={(value) =>
              setValue("currency", value, { shouldValidate: true })
            }
          >
            <Label>Currency</Label>
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>

            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem value={currency} key={currency}>
                  {currency}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.currency && (
            <span className="ml-3 text-sm text-primary-light">
              {errors.currency?.message}
            </span>
          )}
        </div>
      </div>
      <h3 className="pt-5 text-xl">Informaiton about seller</h3>
      <div className="grid grid-cols-1 gap-x-5 xs:grid-cols-2">
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
        {!user && (
          <>
            {/* SELLER NAME */}
            <div className="h-fit">
              <Label>Name:</Label>
              <Input
                {...register("sellerName")}
                wrapperClassName={cn({
                  "border border-primary-light": errors.sellerName,
                })}
              />
              {errors.sellerName && (
                <span className="ml-3 text-sm text-primary-light">
                  {errors.sellerName?.message}
                </span>
              )}
            </div>
          </>
        )}
        {/* SELLER PHONE */}
        <div className="h-fit">
          <Label>Phone:</Label>
          <Input
            {...register("sellerPhone")}
            wrapperClassName={cn({
              "border border-primary-light": errors.sellerPhone,
            })}
          />
          {errors.sellerPhone && (
            <span className="ml-3 text-sm text-primary-light">
              {errors.sellerPhone?.message}
            </span>
          )}
        </div>
      </div>
      <h3 className="pt-5 text-xl">Images</h3>
      <CarPostFormFileUpload setAcceptedFiles={setAcceptedFiles} />
      <Button onClick={handleSubmit(onSubmit)}>Post Car</Button>{" "}
    </div>
  );
}
