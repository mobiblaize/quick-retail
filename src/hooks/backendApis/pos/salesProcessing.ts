import { defaultPayload2 } from "../../../types";
import { useFetchPostData, usePostData } from "../../useApis";

export const useCreateSales = () => {
    return usePostData("pos/sales/add-sales");
  };

  export const useFetchAllSales = (customPayload?: Partial<typeof defaultPayload2>) => {
    const defaultPayload = {
      search: "",
      sort_by: "",
    //   start_date: "",
    //   end_date: "",
    //   date_range: "",
      per_page: "",
      paginate: true,
    };
  
    const payload = { ...defaultPayload, ...customPayload };
  
    return useFetchPostData("pos/sales/all-sales", payload);
  };
  