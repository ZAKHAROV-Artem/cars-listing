"use client";

import { useTheme } from "@/hooks/useThemeMode";
import Image from "next/image";

export default function CarsNotFound() {
  const theme = useTheme();
  return (
    <div className="flex w-full flex-col items-center">
      <div className="text-xl">Cars not found</div>

      <Image
        src={`/imgs/status/not-found-${
          theme.mode === "dark" ? "dark" : "light"
        }.png`}
        alt="Not found"
        width={100}
        height={100}
      />
    </div>
  );
}
