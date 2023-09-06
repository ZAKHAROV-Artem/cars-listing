"use client";

import { useDirection } from "@/hooks/useDirection";
import { cn } from "@/lib/utils";
import { Seller } from "@/types/api/seller";
import { AiOutlinePhone } from "react-icons/ai";

type Props = {
  seller: Seller | undefined;
};
export default function SellerInfoFooter({ seller }: Props) {
  const direction = useDirection();
  return (
    <div
      className={cn(
        `fixed left-0 z-50 w-full rounded-t-3xl bg-primary-main/70 p-4 duration-200 md:hidden`,
        {
          "bottom-0": direction === "down",
          "-bottom-[100px]": direction === "up",
        },
      )}
    >
      <div className="flex items-center gap-x-5">
        <AiOutlinePhone size={40} className="text-dark-main" />
        <div className="text-dark-main">
          <div className="text-xl md:text-3xl ">{seller?.name}</div>
          <div className="text-md md:text-xl">{seller?.phone}</div>
        </div>
      </div>
    </div>
  );
}
