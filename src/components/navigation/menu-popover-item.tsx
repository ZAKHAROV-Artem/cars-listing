import { MenuPopoverItemType } from "@/data/navigation-data";
import Link from "next/link";

export default function MenuPopoverItem({
  href,
  label,
  icon: Icon,
}: MenuPopoverItemType) {
  return (
    <Link
      href={href}
      className=" dark:hover:bg-accent-dark` flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-accent-light focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-accent-dark"
    >
      <div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
        {<Icon size={22} />}
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium ">{label}</p>
      </div>
    </Link>
  );
}
