import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Filter = {
  key: string;
  value: string;
};
type State = {
  isOpen: boolean;
  filters: Filter[];
  query: string;
  bodyType: string;
  brand: string;
  model: string;
  color: string;
  fuel: string;
  yearMade: string;
  transmission: string;
  sellerType: string;
  minPrice: number;
  maxPrice: number;
  minMileage: number;
  maxMileage: number;
};

type Actions = {
  setIsOpen: (value: boolean) => void;
  setFilters: (filters: Filter[]) => void;
  addFilter: (key: string, value: string) => void;
  setFilter: (key: string, value: string) => void;
  removeFilter: (key: string) => void;
  setQuery: (value: string) => void;
  setBodyType: (value: string) => void;
  setBrand: (value: string) => void;
  setModel: (value: string) => void;
  setColor: (value: string) => void;
  setFuel: (value: string) => void;
  setYearMade: (value: string) => void;
  setTransmission: (value: string) => void;
  setSellerType: (value: string) => void;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
  setMinMileage: (value: number) => void;
  setMaxMileage: (value: number) => void;
};

export const useFilters = create(
  immer<State & Actions>((set) => ({
    isOpen: false,
    filters: [],
    query: "",
    bodyType: "",
    brand: "",
    model: "",
    color: "",
    fuel: "",
    yearMade: "",
    transmission: "",
    sellerType: "",
    minPrice: 0,
    maxPrice: 20000000,
    minMileage: 0,
    maxMileage: 1000000,
    setIsOpen: (value) =>
      set((state) => {
        state.isOpen = value;
      }),
    setFilters: (filters) =>
      set((state) => {
        state.filters = filters;
      }),
    setFilter: (key, value) =>
      set((state) => {
        const index = state.filters.findIndex((filter) => filter.key === key);
        console.log(index);
        if (index === -1) {
          state.addFilter(key, value);
        } else {
          state.filters[index] = {
            key,
            value,
          };
        }
      }),
    addFilter: (key, value) =>
      set((state) => {
        console.log("Add filder ", key);
        state.filters.push({
          key,
          value,
        });
        console.log(JSON.stringify(state.filters));
      }),
    removeFilter: (key) =>
      set((state) => {
        state.filters = state.filters.filter((filter) => filter.key != key);
      }),
    setBodyType: (value) =>
      set((state) => {
        state.bodyType = value;
      }),
    setQuery: (value) =>
      set((state) => {
        state.query = value;
      }),
    setBrand: (value) =>
      set((state) => {
        state.brand = value;
      }),
    setModel: (value) =>
      set((state) => {
        state.model = value;
      }),
    setColor: (value) =>
      set((state) => {
        state.color = value;
      }),
    setFuel: (value) =>
      set((state) => {
        state.fuel = value;
      }),
    setYearMade: (value) =>
      set((state) => {
        state.yearMade = value;
      }),
    setTransmission: (value) =>
      set((state) => {
        state.transmission = value;
      }),
    setSellerType: (value) =>
      set((state) => {
        state.sellerType = value;
      }),
    setMinPrice: (value) =>
      set((state) => {
        state.minPrice = value;
      }),
    setMaxPrice: (value) =>
      set((state) => {
        state.maxPrice = value;
      }),
    setMinMileage: (value) =>
      set((state) => {
        state.minMileage = value;
      }),
    setMaxMileage: (value) =>
      set((state) => {
        state.maxMileage = value;
      }),
  })),
);
