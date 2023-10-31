"use client";

import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { useAuth } from "@/state/AuthState";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateEffect } from "usehooks-ts";

export default function GoogleButton() {
  const { data } = useSession();
  const setToken = useAuth((state) => state.setToken);
  const router = useRouter();
  const queryClient = useQueryClient();
  useUpdateEffect(() => {
    if (data?.token && data?.user) {
      setToken(data.token.jwt);
      queryClient.invalidateQueries(["current-user"]);
      router.push("/");
    }
  }, [data]);
  return (
    <div
      onClick={() => signIn("google")}
      className="flex w-full cursor-pointer gap-x-3 rounded-xl border border-gray-300 p-3 px-5 duration-300 hover:bg-gray-200/30"
    >
      <FcGoogle size={25} />
      <span className="font-bold">Continute with google</span>
    </div>
  );
}
