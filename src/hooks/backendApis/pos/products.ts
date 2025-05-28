import { useQuery } from "@tanstack/react-query";
import { axiosInstance, baseUrl } from "../../../utils/axios-instance";
import { useDeleteData, useFetchPostData, usePostData } from "../../useApis";

  const defaultPayload = {
    search: "palm city mall",
    sort_by: "",
    per_date: "",
    limit: "",
    paginate: true,
  };

  const defaultsPayload = {
    search: "",
    sort_by: "",
   location_name: "",
    category_name: "",
    price_from: "",
    price_to: "",
    date_range: "",
    per_page: "",
    paginate: true,
  };
  const defaultSearchPayload = {
    search: "",
   
  };
  interface SearchPayload {
    search: string;
    [key: string]: any;
  }

export const useCreateProduct = () => {
  return usePostData("pos/product/add-product");
};

export const useFetchAllProducts = (
  productPayload?: Partial<typeof defaultsPayload>
) => {

  const payload = { ...defaultsPayload, ...productPayload };

  return useFetchPostData("pos/product/all", payload);
};

export const getAllLocation = () => {
  return usePostData("");
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

export const useDeleteProuct = (variationID: number | string) => {
  return useDeleteData(`pos/product/delete-product/${variationID}`);
};