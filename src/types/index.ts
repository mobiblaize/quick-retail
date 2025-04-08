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
