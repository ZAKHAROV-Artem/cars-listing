import { socialsLinks } from "@/data/navigation-data";
import Image from "next/image";

type Props = {
  className?: string;
  withName?: boolean;
};

export default function SocialMediaList({
  className,
  withName = false,
}: Props) {
  return (
    <nav className={`flex space-x-3 text-2xl ${className} `}>
      {socialsLinks.map((item, i) => (
        <a
          key={i}
          className={`group flex items-center space-x-2 text-2xl leading-none text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white`}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={item.name}
        >
          <div className="w-5 flex-shrink-0 ">
            <Image sizes="40px" src={item.icon} alt="" />
          </div>
          {withName && (
            <span className="hidden text-sm lg:block">{item.name}</span>
          )}
        </a>
      ))}
    </nav>
  );
}
