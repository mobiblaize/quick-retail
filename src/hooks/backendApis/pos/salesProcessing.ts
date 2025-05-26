import { defaultPayload2 } from "../../../types";
import { useFetchPostData, useGetData, usePostData } from "../../useApis";

export const useCreateSales = () => {
    return usePostData("pos/sales/add-sales");
  };

  export const useFetchAllSales = (customPayload?: Partial<typeof defaultPayload2>) => {
    const defaultPayload = {
      search: "",
      sort_by: "",
      per_page: "",
      paginate: true,
    };
  
    const payload = { ...defaultPayload, ...customPayload };
  
    return useFetchPostData("pos/sales/all-sales", payload);
  };
  
  export const useFetchSingleSale = (orderId: number | string) => {
    return useGetData(`pos/sales/show-sale-order/${orderId}`);
  };
  
  export const useFetchDownloadReceipt = (orderId: number | string) => {
    return useGetData(`pos/sales/sales-order/${orderId}`);
  };