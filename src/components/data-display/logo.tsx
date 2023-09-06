"use client";
import { useTheme } from "@/hooks/useThemeMode";
import Image from "next/image";
import Link from "next/link";

type Props = {
  mode?: "dark" | "light";
};
export default function Logo({ mode }: Props) {
  const theme = useTheme((state) => state.mode);
  return (
    <Link href="/">
      <Image
        src={`/logo-${
          !mode ? (theme === "dark" ? "light" : "dark") : mode
        }.png`}
        width={230}
        height={40}
        className="w-[160px] xs:w-[200px] sm:w-[230px]"
        alt="Logo"
      />
    </Link>
  );
}
