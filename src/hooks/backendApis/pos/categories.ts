import { defaultPayload } from "../../../types";
import { useDeleteData, useFetchPostData, useGetData, usePostData, usePutData } from "../../useApis";


export const useCreateCategory = () => {
  return usePostData("pos/category/add-category");
};


export const useFetchAllCategories = (customPayload?: Partial<typeof defaultPayload>) => {
  const defaultPayload = {
    search: "",
    sort_by: "",
    start_date: "",
    end_date: "",
    date_range: "",
    per_page: "",
    paginate: true,
  };

  const payload = { ...defaultPayload, ...customPayload };

  return useFetchPostData("pos/category/all", payload);
};

export const useFetchAllSubCategories = (customPayload?: Partial<typeof defaultPayload>) => {
  const defaultPayload = {
    search: "",
    sort_by: "",
    start_date: "",
    end_date: "",
    date_range: "",
    per_page: "",
    paginate: true,
  };

  const payload = { ...defaultPayload, ...customPayload };

  return useFetchPostData("pos/subcategory/all", payload);
};


export const useUpdateCategories  = (categoryId: number | string) => {
  return usePutData(`pos/category/update-category/${categoryId}`);
};
export const useUpdateSubCategories   = (subCategoryId: number | string) => {
  return usePutData(`pos/subcategory/update-subcategory/${subCategoryId}`);
};

export const useCreateSubCategory = () => {
  return usePostData("pos/subcategory/add-subcategory");
};

export const useFetchSubCatOfCat = (categoryId: number | string) => {
  return useGetData(`pos/category/${categoryId}/subcategories`);
};

export const useDeleteSubCategory = (subCategoryId: number | string) => {
  return useDeleteData(`pos/subcategory/delete-subcategory/${subCategoryId}`);
};
export const useActivateCategories   = (categoryId: number | string) => {
  return usePutData(`pos/category/activate-category/${categoryId}`);
};
export const useDeactivateCategories   = (categoryId: number | string) => {
  return usePutData(`pos/category/deactivate-category/${categoryId}`);
};