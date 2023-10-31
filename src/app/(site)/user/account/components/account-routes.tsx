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
    <div className="scroll small-scrollbar overflow-x-auto pb-3">
      <div
        className={cn("mt-4 flex w-full justify-around", {
          "min-w-[900px]": user?.role.type === "admin",
        })}
      >
        {accountPageRoutes.map((route) => (
          <Link
            className={cn(
              "w-full border-b border-t p-4 text-center text-sm md:text-md",
              {
                "border-y-blue-400 ": pathname === route.href,
              },
            )}
            href={route.href}
            key={route.href}
          >
            {route.label}
          </Link>
        ))}
        {(user?.seller_type?.slug === "dealership" ||
          user?.seller_type?.slug === "broker") && (
          <Link
            className={cn(
              "w-full border-b border-t p-4 text-center text-sm md:text-md",
              {
                "border-y-blue-400 ": pathname === "/user/account/balance",
              },
            )}
            href={"/user/account/balance"}
            key={"/user/account/balance"}
          >
            Balance
          </Link>
        )}
        {user?.role.type === "admin" && (
          <>
            <Link
              className={cn(
                "w-full border-b border-t p-4 text-center text-sm md:text-md",
                {
                  "border-y-blue-400 ":
                    pathname === "/user/account/admin/carlist",
                },
              )}
              href={"/user/account/admin/carlist"}
              key={"/user/account/admin/carlist"}
            >
              Admin carlist
            </Link>
            <Link
              className={cn(
                "w-full border-b border-t p-4 text-center text-sm md:text-md",
                {
                  "border-y-blue-400 ":
                    pathname === "/user/account/admin/dealers",
                },
              )}
              href={"/user/account/admin/dealers"}
              key={"/user/account/admin/dealers"}
            >
              Dealers
            </Link>
            <Link
              className={cn(
                "w-full border-b border-t p-4 text-center text-sm md:text-md",
                {
                  "border-y-blue-400 ":
                    pathname === "/user/account/admin/brokers",
                },
              )}
              href={"/user/account/admin/brokers"}
              key={"/user/account/admin/brokers"}
            >
              Brokers
            </Link>
          </>
        )}
      </div>{" "}
    </div>
  );
}
