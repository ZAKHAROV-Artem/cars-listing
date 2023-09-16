"use client";
import { getCurrentUser } from "@/actions/client/auth/getCurrentUser";
import AccountImageFileUpload from "@/components/ui/account-image-file-upload";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useCurrentUser from "@/hooks/useCurrentUser";
import Cookies from "js-cookie";
import {
  UpdateAccountFields,
  UpdateAccountValidationSchema,
} from "@/validation/update-account-info-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { locations } from "@/data/filters-data";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { FileWithPath } from "react-dropzone";
import { toast } from "react-hot-toast";
import { fetcherAuth } from "@/lib/api-client";

export default function AccountInfoPage() {
  const { data: user, isLoading, refetch } = useCurrentUser();
  const [acceptedFiles, setAcceptedFiles] = useState<FileWithPath[]>([]);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<UpdateAccountFields>({
    mode: "onBlur",
    defaultValues: async () => {
      const { data: user } = await getCurrentUser();
      return {
        name: user?.name || user?.username || "",
        email: user?.email || "",
        phone: user?.phone || "",
        description: user.description || "",
        location: user?.location || "",
        dateOfBirth: dayjs(user?.dateOfBirth || new Date()).format(
          "YYYY-MM-DD",
        ),
      };
    },
    resolver: zodResolver(UpdateAccountValidationSchema),
  });
  const onSubmit: SubmitHandler<UpdateAccountFields> = async (data) => {
    await fetcherAuth.put(`/user/me`, data);
    if (acceptedFiles.length) {
      const imageFormData = new FormData();
      acceptedFiles.forEach((file, i) => {
        imageFormData.append("files", file, `profile-image-${user?.id}`);
      });
      imageFormData.append("ref", "plugin::users-permissions.user");
      imageFormData.append("refId", `${user?.id}`);
      imageFormData.append("field", "image");
      imageFormData.append("path", `users/${user?.id}`);
      if (user?.image) {
        await fetcherAuth.delete(`/upload/files/${user?.image?.id}`);
      }
      await fetcherAuth.post(`/upload`, imageFormData);
    }

    toast.success("Account updated successfully !");
    await refetch();
  };
  return (
    <div className="grid grid-cols-[1fr_2fr] gap-x-5">
      <AccountImageFileUpload
        setAcceptedFiles={setAcceptedFiles}
        currentImgUrl={user?.image?.url || ""}
      />
      <div className="space-y-3">
        <div>
          <Label>Name</Label>
          <Input {...register("name")} />
        </div>
        <div>
          <Label>Email</Label>
          <Input {...register("email")} />
        </div>
        <div>
          <Label>Phone</Label>
          <Input {...register("phone")} />
        </div>
        <div className="flex flex-col gap-y-1">
          <Label>Date of birth</Label>
          <DatePicker
            value={dayjs(getValues().dateOfBirth).toDate()}
            onValueChange={(date) =>
              date &&
              setValue("dateOfBirth", dayjs(date).format("YYYY-MM-DD"), {
                shouldValidate: true,
              })
            }
          />
        </div>
        {!isLoading && (
          <div>
            <Select
              {...register("location")}
              defaultValue={user?.location}
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
        )}
        <div>
          <Label>Description</Label>
          <Textarea {...register("description")} />
        </div>
      </div>
      <Button
        onClick={handleSubmit(onSubmit)}
        className="col-span-2 mt-5 w-fit justify-self-center"
      >
        Update account
      </Button>
    </div>
  );
}
