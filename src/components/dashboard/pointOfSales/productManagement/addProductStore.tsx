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
  };

  interface FormState {
    form_data: typeof initialFormState;
    updateForm: (item: typeof initialFormState) => void;
    resetForm: () => void;
  }

  const useStore = create<FormState>((set) => ({
    form_data: { ...initialFormState },
    updateForm: (item) => set(() => ({ form_data: { ...item } })),
    resetForm: () => set(() => ({ form_data: { ...initialFormState }})),
  }));
export default useStore;