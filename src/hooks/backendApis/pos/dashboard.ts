import { defaultDashboardAnalysis, defaultSalesPayload } from "../../../types";
import { useFetchPostData } from "../../useApis";

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
  