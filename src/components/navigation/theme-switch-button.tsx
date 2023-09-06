"use client";
import { useTheme } from "@/hooks/useThemeMode";
import { PiSunThin } from "react-icons/pi";
import { BsMoon } from "react-icons/bs";

export default function ThemeSwitchButton() {
  const { toDark, toLight, mode } = useTheme();
  return (
    <div
      onClick={() => {
        mode === "dark" ? toLight() : toDark();
      }}
      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800"
    >
      {mode === "dark" ? <BsMoon size={25} /> : <PiSunThin size={25} />}
    </div>
  );
}
