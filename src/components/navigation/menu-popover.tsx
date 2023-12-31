"use client";
import { AiOutlineUser } from "react-icons/ai";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import Link from "next/link";
import ThemeSwitch from "../ui/theme-switch";
import {
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  menuPopoverItemsMain,
} from "@/data/navigation-data";
import MenuPopoverItem from "./menu-popover-item";
import { BiLogOut } from "react-icons/bi";
import { IoMdHelpBuoy } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/state/AuthState";
import useCurrentUser from "@/hooks/useCurrentUser";
import { cn, getInitials } from "@/lib/utils";
import { useToggle } from "usehooks-ts";
import { useRouter } from "next/navigation";

export default function MenuPopover() {
  const { data: user } = useCurrentUser();
  const logout = useAuth((state) => state.logout);
  const [value, toggle, setValue] = useToggle(false);

  return (
    <>
      <Popover open={value} onOpenChange={setValue}>
        <PopoverTrigger asChild>
          <div
            className={cn(
              "group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full duration-200 hover:bg-default-light dark:hover:bg-default-dark",
            )}
          >
            {user ? (
              <Avatar className="h-10 w-10 hover:border-2 dark:border-paper-dark">
                <AvatarImage src={user.image?.url} />

                <AvatarFallback>
                  {" "}
                  {getInitials(user?.name || "")}
                </AvatarFallback>
              </Avatar>
            ) : (
              <AiOutlineUser
                size={25}
                className="group-hover:text-light-main dark:group-hover:text-dark-main"
              />
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="mt-5 rounded-2xl">
          {user ? (
            <>
              <div className="flex gap-x-3">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={user.image?.url} />

                  <AvatarFallback>{`${user.name?.at(0) || ""}${
                    user?.name?.split(" ")?.at(-1)?.at(0) || ""
                  }`}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <h4 className="font-semibold">
                    {user.name || user.username}
                  </h4>
                  {(user.seller_type?.slug === "dealership" ||
                    user.seller_type?.slug === "broker") && (
                    <p className="mt-0.5 text-xs">Points: {user?.points}</p>
                  )}
                </div>
              </div>
              <Separator className="my-3" />
              <div className="space-y-1">
                {menuPopoverItemsMain.map(({ href, label, icon }) => (
                  <MenuPopoverItem
                    onClick={toggle}
                    href={href}
                    label={label}
                    icon={icon}
                    key={href}
                  />
                ))}
              </div>{" "}
            </>
          ) : (
            <div onClick={toggle} className="grid grid-cols-2 gap-x-3">
              <Link href={REGISTER_ROUTE}>
                {" "}
                <Button className="w-full">Register</Button>
              </Link>
              <Link href={LOGIN_ROUTE}>
                {" "}
                <Button className="w-full">Login</Button>
              </Link>
            </div>
          )}
          <Separator className="my-3" />
          <div className="space-y-1 ">
            <ThemeSwitch />

            {user && (
              <div
                onClick={logout}
                className="  flex cursor-pointer items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-accent-light focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-accent-dark"
              >
                <div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
                  <BiLogOut size={22} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium ">{"Log out"}</p>
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
