"use client";

import { cn } from "@/lib/utils";
import { Seller } from "@/types/api/seller";
import Link from "next/link";
import { AiOutlinePhone } from "react-icons/ai";

type Props = {
  seller: Seller | undefined;
};
export default function SellerInfoFooter({ seller }: Props) {
  return (
    <div
      className={cn(
        `fixed bottom-0 left-0 z-50 w-full rounded-t-xl bg-primary-main/70 p-2 duration-200 md:hidden`,
      )}
    >
      <div className="flex items-center gap-x-5">
        <AiOutlinePhone size={40} className="text-dark-main" />
        <div className="text-dark-main">
          <div className="text-md md:text-xl">
            <Link href={`tel:$ {seller?.phone}`}>{seller?.phone}</Link>
          </div>
          <div className="text-xl md:text-3xl ">{seller?.name}</div>
        </div>
      </div>
    </div>
  );
}
