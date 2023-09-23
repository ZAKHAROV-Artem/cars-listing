"use client";

import { ReactNode, useState } from "react";
import { useEffectOnce } from "usehooks-ts";

type Props = {
  fallback?: ReactNode;
  children: ReactNode;
};
export default function ClientOnly({ fallback, children }: Props) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  useEffectOnce(() => {
    setIsLoaded(true);
  });
  if (!isLoaded) return fallback || null;
  return children;
}
