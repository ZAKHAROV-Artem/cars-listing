import Link from "next/link";
import { AiOutlinePlusCircle } from "react-icons/ai";

export default function PostCatFloatingButton() {
  return (
    <Link
      href="/cars/post"
      className="fixed bottom-4 right-4 z-20 flex gap-x-2 rounded-3xl bg-primary-main p-3 text-white lg:hidden"
    >
      <AiOutlinePlusCircle
        size={25}
        className="group-hover:text-light-main dark:group-hover:text-dark-main"
      />
      Post car
    </Link>
  );
}
