"use client";

import { accountPageRoutes } from "@/data/navigation-data";
import useCurrentUser from "@/hooks/useCurrentUser";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountRoutes() {
  const pathname = usePathname();
  const { data: user } = useCurrentUser();
  return (
    <div className="mt-4 flex w-full justify-around">
      {accountPageRoutes.map((route) => (
        <Link
          className={cn("w-full border-b border-t p-4 text-center text-sm md:text-md", {
            "border-y-blue-400 ": pathname === route.href,
          })}
          href={route.href}
          key={route.href}
        >
          {route.label}
        </Link>
      ))}
      {(user?.seller_type?.slug === "dealership" ||
        user?.seller_type?.slug === "broker") && (
        <Link
          className={cn("w-full border-b border-t p-4 text-center text-sm md:text-md", {
            "border-y-blue-400 ": pathname === "/user/account/balance",
          })}
          href={"/user/account/balance"}
          key={"/user/account/balance"}
        >
          Balance
        </Link>
      )}
    </div>
  );
}
