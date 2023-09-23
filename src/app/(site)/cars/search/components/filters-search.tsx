"use client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useFilters } from "@/state/FiltersState";
import { BsSearch, BsChevronDown } from "react-icons/bs";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function FiltersSearch() {
  const [value, setValue] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleSearch = () => {
    setIsOpen(false);
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (!value) current.delete("q");
    else current.set("q", value.trim());

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(query);
  };
  const { setIsOpen, isOpen } = useFilters((state) => ({
    setIsOpen: state.setIsOpen,
    isOpen: state.isOpen,
  }));
  return (
    <div className="mt-8 flex gap-x-3">
      <Input
        icon={<BsSearch className=" text-paper-dark dark:text-paper-light" />}
        className="w-[200px] xs:w-[360px] sm:w-[500px]"
        placeholder="Type your keywords"
        wrapperClassName="rounded-3xl shadow-xl  h-fit"
        value={value}
        type="search"
        onKeyDown={(e) => {
          e.key === "Enter" && handleSearch();
        }}
        onChange={(e) => setValue(e.target.value)}
      />
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center justify-center rounded-full bg-slate-50 p-2 shadow-xl dark:bg-slate-800"
      >
        <BsChevronDown
          size={18}
          className={cn("duration-300", {
            "rotate-180": isOpen,
          })}
        />
      </div>
    </div>
  );
}
