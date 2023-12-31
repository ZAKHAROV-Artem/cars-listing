"use client";

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
  PostCarStep1Fields,
  PostCarStep1ValidationSchema,
  PostCarStep2Fields,
  PostCarStep2ValidationSchema,
  PostCarStep3Fields,
  PostCarStep3ValidationSchema,
  PostCarStep4Fields,
  PostCarStep4ValidationSchema,
} from "@/validation/post-car-validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { RiseLoader } from "react-spinners";
import { fetcherAuth } from "@/lib/fetcher";
import { Car } from "@/types/api/car";
import updateCar from "@/actions/put/updateCar";
import { useQueryClient } from "@tanstack/react-query";
import { FileWithPreview } from "@/types/other";
import { Checkbox } from "@/components/ui/checkbox";
import { BsTelegram, BsWhatsapp } from "react-icons/bs";
import { FaViber } from "react-icons/fa";
import { useCounter } from "usehooks-ts";
import { useUpload } from "@/hooks/useUpload";
import { v4 } from "uuid";

type Props = {
  car: Car;
};
export default function EditCarForm({ car }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const { data: user, refetch } = useCurrentUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    getValues: getValuesStep1,
    setValue: setValueStep1,
    formState: { errors: errorsStep1, isValid: isValidStep1 },
  } = useForm<PostCarStep1Fields>({
    mode: "onBlur",
    defaultValues: {
      title: car.attributes.title,
      description: car.attributes.description,
      location: car.attributes.location,
      categoryId: String(car.attributes.category?.data?.id || ""),
    },
    resolver: zodResolver(PostCarStep1ValidationSchema),
  });
  const {
    register: registerStep2,
    handleSubmit: handleSubmitStep2,
    getValues: getValuesStep2,
    setValue: setValueStep2,
    formState: { errors: errorsStep2, isValid: isValidStep2 },
  } = useForm<PostCarStep2Fields>({
    mode: "onBlur",
    defaultValues: {
      transmission: car.attributes.car_ch?.transmission,
      year: car.attributes.car_ch?.year_made,
      fuel: car.attributes.car_ch?.fuel,
      engineSize: car.attributes.car_ch?.engine_size,
      bodyTypeId: String(car.attributes.car_ch?.body_type?.data.id),
      brandId: String(car.attributes.car_ch?.brand?.data.id),
      modelId: String(car.attributes.car_ch?.model?.data?.id || ""),
      color: car.attributes.car_ch?.color,
      mileage:
        String(car.attributes.car_ch?.mileage) === "-1"
          ? ""
          : String(car.attributes.car_ch?.mileage),
    },
    resolver: zodResolver(PostCarStep2ValidationSchema),
  });
  const {
    register: registerStep3,
    handleSubmit: handleSubmitStep3,
    getValues: getValuesStep3,
    setValue: setValueStep3,
    formState: { errors: errorsStep3, isValid: isValidStep3 },
  } = useForm<PostCarStep3Fields>({
    mode: "onBlur",
    defaultValues: {
      price: String(car.attributes.price?.price),
      priceTypeId: String(car.attributes.price?.price_type?.data.id),
      currency: car.attributes.price?.currency,
    },
    resolver: zodResolver(PostCarStep3ValidationSchema),
  });
  const {
    register: registerStep4,
    handleSubmit: handleSubmitStep4,
    getValues: getValuesStep4,
    setValue: setValueStep4,
    formState: { errors: errorsStep4, isValid: isValidStep4 },
  } = useForm<PostCarStep4Fields>({
    mode: "onBlur",
    defaultValues: {
      sellerTypeId: String(car.attributes.seller?.seller_type?.data.id),
      sellerPhone: car.attributes.seller?.phone,
      sellerName: car.attributes.seller?.name,
      telegram:
        car.attributes.seller?.social_media?.includes("telegram") || false,
      whatsapp:
        car.attributes.seller?.social_media?.includes("whatsapp") || false,
      viber: car.attributes.seller?.social_media?.includes("viber") || false,
    },

    resolver: zodResolver(PostCarStep4ValidationSchema),
  });
  const { mutateAsync: uploadAsync } = useUpload();
  const [acceptedFiles, setAcceptedFiles] = useState<FileWithPreview[]>(
    car.attributes.images.data.map((item) => ({
      ...item.attributes,
      id: item.id,
      preview: item.attributes.url,
    })) as any,
  );
  const handleFinalSubmit = async () => {
    try {
      setLoading(true);
      const imagesIds: number[] = [];

      if ("provider" in acceptedFiles[0]) {
        acceptedFiles.forEach((file: any) => {
          imagesIds.push(file.id);
        });
      } else {
        const uploadFormData = new FormData();

        uploadFormData.append("field", "images");
        uploadFormData.append(
          "path",
          `cars/${user ? `private/${user.username}` : "public"}/${v4()}`,
        );

        acceptedFiles.forEach((file, i) => {
          uploadFormData.append(`files`, file, generateFilename(i + 1));
        });
        await Promise.all(
          car.attributes.images.data.map(async (image) => {
            await fetcherAuth.delete(`/upload/files/${image?.id}`);
          }),
        );
        await uploadAsync(
          { formData: uploadFormData },
          {
            onSuccess: (res) => {
              res.data
                .sort((a, b) => {
                  const nameA = a.name;
                  const nameB = b.name;
                  return nameA.localeCompare(nameB);
                })
                .forEach((item) => {
                  imagesIds.push(item.id);
                });
            },
          },
        );
      }
      await updateCar(car.id, {
        ...getValuesStep1(),
        ...getValuesStep2(),
        ...getValuesStep3(),
        ...getValuesStep4(),
        sellerTypeId: getValuesStep4().sellerTypeId,
        imagesIds,
      });
      toast.success("Car updated successfully");
      if (user?.role.type === "admin") {
        router.back();
      } else {
        router.push(`/user/account/carlist`);
      }
      queryClient.refetchQueries({ queryKey: ["current-user-cars-infinity"] });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const { data: bodyTypes } = useBodyTypes();
  const { data: brands } = useBrands();
  const { data: categories } = useCategories();
  const { data: models } = useModels({ id: getValuesStep2().brandId });
  const { data: sellerTypes } = useSellerTypes();
  const { data: priceTypes } = usePriceTypes();
  const {
    count: step,
    setCount: setStep,
    increment: nextStep,
    decrement: prevStep,
    reset: resetStep,
  } = useCounter(1);

  return (
    <div className="my-5 space-y-2 rounded-2xl border-slate-400 sm:border sm:p-6 ">
      {loading && (
        <div className="fixed left-0 top-0 z-20 flex h-screen w-full items-center justify-center backdrop-blur-sm">
          <RiseLoader color="#ef4444" />
        </div>
      )}
      <div className="grid h-3 w-full grid-cols-5 gap-x-3 ">
        {range(1, 5, 1).map((i) => (
          <div
            className={cn("overflow-hidden rounded-md bg-primary-light/30")}
            key={i}
          >
            <div
              className={cn("h-full w-full bg-primary-light duration-200", {
                "w-0": step < i,
              })}
            />
          </div>
        ))}
      </div>
      {step === 1 && (
        <>
          <h3 className="pt-5 text-xl">Main</h3>
          <div className="grid grid-cols-1 gap-x-5 gap-y-2 xs:grid-cols-2">
            {/* TITLE */}
            <div className="h-fit">
              <Label>Title:</Label>
              <Input
                {...registerStep1("title")}
                wrapperClassName={cn({
                  "border border-primary-light": errorsStep1.title,
                })}
              />{" "}
              {errorsStep1.title && (
                <span className="ml-3 text-sm text-primary-light">
                  {errorsStep1.title?.message}
                </span>
              )}
            </div>
            {/* LOCATION */}
            <div>
              <Select
                {...registerStep1("location")}
                defaultValue={getValuesStep1().location}
                onValueChange={(value) =>
                  setValueStep1("location", value, { shouldValidate: true })
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
              {errorsStep1.location && (
                <span className="ml-3 text-sm text-primary-light">
                  {errorsStep1.location?.message}
                </span>
              )}
            </div>
            {/* DESCRIPTION */}
            <div className="h-fit">
              <Label>የመኪናው መግለጫ | Description</Label>
              <Textarea
                {...registerStep1("description")}
                className="max-h-[300px]"
                maxLength={3000}
                minLength={10}
              />{" "}
              {errorsStep1.description && (
                <span className="ml-3 text-sm text-primary-light">
                  {errorsStep1.description?.message}
                </span>
              )}
            </div>
            {/* CATEGORY */}
            <div>
              <Select
                {...registerStep1("categoryId")}
                defaultValue={getValuesStep1().categoryId}
                onValueChange={(value) =>
                  setValueStep1("categoryId", value, { shouldValidate: true })
                }
              >
                <Label>የመኪናው ሁኔታ | Category</Label>
                <SelectTrigger
                  className={cn({
                    "border border-primary-light": errorsStep1.categoryId,
                  })}
                >
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
              {errorsStep1.categoryId && (
                <span className="ml-3 text-sm text-primary-light">
                  {errorsStep1.categoryId?.message}
                </span>
              )}
            </div>
          </div>{" "}
          <Button onClick={handleSubmitStep1(nextStep)}>Next step</Button>{" "}
        </>
      )}
      {step === 2 && (
        <>
          <h3 className="pt-5 text-xl">Car characteristics</h3>
          <div className="grid grid-cols-1 gap-x-5 gap-y-2 xs:grid-cols-2">
            {/* BRAND */}
            <div>
              <Select
                {...registerStep2("brandId")}
                defaultValue={getValuesStep2().brandId}
                onValueChange={(value) =>
                  setValueStep2("brandId", value, { shouldValidate: true })
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
                {...registerStep2("modelId")}
                defaultValue={getValuesStep2().modelId}
                onValueChange={(value) =>
                  setValueStep2("modelId", value, { shouldValidate: true })
                }
                disabled={!getValuesStep2().brandId.length}
              >
                <Label>Model</Label>
                <SelectTrigger
                  className={cn({
                    "border border-primary-light dark:border-primary-light":
                      errorsStep2.modelId,
                  })}
                >
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>

                <SelectContent>
                  {models?.data.data
                    .filter(
                      (model) =>
                        String(model.attributes.brand?.data.id) ===
                        getValuesStep2().brandId,
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
              {errorsStep2.modelId && (
                <span className="ml-3 text-sm text-primary-light">
                  {errorsStep2.modelId?.message}
                </span>
              )}
            </div>
            {/* YEAR */}
            <div>
              <Select
                {...registerStep2("year")}
                defaultValue={getValuesStep2().year}
                onValueChange={(value) =>
                  setValueStep2("year", value, { shouldValidate: true })
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
                {...registerStep2("transmission")}
                defaultValue={getValuesStep2().transmission}
                onValueChange={(value) =>
                  setValueStep2("transmission", value, { shouldValidate: true })
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
                {...registerStep2("bodyTypeId")}
                defaultValue={getValuesStep2().bodyTypeId}
                onValueChange={(value) =>
                  setValueStep2("bodyTypeId", value, { shouldValidate: true })
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
                {...registerStep2("color")}
                defaultValue={getValuesStep2().color}
                onValueChange={(value) =>
                  setValueStep2("color", value, { shouldValidate: true })
                }
              >
                <Label>ቀለም | Color</Label>
                <SelectTrigger
                  className={cn({
                    "border border-primary-light dark:border-primary-light":
                      errorsStep2.color,
                  })}
                >
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
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
              {errorsStep2.color && (
                <span className="ml-3 text-sm text-primary-light">
                  {errorsStep2.color?.message}
                </span>
              )}
            </div>
            {/* FUEL */}
            <div>
              <Select
                {...registerStep2("fuel")}
                defaultValue={getValuesStep2().fuel}
                onValueChange={(value) =>
                  setValueStep2("fuel", value, { shouldValidate: true })
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
                {...registerStep2("engineSize")}
                defaultValue={getValuesStep2().engineSize}
                onValueChange={(value) =>
                  setValueStep2("engineSize", value, { shouldValidate: true })
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
              {errorsStep2.engineSize && (
                <span className="ml-3 text-sm text-primary-light">
                  {errorsStep2.engineSize?.message}
                </span>
              )}
            </div>
            {/* MILEAGE */}
            <div className="h-fit">
              <Label>Mileage:</Label>
              <Input
                {...registerStep2("mileage")}
                value={getValuesStep2().mileage}
                onChange={(e) =>
                  setValueStep2(
                    "mileage",
                    e.target.value.replace(/[,.\D]/g, ""),
                    {
                      shouldValidate: true,
                    },
                  )
                }
                min={0}
                wrapperClassName={cn({
                  "border border-primary-light": errorsStep2.mileage,
                })}
              />{" "}
              {errorsStep2.mileage && (
                <span className="ml-3 text-sm text-primary-light">
                  {errorsStep2.mileage?.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-x-3">
            <Button onClick={prevStep}>Prev step</Button>{" "}
            <Button onClick={handleSubmitStep2(nextStep)}>Next step</Button>{" "}
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <h3 className="pt-5 text-xl">Price</h3>
          <div className="grid grid-cols-1 gap-x-5 gap-y-2 xs:grid-cols-2">
            {/* PRICE TYPES */}
            <div>
              <Select
                {...registerStep3("priceTypeId")}
                defaultValue={getValuesStep3().priceTypeId}
                onValueChange={(value) => {
                  if (getValuesStep3().priceTypeId === "4")
                    setValueStep3("price", "");
                  if (value === "4") setValueStep3("price", "-1");
                  setValueStep3("priceTypeId", value, { shouldValidate: true });
                }}
              >
                <Label>Price type</Label>
                <SelectTrigger
                  className={cn({
                    "border border-primary-light dark:border-primary-light":
                      errorsStep3.priceTypeId,
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
              {errorsStep3.priceTypeId && (
                <span className="ml-3 text-sm text-primary-light">
                  {errorsStep3.priceTypeId?.message}
                </span>
              )}
            </div>
            {/* PRICE */}
            {getValuesStep3().priceTypeId !== "4" && (
              <div className="h-fit">
                <Label>ዋጋ | Price</Label>
                <Input
                  name="price"
                  value={getValuesStep3().price}
                  onChange={(e) =>
                    setValueStep3(
                      "price",
                      e.target.value.replace(/[,.\D]/g, ""),
                      {
                        shouldValidate: true,
                      },
                    )
                  }
                  wrapperClassName={cn({
                    "border border-primary-light": errorsStep3.price,
                  })}
                />
                {errorsStep3.price && (
                  <span className="ml-3 text-sm text-primary-light">
                    {errorsStep3.price?.message}
                  </span>
                )}
              </div>
            )}

            {/* CURRENCY */}
            <div>
              <Select
                {...registerStep3("currency")}
                defaultValue={getValuesStep3().currency}
                onValueChange={(value) =>
                  setValueStep3("currency", value, { shouldValidate: true })
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
              {errorsStep3.currency && (
                <span className="ml-3 text-sm text-primary-light">
                  {errorsStep3.currency?.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-x-3">
            <Button onClick={prevStep}>Prev step</Button>{" "}
            <Button onClick={handleSubmitStep3(nextStep)}>Next step</Button>{" "}
          </div>
        </>
      )}
      {step === 4 && (
        <>
          <h3 className="pt-5 text-xl">Informaiton about seller</h3>
          <div className="grid grid-cols-1 gap-x-5 xs:grid-cols-2">
            {!(
              user &&
              (user?.seller_type?.slug === "dealership" ||
                user?.seller_type?.slug === "broker")
            ) && (
              <>
                {/* SELLER TYPE */}
                <div>
                  <Select
                    {...registerStep4("sellerTypeId")}
                    defaultValue={getValuesStep4().sellerTypeId}
                    onValueChange={(value) =>
                      setValueStep4("sellerTypeId", value, {
                        shouldValidate: true,
                      })
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
                    {...registerStep4("sellerName")}
                    wrapperClassName={cn({
                      "border border-primary-light": errorsStep4.sellerName,
                    })}
                  />
                  {errorsStep4.sellerName && (
                    <span className="ml-3 text-sm text-primary-light">
                      {errorsStep4.sellerName?.message}
                    </span>
                  )}
                </div>
              </>
            )}

            {/* SELLER PHONE */}
            <div className="h-fit ">
              <Label>Phone:</Label>
              <Input
                {...registerStep4("sellerPhone")}
                disabled={
                  user?.role.type !== "admin" &&
                  user &&
                  (user?.seller_type?.slug === "dealership" ||
                    user?.seller_type?.slug === "broker")
                }
                defaultValue={getValuesStep4().sellerPhone}
                wrapperClassName={cn({
                  "border border-primary-light": errorsStep4.sellerPhone,
                })}
              />
              {errorsStep4.sellerPhone && (
                <span className="ml-3 text-sm text-primary-light">
                  {errorsStep4.sellerPhone?.message}
                </span>
              )}
            </div>
            <div className="mt-5 flex flex-wrap gap-5 xs:col-span-2 ">
              <div className="flex items-center gap-x-3">
                <Checkbox
                  {...registerStep4("telegram")}
                  defaultChecked={getValuesStep4().telegram}
                  onCheckedChange={(value) =>
                    setValueStep4(
                      "telegram",
                      value === "indeterminate" ? false : value,
                    )
                  }
                  id="telegram"
                  className="h-6 w-6 rounded-md "
                />
                <label
                  htmlFor="telegram"
                  className="flex select-none items-center gap-x-3 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <BsTelegram size={30} className="text-blue-400" /> Telegram
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <Checkbox
                  {...registerStep4("whatsapp")}
                  defaultChecked={getValuesStep4().whatsapp}
                  onCheckedChange={(value) =>
                    setValueStep4(
                      "whatsapp",
                      value === "indeterminate" ? false : value,
                    )
                  }
                  id="whatsapp"
                  className="h-6 w-6 rounded-md"
                />
                <label
                  htmlFor="whatsapp"
                  className="flex select-none items-center gap-x-3 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <BsWhatsapp size={30} className="text-green-400" /> Whatsapp
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <Checkbox
                  {...registerStep4("viber")}
                  defaultChecked={getValuesStep4().viber}
                  onCheckedChange={(value) =>
                    setValueStep4(
                      "viber",
                      value === "indeterminate" ? false : value,
                    )
                  }
                  id="viber"
                  className="h-6 w-6 rounded-md "
                />
                <label
                  htmlFor="viber"
                  className="flex select-none items-center gap-x-3 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <FaViber size={30} className="text-purple-400" /> Viber
                </label>
              </div>
            </div>
          </div>{" "}
          <div className="flex gap-x-3">
            <Button onClick={prevStep}>Prev step</Button>{" "}
            <Button onClick={handleSubmitStep4(nextStep)}>Next step</Button>{" "}
          </div>
        </>
      )}
      {step === 5 && (
        <>
          <h3 className="pt-5 text-xl">Images</h3>
          <CarPostFormFileUpload
            files={acceptedFiles}
            setFiles={setAcceptedFiles}
          />
          <div className="flex gap-x-3">
            <Button onClick={prevStep}>Prev step</Button>{" "}
            <Button onClick={handleFinalSubmit}>Edit car</Button>{" "}
          </div>
        </>
      )}
    </div>
  );
}
