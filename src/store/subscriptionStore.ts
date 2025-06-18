import { atom } from "jotai";
import { billingType } from "../components/landingComponent/pricing/SubscriptionDetails";

export const billingTypeStore = atom<billingType>("trial");
export const totalPrice = atom<number>(0);
export const selectedSubs = atom<any[]>([]);
export const registerData = atom<{ data: any; payment_url: string } | null>(
  null
);
export const selectedApp = atom<any[]>([]);
