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
              Find used and new cars for sale in Ethiopia. Compare prices with hundreds of cars available!. www.mekina.net does not take commission from sellers to sell their cars on the platform. 
            </SheetDescription>
            <div className="flex items-center justify-between">
              <SocialMediaList />
              <ThemeSwitchButton />
            </div>
          </SheetHeader>
          <Separator className="my-2" />
          <MenuAccordion closeDrawer={()=>setIsOpen(false)}/>
        </SheetContent>
      </Sheet>
    </div>
  );
}
