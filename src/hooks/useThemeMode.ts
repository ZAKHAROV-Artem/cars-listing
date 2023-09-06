"use client";

import { useEffect } from "react";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  mode: "dark" | "light";
};

type Actions = {
  toDark: () => void;
  toLight: () => void;
  toggleMode: () => void;
};

export const useTheme = create(
  immer<State & Actions>((set) => ({
    mode: "light",

    toDark: () => {
      set((state) => {
        state.mode = "dark";
      });
      const root = document.querySelector("html");
      if (!root) return;
      !root.classList.contains("dark") && root.classList.add("dark");
      localStorage.theme = "dark";
    },
    toLight: () => {
      set((state) => {
        state.mode = "light";
      });
      const root = document.querySelector("html");
      if (!root) return;
      root.classList.remove("dark");
      localStorage.theme = "light";
    },
    toggleMode: () => {
      set((state) => {
        if (localStorage.theme === "light") state.mode = "dark";
        else state.mode = "light";
      });
    },
  })),
);
