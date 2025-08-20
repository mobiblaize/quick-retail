// import { create } from "zustand";

// interface VariationAttribute {
//   option_value: string;
// }
// type ProductData={  
//   has_variations?: number;
//   variation_attributes?: VariationAttribute[];
//   productID?: string;
// }

// // Step 1: Define a separate type for form data
// type FormData = {
//   product_name: string;
//   name?: string; 
//   sku: string;
//   ean: string;
//   category:string;
//   category_id: string;
//   sub_category_id: string;
//   short_description: string;
//   long_description: string;
//   location_id: string;
//   product?: ProductData;
//   has_variations: number;
//   tags: string;
//   promotional_price: string;
//   promotional_start_date: string;
//   promotional_end_date: string;
//   safety_instructions: string;
//   certificates: string;
//   image: string | ArrayBuffer | null;
//   image_path: string[];
//   variations: any[];
//   variationID?: string;
//   selling_price: string;
//   updated_at: string;
//   quantity: string;
//   location: string;
//   cost_price: string;
//   reorder_level?: string; 
//   size?: string; 
//   color?: string; 
//   variation_attributes?: VariationAttribute[]; 
//   notes?: string; 
//   productID?: string; 
//   cost_Price?: string; 
// };

// // Step 2: Use the type for your initial state
// export const initialFormState: FormData = {
//   product_name: "",
//   name: "", 
//   sku: "",
//   ean: "",
//   category: "",
//   category_id: "",
//   sub_category_id: "",
//   short_description: "",
//   long_description: "",
//   location_id: "",
//   has_variations: 0,
//   tags: "",
//   promotional_price: "",
//   promotional_start_date: "",
//   promotional_end_date: "",
//   safety_instructions: "",
//   certificates: "",
//   image: null,
//   image_path: [],
//   variations: [],
//   variationID: "",
//   selling_price: "",
//   updated_at: "",
//   quantity: "",
//   location: "",
//   cost_price: "",
//   reorder_level: "",
//   size: "",
//   color: "",
//   variation_attributes: [],
//   notes: "",
//   productID: "",
//   cost_Price: "", 
// };


// // Step 3: Define the store interface
// interface FormState {
//   form_data: FormData;
//   updateForm: (item: FormData) => void;
//   resetForm: () => void;
// }

// // Step 4: Use the correct typing for the store
// const useStore = create<FormState>((set) => ({
//   form_data: { ...initialFormState },
//   updateForm: (item) => set(() => ({ form_data: { ...item } })),
//   resetForm: () => set(() => ({ form_data: { ...initialFormState } })),
// }));

// export default useStore;


// Extended store to work with real API data


import { create } from "zustand";
// ✅ Import the types you already use in productTable, productOverview, etc.
// import { ApiProduct, PaginationData, TransactionData } from "../types"; 

type ApiProduct = {
  id: number;
  variationID: string;
  name: string;
  sku: string;
  ean: string;
  code: string;
  cost_price: string;
  selling_price: string;
  stock_level: number;
  status: string;
  category?: {
    id: number;
    name: string;
  };
  location?: {
    id: number;
    name: string;
  };
};

interface PaginationData {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

interface TransactionData {
  totalSales: number;
  totalRevenue: number;
  totalTransactions: number;
}



interface VariationAttribute {
  product_variation_id: number;
  option_type: string;
  option_value: string;
}

// Keep FormData (local to store)
type FormData = {
  id: string;
  product_name: string;
  name?: string;
  sku: string;
  ean: string;
  code: string;
  status: string;
  stock_status: string;
  category: string;
  category_id: string;
  sub_category_id: string;
  short_description: string;
  long_description: string;
  location_id: string;
  product?: any;
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

// ✅ Initial form state
export const initialFormState: FormData = {
  id: "",
  product_name: "",
  name: "",
  sku: "",
  ean: "",
  code: "",
  status: "",
  stock_status: "",
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

// ✅ Extended state interface — using imported types
interface ExtendedFormState {
  form_data: FormData;

  // API data
  apiProducts: ApiProduct[];
  paginationData?: PaginationData;
  overviewData?: TransactionData;
  isLoading: boolean;
  error: string | null;

  // Filters
  searchTerm: string;
  categoryFilter: string;
  statusFilter: string;
  locationFilter: string;

  // Actions
  updateForm: (item: FormData) => void;
  resetForm: () => void;

  setApiProducts: (products: ApiProduct[]) => void;
  setPaginationInfo: (pagination: PaginationData) => void;
  setOverviewData: (overview: TransactionData) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  setSearchTerm: (term: string) => void;
  setCategoryFilter: (category: string) => void;
  setStatusFilter: (status: string) => void;
  setLocationFilter: (location: string) => void;

  // Helpers
  getFilteredProducts: () => ApiProduct[];
  getUniqueCategories: () => string[];
  getUniqueLocations: () => string[];
}

// ✅ Create the store
const useStore = create<ExtendedFormState>((set, get) => ({
  form_data: { ...initialFormState },

  // API data
  apiProducts: [],
  paginationData: undefined,
  overviewData: undefined,
  isLoading: false,
  error: null,

  // Filters
  searchTerm: "",
  categoryFilter: "",
  statusFilter: "",
  locationFilter: "",

  // Form actions
  updateForm: (item) => set(() => ({ form_data: { ...item } })),
  resetForm: () => set(() => ({ form_data: { ...initialFormState } })),

  // API actions
  setApiProducts: (products) =>
    set(() => ({ apiProducts: products, error: null })),
  setPaginationInfo: (pagination) =>
    set(() => ({ paginationData: pagination })),
  setOverviewData: (overview) =>
    set(() => ({ overviewData: overview })),
  setIsLoading: (loading) => set(() => ({ isLoading: loading })),
  setError: (error) => set(() => ({ error })),

  // Filters
  setSearchTerm: (term) => set(() => ({ searchTerm: term })),
  setCategoryFilter: (category) => set(() => ({ categoryFilter: category })),
  setStatusFilter: (status) => set(() => ({ statusFilter: status })),
  setLocationFilter: (location) => set(() => ({ locationFilter: location })),

  // Helpers
getFilteredProducts: () => {
  const state = get();
  return state.apiProducts.filter((product) => {
    const matchesSearch =
      !state.searchTerm ||
      product.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(state.searchTerm.toLowerCase());

    const matchesCategory =
      !state.categoryFilter ||
      product.category?.name === state.categoryFilter;

    const matchesStatus =
      !state.statusFilter || product.status === state.statusFilter;

    const matchesLocation =
      !state.locationFilter ||
      product.location?.name === state.locationFilter;

    return (
      matchesSearch && matchesCategory && matchesStatus && matchesLocation
    );
  });
},


getUniqueCategories: () => {
  const state = get();
  return Array.from(
    new Set(
      state.apiProducts
        .map((p: ApiProduct) => p.category?.name)
        .filter((name): name is string => Boolean(name)) 
    )
  );
},

getUniqueLocations: () => {
  const state = get();
  return Array.from(
    new Set(
      state.apiProducts
        .map((p: ApiProduct) => p.location?.name)
        .filter((name): name is string => Boolean(name))
    )
  );
},

}));

export default useStore;
