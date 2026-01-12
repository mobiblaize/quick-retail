/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { axiosInstance, baseUrl } from "../../../utils/axios-instance";
import { useCreateExportData, useDeleteData, useFetchPostData, useGetData, useGetExportData, usePostData, usePutData, useUploadData,  } from "../../useApis";
import { defaultSalesAnalysis } from "../../../types";

  const defaultPayload = {
    search: "",
    sort_by: "",
    per_date: "",
    limit: "",
    paginate: false,
  };

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
  const defaultSearchPayload = {
    search: "",
   
  };
  interface SearchPayload {
    search: string;
    [key: string]: any;
  }


export const useFetchProductVariations = (productId?: string, enabled = true) => {
  return useGetData(`pos/product/edit-product/${productId}`, {}, enabled);
};

export const useCreateProduct = () => {
  return usePostData("pos/product/add-product");
};

export const useCreateBulkProduct = () => {
  return useUploadData("pos/product/process");
}

export const useDownloadBulkErrorReport = () => {
  return useCreateExportData(`pos/product/error-report`);
}

export const useFetchAllProducts = (
  productPayload?: Partial<typeof defaultsPayload>
) => {

  const payload = { ...defaultsPayload, ...productPayload };

  return useFetchPostData("pos/product/all", payload);
};

export const useFetchProductOverview = (customPayload?: Partial<typeof defaultSalesAnalysis>) => {
    const defaultProductAnalysis = {
        start_date: "",
        end_date:"",
    };
  
    const payload = { ...defaultProductAnalysis, ...customPayload };
  
    return useFetchPostData("pos/product/all", payload);
  };

export const useFetchAllLocations = (
  customPayload?: Partial<typeof defaultPayload>
) => {

  const payload = { ...defaultPayload, ...customPayload };

  return useFetchPostData("pos/location/all", payload);
};


export const useSearchAllProducts = (
  productPayload?: Partial<typeof defaultSearchPayload>,
  enabled = true
) => {
  const payload = { ...defaultSearchPayload, ...productPayload };

  return useQuery({
    queryKey: ["pos/product/search-product", payload],
    queryFn: async () => {
      const response = await axiosInstance.post(
        baseUrl + "pos/product/search-product",
        payload
      );
      return response.data;
    },
    enabled,
  });
};
export const useSearchAllCustomers = (
  productPayload: Partial<SearchPayload> = {},
  enabled = true
) => {
  const payload = { ...defaultSearchPayload, ...productPayload };

  return useQuery({
    queryKey: ["pos/product/search-product", payload],
    queryFn: async () => {
      const response = await axiosInstance.post(
        baseUrl + "pos/customer/search-customer",
        payload
      );
      return response.data.data; 
    },
    enabled,
  });
};

export const useSingleProduct = (productId?: string) => {
  return useGetData(`pos/product/show-product/${productId}`, {}, !!productId);
};

export const useEditProduct = (productId?: string) => {
  return useGetData(`pos/product/edit-product/${productId}`, {}, !!productId);
};

export const useUpdateProduct = (productId?: string) => {
  return usePutData(`pos/product/update-product/${productId}`);
};

export const useDeleteProuct = (productId: number | string) => {
  return useDeleteData(`pos/product/delete-product/${productId}`);
};

export const useSearchLocationProducts = (
  productPayload?: Partial<typeof defaultSearchPayload>,
  enabled = true
) => {
  const payload = { ...defaultSearchPayload, ...productPayload };

  return useQuery({
    queryKey: ["pos/product/product-search", payload],
    queryFn: async () => {
      const response = await axiosInstance.post(
        baseUrl + "pos/product/product-search",
        payload
      );
      return response.data;
    },
    enabled,
  });
};

export const useScanProduct = () => {
  return usePostData("pos/product/scan-product");
};

export const useDownloadProductTemplate = (type: string = "variant") => {
  return useGetExportData(`pos/product/download-import-template?type=${type}`);
};