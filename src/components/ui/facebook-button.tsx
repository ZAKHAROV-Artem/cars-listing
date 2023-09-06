"use client";

import { AiFillFacebook } from "react-icons/ai";
import { signIn, useSession } from "next-auth/react";
import { useAuth } from "@/state/AuthState";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function FacebookButton() {
  const queryClient = useQueryClient();
  const { data } = useSession();
  const setToken = useAuth((state) => state.setToken);
  const router = useRouter();
  useEffect(() => {
    if (data?.token && data?.user) {
      setToken(data.token.jwt);
      queryClient.invalidateQueries(["current-user"]);
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <div
      onClick={() => signIn("facebook")}
      className="flex w-fit cursor-pointer  items-center gap-x-3 rounded-xl  bg-blue-700 p-3 px-5 text-white duration-300"
    >
      <AiFillFacebook size={25} />
      <span className="font-bold">Continute with facebook</span>
    </div>
  );
}
