import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  tab: string;
};

type Actions = {
  setTab: (value: string) => void;
};

export const useTabs = create(
  immer<State & Actions>((set) => ({
    tab: "recent-cars",
    setTab: (value) =>
      set((state) => {
        state.tab = value;
      }),
  })),
);
