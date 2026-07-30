/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defaultSalesAnalysis, defaultPayload2, SalesPayload } from "../../../types";
import { useFetchPostData, useGetData, usePostData, usePutData } from "../../useApis";

export const useCreateSales = () => {
  return usePostData("pos/sales/add-sales");
};

export const useFetchAllSales = (customPayload?: SalesPayload) => {
  const defaultPayload: SalesPayload = {
    search: "",
    sort_by: "",
    per_page: "",
    paginate: true,
    start_date: "",
    end_date: "",
    status: "",
    //@ts-ignore
    price_from: "",
    price_to: "",

  };

  const payload = { ...defaultPayload, ...customPayload };

  return useFetchPostData("pos/sales/all-sales", payload);
};


export const useFetchSalesOverview = (customPayload?: Partial<typeof defaultSalesAnalysis>) => {
    const defaultSalesAnalysis = {
        start_date: "",
        end_date:"",
    };
  
    const payload = { ...defaultSalesAnalysis, ...customPayload };
  
    return useFetchPostData("pos/sales/all-sales", payload);
  };



export const useFetchSingleSale = (orderId: number | string) => {
  return useGetData(`pos/sales/show-sale-order/${orderId}`);
};

export const useFetchDownloadReceipt = (orderId: number | string) => {
  return useGetData(`pos/sales/sales-order/${orderId}`);
};
export const useUpdateDraft = (orderId: number | string) => {
  return usePutData(`pos/sales/update-draft-order/${orderId}`);
};

export const useFetchingleOrderProducts = (orderId: string, customPayload?: Partial<typeof defaultPayload2>) => {
  const defaultPayload = {
    search: "",
    sort_by: "",
    per_page: "500",
    paginate: true,
  }

  const payload = { ...defaultPayload, ...customPayload };

  return useFetchPostData(`pos/sales/sales-order-products/${orderId}`, payload);
};

export const usePaymentDetails = () => {
  return usePostData("pos/sales/payment-breakdown");
};