"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AiOutlineMenu } from "react-icons/ai";
import SocialMediaList from "./social-media-list";
import ThemeSwitchButton from "./theme-switch-button";
import { Separator } from "../ui/separator";
import MenuAccordion from "./menu-accordion";
import Logo from "../data-display/logo";
import { useState } from "react";
import Link from "next/link";

export default function Drawer() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="block lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <AiOutlineMenu size={28} className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <Logo />
            </SheetTitle>
            <SheetDescription>
              Buy, sell or rent cars in Ethiopia.
            </SheetDescription>
            <div className="flex items-center justify-between">
              <SocialMediaList />
              <ThemeSwitchButton />
            </div>
          </SheetHeader>
          <Separator className="my-2" />
          <Link
            href="/cars/post"
            className="group hidden h-10 cursor-pointer items-center justify-center gap-x-3 rounded-full px-2 duration-200 hover:bg-default-light dark:hover:bg-default-dark lg:flex"
          >
          <MenuAccordion closeDrawer={()=>setIsOpen(false)}/>
        </SheetContent>
      </Sheet>
    </div>
  );
}
