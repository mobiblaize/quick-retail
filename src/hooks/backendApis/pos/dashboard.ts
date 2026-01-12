import { defaultDashboardAnalysis, SalesPayload } from "../../../types";
import { useFetchPostData } from "../../useApis";

const defaultsPayload = {
  search: "",
  sort_by: "",
 location_name: "",
  category_name: "",
  price_from: "",
  price_to: "",
  date_range: "",
  per_page: "500",
  paginate: true,
};

export const useFetchAnalysisOverview = (customPayload?: Partial<typeof defaultDashboardAnalysis>) => {
    const defaultDashboardAnalysis = {
        start_date: "",
        end_date:"",
    };
  
    const payload = { ...defaultDashboardAnalysis, ...customPayload };
  
    return useFetchPostData("pos/dashboard/analysis-overview", payload);
  };

  export const useFetchSalesAnalysis = (customPayload?: Partial<{ year: number }>) => {
    const defaultSalesPayload = {
      year: new Date().getFullYear(),
    };
  
    const payload = { ...defaultSalesPayload, ...customPayload };
  
    return useFetchPostData("pos/dashboard/sales-overview", payload);
  };
  
  export const useFetchCustomerAnalysis =  (customPayload?: Partial<typeof defaultDashboardAnalysis>) => {
    const defaultDashboardAnalysis = {
      start_date: "",
      end_date:"",
  };

    const payload = { ...defaultDashboardAnalysis , ...customPayload };
  
    return useFetchPostData("pos/dashboard/customer-stats", payload);
  };


  export const useFetchCategorySales=  (customPayload?: Partial<typeof defaultDashboardAnalysis>) => {
    const defaultDashboardAnalysis = {
      start_date: "",
      end_date:"",
  };

    const payload = { ...defaultDashboardAnalysis , ...customPayload };
  
    return useFetchPostData("pos/dashboard/category-sales-overview", payload);
  };
  
  export const useFetchPopularProducts = (
    productPayload?: Partial<typeof defaultsPayload>
  ) => {
  
    const payload = { ...defaultsPayload, ...productPayload };
  
    return useFetchPostData("pos/dashboard/popular-products", payload);
  };
  export const useFetchDashbordOrders = (customPayload?: SalesPayload) => {
    const defaultPayload: SalesPayload = {
      search: "",
      sort_by: "",
      per_page: "500",
      paginate: true,
      start_date: "",
      end_date: "",
      status: "",
      //@ts-ignore
      price_from: "",
      price_to: "",
 
    };
  
    const payload = { ...defaultPayload, ...customPayload };
  
    return useFetchPostData("pos/dashboard/all-sales", payload);
  };

  export const useFetchDashboardCustomers = (
    productPayload?: Partial<typeof defaultsPayload>
  ) => {
  
    const payload = { ...defaultsPayload, ...productPayload };
  
    return useFetchPostData("pos/dashboard/all-customers", payload);
  };