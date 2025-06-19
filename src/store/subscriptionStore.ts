import { atom } from "jotai";

export type billingType = "trial" | "monthly" | "yearly";

export interface SubscriptionData {
  id: number;
  application_id: number;
  amount: number;
  additional_user_seat_number?: number;
  price_per_seat?: number;
  application?: {
    name: string;
    free_user_access: number;
  };
}

export const billingTypeStore = atom<billingType>("trial");
export const totalPrice = atom<number>(0);
export const selectedSubs = atom<SubscriptionData[]>([]);
export const registerData = atom<{ data: unknown; payment_url: string } | null>(
  null
);
export const selectedApp = atom<SubscriptionData[]>([]);
