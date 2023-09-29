import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react";

type Actions = {
  setToken: (token: string) => void;
  unsetToken: () => void;
  logout: () => void;
};

export const useAuth = create(
  immer<Actions>((set) => ({
    setToken: (token) => {
      Cookies.set("jwt", token, { expires: 7 });
      Cookies.set("authenticated", "true", { expires: 7 });
    },
    unsetToken: () => {
      Cookies.remove("jwt");
      Cookies.remove("authenticated");
    },
    logout: () => {
      Cookies.remove("jwt");
      Cookies.remove("authenticated");
      signOut({ callbackUrl: "/" });
    },
  })),
);
