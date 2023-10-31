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
  PostCarStep1Fields,
  PostCarStep1ValidationSchema,
  PostCarStep2Fields,
  PostCarStep2ValidationSchema,
  PostCarStep3Fields,
  PostCarStep3ValidationSchema,
  PostCarStep4Fields,
  PostCarStep4ValidationSchema,
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
import { FileWithPreview } from "@/types/other";
import { Checkbox } from "@/components/ui/checkbox";
import { BsTelegram, BsWhatsapp } from "react-icons/bs";
import { FaViber } from "react-icons/fa";
import { useCounter } from "usehooks-ts";

export default function PostCarForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const { data: user, refetch } = useCurrentUser();
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
      title: "",
      description: "",
      location: "Addis Ababa",
      categoryId: "1",
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
      transmission: "Manual",
      year: "2020",
      fuel: "Benzine",
      engineSize: "1,3",
      bodyTypeId: "1",
      brandId: "1",
      modelId: "",
      color: "",
      mileage: "",
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
      price: "",
      priceTypeId: "1",
      currency: "ETB",
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
      sellerTypeId: "1",
      sellerPhone: "",
      telegram: false,
      whatsapp: false,
      viber: false,
      sellerName: "",
    },

    resolver: zodResolver(PostCarStep4ValidationSchema),
  });
  useEffect(() => {
    if (
      user &&
      (Number(user?.points) || 0) < 1 &&
      user?.seller_type?.slug !== "private"
    ) {
      router.push("/payment");
    }
    if (
      user?.seller_type?.slug === "dealership" ||
      user?.seller_type?.slug === "broker"
    )
      setValueStep4("sellerPhone", user.phone);
    if (user) setValueStep4("sellerName", user.name || user.username);

    if (
      !((Number(user?.points) || 0) < 1) &&
      user?.pointsExpirationDate &&
      dayjs() > dayjs(user.pointsExpirationDate)
    ) {
      fetcherAuth
        .put(`/user/me`, {
          points: 0,
        })
        .then(() => {
          refetch();
        });

      toast.error("Points have expired !");
      if (user?.seller_type?.slug !== "private") {
        router.push("/payment");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const [acceptedFiles, setAcceptedFiles] = useState<FileWithPreview[]>([]);
  console.log(acceptedFiles);
  const handleFinalSubmit = async () => {
    try {
      if (!acceptedFiles.length) {
        toast.error("Upload at least one image !");
        return;
      }

      setLoading(true);

      const res = await postCar({
        ...getValuesStep1(),
        ...getValuesStep2(),
        ...getValuesStep3(),
        ...getValuesStep4(),
        sellerTypeId: user
          ? String(user?.seller_type?.id)
          : getValuesStep4().sellerTypeId,
        userId: String(user?.id || ""),
      });
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
          `files`,
          file,
          generateFilename(res.data.data.id, i + 1),
        );
      });
      await fetcher
        .post(`/upload`, uploadFormData, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_UPLOAD_API_TOKEN}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          toast.success("Car submitted successfully");
          router.push(`/order/${res.data.data.id}`);
        });
      if (user) {
        await fetcherAuth.put(`/user/me`, {
          points: Number(user.points) - 1,
        });
        await refetch();
      }
    } catch (error) {
      console.log(error);
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
            className={cn(
              "overflow-hidden rounded-md bg-primary-light/30",
            )}
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
                onValueChange={(value) =>
                  setValueStep2("modelId", value, { shouldValidate: true })
                }
                disabled={!getValuesStep2().brandId.length}
              >
                <Label>Models</Label>
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
                name="mileage"
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
                onValueChange={(value) => {
                  if (value === "4") setValueStep3("price", "-1");
                  else setValueStep3("price", "");
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
            {!user && (
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
                  onCheckedChange={(value) =>
                    setValueStep4(
                      "telegram",
                      value === "indeterminate" ? false : value,
                    )
                  }
                  {...registerStep4("telegram")}
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
                  onCheckedChange={(value) =>
                    setValueStep4(
                      "whatsapp",
                      value === "indeterminate" ? false : value,
                    )
                  }
                  {...registerStep4("whatsapp")}
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
                  onCheckedChange={(value) =>
                    setValueStep4(
                      "viber",
                      value === "indeterminate" ? false : value,
                    )
                  }
                  {...registerStep4("viber")}
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
            <Button onClick={handleFinalSubmit}>Post car</Button>{" "}
          </div>
        </>
      )}
    </div>
  );
}
