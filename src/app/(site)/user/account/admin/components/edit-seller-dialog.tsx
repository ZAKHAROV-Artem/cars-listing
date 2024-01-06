"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditSellerDialog } from "@/state/EditSellerDialogState";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import usePaymentPage from "@/hooks/usePaymentPage";
import { PricePackage } from "@/types/api/price-package";
import { useState } from "react";
import { Separator } from "../../../../../../components/ui/separator";
import { cn } from "@/lib/utils";
import useUpdateSellerPoints from "@/hooks/useUpdateSellerPoints";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateAccountFields,
  UpdateAccountValidationSchema,
} from "@/validation/update-account-info-schema copy";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { locations } from "@/data/filters-data";
import { useUpdateEffect } from "usehooks-ts";
import { fetcherAuth } from "@/lib/fetcher";
export default function EditSellerDialog() {
  const dialog = useEditSellerDialog();
  const { data: packages } = usePaymentPage();

  const [selectedPackage, setSelectedPackage] = useState<PricePackage | null>(
    null,
  );
  const { mutateAsync } = useUpdateSellerPoints();
  const handleOpenChange = (open: boolean) => {
    setSelectedPackage(null);
    dialog.setShow(open);
  };
  const handlePopup = async () => {
    if (!selectedPackage) return;
    await mutateAsync(
      {
        sellerId: dialog.seller!.id,
        points: (Number(dialog?.seller?.points) || 0) + selectedPackage?.points,
      },
      {
        onSuccess: (res) => {
          dialog.refetch();
          toast.success("Successfully updated !");
          dialog.setFalse();
        },
      },
    );
  };

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<UpdateAccountFields>({
    mode: "onBlur",

    resolver: zodResolver(UpdateAccountValidationSchema),
  });
  const onSubmit: SubmitHandler<UpdateAccountFields> = async (data) => {
    await fetcherAuth.put(`/users/${dialog.seller?.id}`, data).then(() => {
      dialog.refetch();
      toast.success("Successfully updated !");
      dialog.setFalse();
    });
  };
  useUpdateEffect(() => {
    if (dialog.seller) {
      setValue("name", dialog.seller.name);
      setValue("email", dialog.seller.email);
      setValue("phone", dialog.seller.phone);
      setValue("description", dialog.seller?.description || "");
    }
  }, [dialog.seller]);
  return (
    <Dialog open={dialog.show} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit seller</DialogTitle>
          <DialogDescription>
            {"Make changes to seller here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="info" className="w-full space-y-5">
          <TabsList className="grid w-full grid-cols-2 overflow-x-auto">
            <TabsTrigger value="info">Account</TabsTrigger>
            <TabsTrigger value="balance">Balance</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
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

            <div>
              <Select
                {...register("location")}
                defaultValue={dialog.seller?.location}
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
            <div>
              <Label>Description</Label>
              <Textarea {...register("description")} />
            </div>
            <Button
              className="mt-4"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Save changes
            </Button>
          </TabsContent>
          <TabsContent value="balance">
            <div className="flex justify-between">
              <div>Account balance :</div>
              <div>{dialog.seller?.points} cars</div>
            </div>
            <div>
              <div>Select package</div>
              <div className="mt-3 flex flex-wrap gap-3">
                {packages?.data.data.attributes.packages.map((pricePackage) => (
                  <div
                    key={pricePackage.name}
                    onClick={() => setSelectedPackage(pricePackage)}
                    className={cn(
                      "cursor-pointer rounded-full bg-paper-light px-5 py-2 text-sm text-light-main duration-200 hover:bg-primary-light hover:text-white dark:bg-accent-dark dark:text-dark-main dark:hover:bg-primary-light dark:hover:text-white sm:text-md",
                      {
                        "bg-primary-light dark:bg-primary-light":
                          pricePackage.name === selectedPackage?.name,
                      },
                    )}
                  >
                    {pricePackage.name}
                  </div>
                ))}
              </div>
            </div>
            {selectedPackage && (
              <div className="mt-5">
                <div>{selectedPackage.name} package details</div>
                <div>
                  {selectedPackage?.includes.map((item) => (
                    <>
                      <div className="my-2" key={item}>
                        {item}
                      </div>
                      <Separator />
                    </>
                  ))}
                </div>
              </div>
            )}
            <Button className="mt-4" type="submit" onClick={handlePopup}>
              Save changes
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
