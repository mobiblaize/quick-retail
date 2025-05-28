import { create } from "zustand";

export const initialFormState = {
    product_name: "",
    sku: "",
    ean: "",
    category_id: "",
    sub_category_id: "",
    short_description: "",
    long_description: "",
    location_id: "",
    has_variation: "",
    tags: "",
    promotional_price: "",
    promotional_start_date: "",
    promotional_end_date: "",
    safety_instructions: "",
    certificates: "",
    image_path: null,
    variations: [],
    sellingPrice: "",
    updated_at: "",
  };

  interface FormState {
    form_data: typeof initialFormState;
    updateForm: (item: typeof initialFormState) => void;
    resetForm: () => void;
  }

  const useStore = create<FormState>((set: (arg0: { (): { form_data: any; }; (): { form_data: { product_name: string; sku: string; ean: string; category_id: string; sub_category_id: string; short_description: string; long_description: string; location_id: string; has_variation: string; tags: string; promotional_price: string; promotional_start_date: string; promotional_end_date: string; safety_instructions: string; certificates: string; image_path: null; variations: never[]; sellingPrice: any; updated_at: string; }; }; }) => any) => ({
    form_data: { ...initialFormState },
    updateForm: (item: any) => set(() => ({ form_data: { ...item } })),
    resetForm: () => set(() => ({ form_data: { ...initialFormState }})),
  }));
export default useStore;