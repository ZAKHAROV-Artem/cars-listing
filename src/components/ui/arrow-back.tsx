"use client";
import { BsArrowLeft } from "react-icons/bs";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
type Props = {
  className?: string;
};
export default function ArrowBack({ className }: Props) {
  const router = useRouter();
  return (
    <BsArrowLeft
      size={35}
      onClick={() => router.back()}
      className={cn(
        "cursor-pointer duration-200 hover:-translate-x-1",
        className,
      )}
    />
  );
}
