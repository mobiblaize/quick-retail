import { create } from "zustand";

export type SelectedItemPayload = {
  productId?: string;
  variationId?: string;
  name: string;
  custom: boolean;
  price: number;
  quantity: number;
};

interface OrderState {
  items: SelectedItemPayload[];
  setItems: (items: SelectedItemPayload[]) => void;
  clearItems: () => void;

  customer: { id: string | null; name: string } | null;
  setCustomer: (customer: { id: string | null; name: string }) => void;
  clearCustomer: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  clearItems: () => set({ items: [] }),

  customer: null,
  setCustomer: (customer) => set({ customer }),
  clearCustomer: () => set({ customer: null }),
}));
