"use client";

import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAuth } from "@/state/AuthState";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function GoogleButton() {
  const queryClient = useQueryClient();
  const { data } = useSession();
  const setToken = useAuth((state) => state.setToken);
  const router = useRouter();
  useEffect(() => {
    if (data?.token && data?.user) {
      setToken(data.token.jwt);
      router.push("/");
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <div
      onClick={() => signIn("google")}
      className="flex w-fit cursor-pointer gap-x-3 rounded-xl border border-gray-300 p-3 px-5 duration-300 hover:bg-gray-200/30"
    >
      <FcGoogle size={25} />
      <span className="font-bold">Continute with google</span>
    </div>
  );
}
