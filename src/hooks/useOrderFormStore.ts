import { create } from 'zustand';

interface SelectedItemPayload {
  variationId: string;
  quantity: number;
  price?: number;
  name?: string;
  custom?: boolean;
  [key: string]: any;
}

interface OrderState {
  items: SelectedItemPayload[];
  setItems: (items: SelectedItemPayload[]) => void;
  clearItems: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  clearItems: () => set({ items: [] }),
}));