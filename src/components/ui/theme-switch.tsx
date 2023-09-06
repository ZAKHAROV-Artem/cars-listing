"use client";
import { HiOutlineLightBulb } from "react-icons/hi";
import { Switch } from "../ui/switch";
import { useTheme } from "@/hooks/useThemeMode";
export default function ThemeSwitch() {
  const { toDark, toLight, mode } = useTheme();

  return (
    <div className="flex w-full cursor-pointer items-center justify-between rounded-lg p-2 transition duration-150 ease-in-out hover:bg-accent-light focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-accent-dark">
      <div className="flex w-full items-center">
        <div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
          <HiOutlineLightBulb size={25} />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium ">{"Dark theme"}</p>
        </div>
      </div>
      <Switch
        checked={mode === "dark"}
        onCheckedChange={(value) => {
          value ? toDark() : toLight();
        }}
      />
    </div>
  );
}
