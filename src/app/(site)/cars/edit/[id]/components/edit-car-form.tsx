"use client";

import postCar from "@/actions/client/postCar";
import { Button } from "@/components/ui/button";
import CarPostFormFileUpload from "@/components/ui/post-car-file-input/car-post-form-file-upload";
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
import { cn, generateFilename, range } from "@/lib/utils";
import {
  PostCarFields,
  PostCarValidationSchema,
} from "@/validation/post-car-validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FileWithPath } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { RiseLoader } from "react-spinners";
import dayjs from "dayjs";
import { fetcher, fetcherAuth } from "@/lib/api-client";
import { Car } from "@/types/api/car";
import updateCar from "@/actions/client/updateCar";
import { useQueryClient } from "@tanstack/react-query";
import { FileWithPreview } from "@/types/other";

type Props = {
  car: Car;
};
export default function EditCarForm({ car }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const { data: user, refetch } = useCurrentUser();
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<PostCarFields>({
    mode: "onBlur",
    defaultValues: {
      title: car.attributes.title,
      description: car.attributes.description,
      location: car.attributes.location,
      categoryId: String(car.attributes.category?.data.id),
      transmission: car.attributes.car_ch?.transmission,
      year: car.attributes.car_ch?.year_made,
      fuel: car.attributes.car_ch?.fuel,
      engineSize: car.attributes.car_ch?.engine_size,
      bodyTypeId: String(car.attributes.car_ch?.body_type?.data.id),
      brandId: String(car.attributes.car_ch?.brand?.data.id),
      modelId: String(car.attributes.car_ch?.model?.data.id),
      color: car.attributes.car_ch?.color,
      mileage:
        String(car.attributes.car_ch?.mileage) === "-1"
          ? ""
          : String(car.attributes.car_ch?.mileage),
      price: String(car.attributes.price?.price),
      priceTypeId: String(car.attributes.price?.price_type?.data.id),
      currency: car.attributes.price?.currency,
      sellerTypeId: String(car.attributes.seller?.seller_type?.data.id),
      sellerPhone: car.attributes.seller?.phone,
      sellerName: car.attributes.seller?.name,
    },

    resolver: zodResolver(PostCarValidationSchema),
  });

  const [acceptedFiles, setAcceptedFiles] = useState<FileWithPreview[]>([]);

  const onSubmit: SubmitHandler<PostCarFields> = async (data) => {
    try {
      setLoading(true);

      const res = await updateCar(car.id, {
        ...data,
        sellerTypeId: user ? String(user?.seller_type?.id) : data.sellerTypeId,
        userId: String(user?.id) || "",
      });
      const uploadFormData = new FormData();
      if (acceptedFiles.length) {
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
        await Promise.all(
          car.attributes.images.data.map(async (image) => {
            await fetcherAuth.delete(`/upload/files/${image?.id}`);
          }),
        );

        await fetcher.post(`/upload`, uploadFormData, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_UPLOAD_API_TOKEN}`,
          },
        });
      }
      toast.success("Car updated successfully. Info will be shown soon");
      router.push(`/user/account/carlist`);
      queryClient.refetchQueries({ queryKey: ["current-user-cars-infinity"] });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const { data: bodyTypes } = useBodyTypes();
  const { data: brands } = useBrands();
  const { data: categories } = useCategories();
  const { data: models } = useModels({ id: getValues().brandId });
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
            defaultValue={getValues().location}
            onValueChange={(value) =>
              setValue("location", value, { shouldValidate: true })
            }
          >
            <Label>ከተማ | Location</Label>
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
            defaultValue={getValues().description}
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
            {...register("categoryId")}
            defaultValue={getValues().categoryId}
            onValueChange={(value) =>
              setValue("categoryId", value, { shouldValidate: true })
            }
          >
            <Label>የመኪናው ሁኔታ | Category</Label>
            <SelectTrigger className="">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories?.data.data.map((category) => (
                <SelectItem
                  value={String(category.id)}
                  key={category.attributes.slug}
                >
                  {category.attributes.name}
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
            defaultValue={getValues().modelId}
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
            value={getValues().color}
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
              <SelectItem value={"all"} disabled>
                All colors
              </SelectItem>
              {colors?.map(({ value, hex }) => (
                <SelectItem value={value} key={value}>
                  <div className="flex items-center gap-x-3">
                    {hex && (
                      <div
                        className="h-4 w-4 rounded-full border"
                        style={{ background: hex }}
                      />
                    )}
                    <div>{value}</div>
                  </div>
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
        {/* PRICE TYPES */}
        <div>
          <Select
            {...register("priceTypeId")}
            defaultValue={getValues().priceTypeId}
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
        {/* PRICE */}
        {getValues().priceTypeId !== "5" && (
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
        )}

        {/* CURRENCY */}
        <div>
          <Select
            {...register("currency")}
            defaultValue={getValues().currency}
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
        {!user && (
          <>
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
            {/* SELLER NAME */}
            <div className="h-fit">
              <Label>Name:</Label>
              <Input
                {...register("sellerName")}
                defaultValue={getValues().sellerName}
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
            disabled={
              user?.seller_type?.slug === "dealership" ||
              user?.seller_type?.slug === "broker"
            }
            defaultValue={getValues().sellerPhone}
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
      <CarPostFormFileUpload
        files={acceptedFiles}
        setFiles={setAcceptedFiles}
      />
      {!acceptedFiles.length && (
        <>
          {car.attributes.images.data.map((image) => (
            <div key={image.id}>{image.attributes.name}</div>
          ))}{" "}
        </>
      )}
      <Button onClick={handleSubmit(onSubmit)}>Save Car</Button>{" "}
    </div>
  );
}
