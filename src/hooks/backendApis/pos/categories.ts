import { useDeleteData, useFetchPostData, useGetData, usePostData } from "../../useApis";

const defaultPayload = {
  search: "",
  sort_by: "",
  start_date: "",
  end_date: "",
  date_range: "",
  per_page: "",
  paginate: true,
};
export const useCreateCategory = () => {
  return usePostData("pos/category/add-category");
};

// export const useFetchCategories = () => {
//   return useGetData("pos/category/show-category/1");
// };


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

// export const useFetchSubCategories = () => {
//   return useGetData("pos/subcategory/show-subcategory/2");
// };

// export const useUpdateCategories = () => {
//   return useGetData("pos/category/update-category/1");
// };

export const useCreateSubCategory = () => {
  return usePostData("pos/subcategory/add-subcategory");
};

export const useFetchSubCatOfCat = (categoryId: number | string) => {
  return useGetData(`pos/category/${categoryId}/subcategories`);
};

export const useDeleteSubCategory = (subCategoryId: number | string) => {
  return useDeleteData(`pos/subcategory/delete-subcategory/${subCategoryId}`);
};
