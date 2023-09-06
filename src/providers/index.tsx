"use client";

import { useTheme } from "@/hooks/useThemeMode";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();
export default function Providers({ children }: { children: ReactNode }) {
  const { toDark, toLight } = useTheme();
  useEffect(() => {
    if (localStorage.theme === "dark") {
      toDark();
    } else {
      toLight();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SessionProvider>
      <Toaster />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
