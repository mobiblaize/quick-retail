import { create } from "zustand";

interface Application {
  subscription_id: string;
  application_id: string;
  amount: string;
  additional_seat: string;
}

interface SignupPayload {
  firstname: string;
  lastname: string;
  phoneno: string;
  email: string;
  company_name: string;
  company_size_id: number;
  billing_type: string;
  payment_method: string;
  password_url: string;
  paystack_complete_callback: string;
  applications: Application[];
}

interface SignupStore {
  payload: SignupPayload | null;
  setPayload: (data: SignupPayload) => void;
}

export const useSignupStore = create<SignupStore>((set) => ({
  payload: null,
  setPayload: (data) => set({ payload: data }),
}));
