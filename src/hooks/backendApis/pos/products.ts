import { useFetchPostData, usePostData } from "../../useApis";

  const defaultPayload = {
    search: "palm city mall",
    sort_by: "",
    per_date: "",
    limit: "",
    paginate: true,
  };

export const useCreateProduct = () => {
  return usePostData("pos/product/add-product");
};

export const getAllProduct = () => {
  return usePostData("pos/product/all");
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
