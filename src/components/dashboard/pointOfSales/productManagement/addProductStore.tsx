// import { create } from "zustand";

// export const initialFormState = {
//     product_name: "",
//     sku: "",
//     ean: "",
//     category_id: "",
//     sub_category_id: "",
//     short_description: "",
//     long_description: "",
//     location_id: "",
//     has_variation: "",
//     tags: "",
//     promotional_price: "",
//     promotional_start_date: "",
//     promotional_end_date: "",
//     safety_instructions: "",
//     certificates: "",
//     image_path: null as typeof FileReader.prototype.result,
//     variations: [],
//     sellingPrice: "",
//     updated_at: "",
//   };

//   interface FormState {
//     form_data: typeof initialFormState;
//     updateForm: (item: typeof initialFormState) => void;
//     resetForm: () => void;
//   }

//   const useStore = create<FormState>((set: (arg0: { (): { form_data: any; }; (): { form_data: { product_name: string; sku: string; ean: string; category_id: string; sub_category_id: string; short_description: string; long_description: string; location_id: string; has_variation: string; tags: string; promotional_price: string; promotional_start_date: string; promotional_end_date: string; safety_instructions: string; certificates: string; image_path: null; variations: never[]; sellingPrice: any; updated_at: string; }; }; }) => any) => ({
//     form_data: { ...initialFormState },
//     updateForm: (item: any) => set(() => ({ form_data: { ...item } })),
//     resetForm: () => set(() => ({ form_data: { ...initialFormState }})),
//   }));
// export default useStore;

import { create } from "zustand";

interface VariationAttribute {
  option_value: string;
}

// Step 1: Define a separate type for form data
type FormData = {
  product_name: string;
  name?: string; // Optional field for variations
  sku: string;
  ean: string;
  category:string;
  category_id: string;
  sub_category_id: string;
  short_description: string;
  long_description: string;
  location_id: string;
  has_variation: string;
  tags: string;
  promotional_price: string;
  promotional_start_date: string;
  promotional_end_date: string;
  safety_instructions: string;
  certificates: string;
  image: string | ArrayBuffer | null;
  image_path: string[];
  variations: any[];
  variationID?: string;
  selling_price: string;
  updated_at: string;
  quantity: string;
  location: string;
  cost_price: string;
  reorder_level?: string; // Optional field
  size?: string; // Optional field
  color?: string; // Optional field
  variation_attributes?: VariationAttribute[]; 
};

// Step 2: Use the type for your initial state
export const initialFormState: FormData = {
  product_name: "",
  name: "", 
  sku: "",
  ean: "",
  category: "",
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
  image: null,
  image_path: [],
  variations: [],
  variationID: "",
  selling_price: "",
  updated_at: "",
  quantity: "",
  location: "",
  cost_price: "",
  reorder_level: "",
  size: "",
  color: "",
  variation_attributes: [],
};

// Step 3: Define the store interface
interface FormState {
  form_data: FormData;
  updateForm: (item: FormData) => void;
  resetForm: () => void;
}

// Step 4: Use the correct typing for the store
const useStore = create<FormState>((set) => ({
  form_data: { ...initialFormState },
  updateForm: (item) => set(() => ({ form_data: { ...item } })),
  resetForm: () => set(() => ({ form_data: { ...initialFormState } })),
}));

export default useStore;
