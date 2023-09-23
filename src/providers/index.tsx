"use client";

import { useTheme } from "@/hooks/useThemeMode";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { useEffectOnce } from "usehooks-ts";

const queryClient = new QueryClient();
export default function Providers({ children }: { children: ReactNode }) {
  const { toDark, toLight } = useTheme();
  useEffectOnce(() => {
    if (localStorage.theme === "dark") {
      toDark();
    } else {
      toLight();
    }
  });

  return (
    <SessionProvider>
      <Toaster />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
