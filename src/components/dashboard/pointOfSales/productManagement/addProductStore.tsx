import { create } from "zustand";

interface VariationAttribute {
  option_value: string;
}
type ProductData={  
  has_variations?: number;
  variation_attributes?: VariationAttribute[];
  productID?: string;
}

// Step 1: Define a separate type for form data
type FormData = {
  product_name: string;
  name?: string; 
  sku: string;
  ean: string;
  category:string;
  category_id: string;
  sub_category_id: string;
  short_description: string;
  long_description: string;
  location_id: string;
  product?: ProductData;
  has_variations: number;
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
  reorder_level?: string; 
  size?: string; 
  color?: string; 
  variation_attributes?: VariationAttribute[]; 
  notes?: string; 
  productID?: string; 
  cost_Price?: string; 
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
  has_variations: 0,
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
  notes: "",
  productID: "",
  cost_Price: "", 
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
