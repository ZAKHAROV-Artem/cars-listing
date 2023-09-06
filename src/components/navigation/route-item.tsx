import { MenuItemRouteType } from "@/data/navigation-data";
import Link from "next/link";

type Props = {
  route: MenuItemRouteType;
};
export default function RouteItem({ route }: Props) {
  return (
    <Link
      href={route.href}
      target={(route.targetBlank && "_blank") || "_self"}
      className="block w-full rounded-md px-3 py-2 text-black hover:bg-accent-light dark:text-white dark:hover:bg-accent-dark"
    >
      {route.label}
    </Link>
  );
}
