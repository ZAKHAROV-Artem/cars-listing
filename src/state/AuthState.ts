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
    },
    unsetToken: () => {
      Cookies.remove("jwt");
    },
    logout: () => {
      signOut();
      Cookies.remove("jwt");
      window.location.reload();
    },
  })),
);
