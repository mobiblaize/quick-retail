import { defaultDiscountPayload, defaultPayload2 } from "../../../types";
import { useFetchPostData, useGetData, usePostData } from "../../useApis";

export const useCreateDiscount = () => {
    return usePostData("pos/discount/add-discount");
  };


  export const useFetchAllDiscount = (customPayload?: Partial<typeof defaultPayload2>) => {
    const defaultPayload2 = {
      search: "",
      sort_by: "",
      per_page: "",
      paginate: true,
    };
  
    const payload = { ...defaultPayload2, ...customPayload };
  
    return useFetchPostData("pos/discount/all", payload);
  };

  export const useFetchDiscountStat = () => {
    return useGetData(`pos/discount/discount-overview`);
  };  
  
  export const useFetchDiscountAnalysis = (customPayload?: Partial<typeof defaultDiscountPayload >) => {
    const defaultDiscountPayload = {
      month: "",
      year: "",
    };
  
    const payload = { ...defaultDiscountPayload , ...customPayload };
  
    return useFetchPostData("pos/discount/discount-analysis", payload);
  };  
  export const useFetchDiscountProduct = () => {
    return useGetData(`pos/product/products`);
  };