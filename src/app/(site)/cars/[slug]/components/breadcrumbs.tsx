import { MenuItemRouteType } from "@/data/navigation-data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Fragment } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
type Props = { items: MenuItemRouteType[]; title: string; className?: string };
export default function Breadcrumbs({ items, title, className }: Props) {
  return (
    <div className={cn("flex items-center gap-x-1", className)}>
      {items.map((item) => (
        <Fragment key={item.href}>
          <Link href={item.href} className="cursor-pointer hover:underline">
            {item.label}
          </Link>
          <MdKeyboardArrowRight />
        </Fragment>
      ))}
      <div>{title}</div>
    </div>
  );
}
