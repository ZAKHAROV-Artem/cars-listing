import { UserPlain } from "@/types/api/user";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  show: boolean;
  seller: UserPlain | undefined;
  refetch: any | undefined;
};

type Actions = {
  setShow: (value: boolean) => void;
  toggle: () => void;
  setFalse: () => void;
  setTrue: () => void;
  setSeller: (seller: UserPlain) => void;
  setRefetch: (refetch: any) => void;
  clearSeller: () => void;
  setAll: (data: State) => void;
};

export const useEditSellerDialog = create(
  immer<State & Actions>((set) => ({
    show: false,
    seller: undefined,
    refetch: undefined,
    setShow: (value) =>
      set((state) => {
        if (state.show) state.clearSeller();
        state.show = value;
      }),
    toggle: () =>
      set((state) => {
        if (state.show) state.clearSeller();
        state.show = !state.show;
      }),
    setFalse: () =>
      set((state) => {
        state.clearSeller();
        state.show = false;
      }),
    setTrue: () =>
      set((state) => {
        state.show = true;
      }),
    setSeller: (seller) =>
      set((state) => {
        state.seller = seller;
      }),
    clearSeller: () =>
      set((state) => {
        state.seller = undefined;
      }),
    setRefetch: (refetch) =>
      set((state) => {
        state.refetch = refetch;
      }),
    setAll: (data: State) =>
      set((state) => {
        if (data.show) state.show = data.show;
        if (data.seller) state.seller = data.seller;
        if (data.refetch) state.refetch = data.refetch;
      }),
  })),
);
