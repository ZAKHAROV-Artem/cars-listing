"use client";

import { ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
};
export default function ClientOnly({ children }: Props) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  if (!isLoaded) return null;
  return children;
}
