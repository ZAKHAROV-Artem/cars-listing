"use client";

import { accountPageRoutes } from "@/data/navigation-data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountRoutes() {
  const pathname = usePathname();
  return (
    <div className="mt-4 flex w-full justify-around">
      {accountPageRoutes.map((route) => (
        <Link
          className={cn("w-full border-b border-t p-4 text-center", {
            "border-y-blue-400 ": pathname === route.href,
          })}
          href={route.href}
          key={route.href}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
}
