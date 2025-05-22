import { useFetchPostData, usePostData } from "../../useApis";

  const defaultPayload = {
    search: "palm city mall",
    sort_by: "",
    per_date: "",
    limit: "",
    paginate: true,
  };

  const defaultsPayload = {
    search: "",
    sort_by: "recent",
   location_name: "ikeja city mall",
    category_name: "",
    price_from: "",
    price_to: "",
    date_range: "",
    per_page: "",
    paginate: true,
  };

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
