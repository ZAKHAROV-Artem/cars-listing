"use client";

import { ReactNode, useEffect, useState } from "react";

type Props = {
  fallback?: ReactNode;
  children: ReactNode;
};
export default function ClientOnly({ fallback, children }: Props) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  if (!isLoaded) return fallback || null;
  return children;
}
