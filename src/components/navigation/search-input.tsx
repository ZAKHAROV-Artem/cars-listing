"use client";

import useKeyPress from "@/hooks/useKeyPress";
import { Input } from "../ui/input";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdCloseCircle } from "react-icons/io";

type Props = {
  className?: string;
  wrapperClassName?: string;
  setIsSearchShown: (valuse: boolean) => void;
};
export default function SearchInput({
  className,
  wrapperClassName,
  setIsSearchShown,
}: Props) {
  const [value, setValue] = useState<string>("");
  const router = useRouter();
  const handleSearch = () => {
    if (value !== "") router.push(`/cars/search?q=${value}`);
  };
  useKeyPress("Enter", handleSearch);
  return (
    <Input
      placeholder="Search cars"
      icon={<BsSearch className="text-paper-dark dark:text-paper-light" />}
      className={className}
      wrapperClassName={wrapperClassName}
      value={value}
      type="search"
      onChange={(e) => setValue(e.target.value)}
      rightButton={
        <div>
          <IoMdCloseCircle
            className="text-paper-dark dark:text-paper-light"
            size={25}
            onClick={() => setIsSearchShown(false)}
          />
        </div>
      }
    />
  );
}
