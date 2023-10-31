"use client"; // Error components must be Client Components

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="my-5 flex w-full flex-col items-center justify-center gap-y-3">
      <Image
        src="/imgs/error.png"
        className="max-h-[300px] max-w-[300px] md:max-h-[500px] md:max-w-[500px]"
        width={2000}
        height={2000}
        quality={100}
        alt="Error page"
      />
      <Button onClick={() => reset()}>Try again</Button>
      <div className="text-xl">
        An error occured{" "}
        <Link href="/" className="text-primary-main underline">
          main
        </Link>
      </div>
      <div>If error has not gone try to contact with support</div>
      <div className="underline hover:text-primary-main">yourmail@mail.com</div>
    </div>
  );
}
