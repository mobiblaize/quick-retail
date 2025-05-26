export interface ChartDataPoint {
  month: string;
  revenue: number;
  [key: string]: string | number;
}

export interface SortOption {
  key: string;
  label: string;
  icon?: React.ReactNode;
  type?: "string" | "date" | "number";
  defaultDirection?: "asc" | "desc";
}

export interface TableRowData {
  [key: string]: string | number | boolean | null | undefined | React.ReactNode;
  name?: string;
}


export type FetchCategoriesPayload = {
  search: string;
  sort_by: string;
  start_date: string;
  end_date: string;
  date_range: string;
  per_page: string;
  paginate: boolean;
};

export const defaultPayload = {
  search: "",
  sort_by: "",
  start_date: "",
  end_date: "",
  date_range: "",
  per_page: "",
  paginate: true,
};
export const defaultPayload2 = {
  search: "",
  sort_by: "",
  per_page: "",
  paginate: true,
}
export interface StoreTableRowData {
  storeName: string;
  storeId: string;
  storeSizeA: string | number;
  storeSizeB: string | number;
  location: string;
  dateCreated: string;
  totalCustomer: number;
  status: "Active" | "Inactive";
}
export interface Customer {
  customerID: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  created_at: string;
  updated_at: string;
  status: string;
  last_visit: string;
}

export interface OrderData {
  id: number;
  orderID: string;
  customer_name: string;
  order_total: string;
  amount_paid: string;
  fees: string; // JSON string: e.g., '{"tax":6000,"service_fee":1000,"discount":0}'
  order_number: string;
  receipt_no: string;
  date_completed: string;
  status: string;
  payment_status: string;
  payment_method: string;
  cancellation_reason: string | null;
  discount_id: number | null;
  customer_id: number;
  location_id: number;
  shipping_address_id: number | null;
  billing_address_id: number | null;
  staff_id: number;
  balance: string;
  created_at: string;
  updated_at: string;
  customer: Customer;
}

export const defaultDiscountPayload = {
  month: "",
  year: "",

}


export const defaultSalesPayload = {
  year: "",

}

export const defaultDashboardAnalysis = {
  start_date: "",
  end_date: "",

}