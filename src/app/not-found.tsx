import Image from "next/image";
import Link from "next/link";
export default function NotFoundPage() {
  return (
    <div className="my-5 flex w-full flex-col items-center justify-center">
      <Image
        src="/imgs/404.png"
        className="max-h-[300px] max-w-[300px] md:max-h-[500px] md:max-w-[500px]"
        width={2000}
        height={2000}
        quality={100}
        alt="Not found"
      />
      <div className="text-xl">
        Page not found. Go to{" "}
        <Link href="/" className="text-primary-main underline">
          main
        </Link>
      </div>
    </div>
  );
}
