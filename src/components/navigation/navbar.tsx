"use client";
import Menu from "./menu";
import { BsSearch } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";

import MenuPopover from "./menu-popover";
import Drawer from "./drawer";
import Logo from "../data-display/logo";
import { useState } from "react";
import SearchInput from "./search-input";
import Link from "next/link";

export default function Navbar() {
  const [isSearchShown, setIsSearchShown] = useState<boolean>(false);
  return (
    <div className="fixed left-0 top-0 z-50 h-20 w-full bg-primary-main">
      <div className="container flex h-full items-center justify-between text-white">
        <Drawer />
        <Logo mode="light" />
        {isSearchShown ? (
          <SearchInput
            setIsSearchShown={setIsSearchShown}
            wrapperClassName="hidden w-full h-fit max-w-[500px] lg:flex"
          />
        ) : (
          <Menu />
        )}
        <div className="flex items-center gap-x-4">
          <div
            onClick={() => setIsSearchShown(!isSearchShown)}
            className="group  hidden  h-10 w-10 cursor-pointer items-center justify-center rounded-full duration-200 hover:bg-default-light dark:hover:bg-default-dark lg:flex"
          >
            <BsSearch
              size={23}
              className="group-hover:text-light-main dark:group-hover:text-dark-main"
            />
          </div>
          <MenuPopover />
          <Link
            href="/cars/post"
            className="group hidden h-10 cursor-pointer items-center justify-center gap-x-3 rounded-full px-2 duration-200 hover:bg-default-light dark:hover:bg-default-dark lg:flex"
          >
            <AiOutlinePlusCircle
              size={25}
              className="group-hover:text-light-main dark:group-hover:text-dark-main"
            />
            <div className="group-hover:text-light-main dark:group-hover:text-dark-main">
              Post car
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
