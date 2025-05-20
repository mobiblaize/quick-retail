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