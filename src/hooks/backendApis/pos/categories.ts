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

export const useFetchSubCatOfCat = (categoryId: number | string,  enabled: boolean = true) => {
  return useGetData(`pos/category/${categoryId}/subcategories`, {}, enabled);
};

export const useDeleteSubCategory = (subCategoryId: number | string) => {
  return useDeleteData(`pos/subcategory/delete-subcategory/${subCategoryId}`);
};
export const useActivateCategories   = (subCategoryId: number | string) => {
  return usePutData(`pos/subcategory/activate-subcategory/${subCategoryId}`);
};
export const useDeactivateCategories   = (subCategoryId: number | string) => {
  return usePutData(`pos/subcategory/deactivate-subcategory/${subCategoryId}`);
};

export const useFetchSubCategory = (subCategoryId: number | string, enabled: boolean) => {
  return useGetData(`pos/subcategory/show-subcategory/${subCategoryId}`, enabled);
};


// import { defaultPayload } from "../../../types";
// import { useDeleteData, useFetchPostData, useGetData, useLazyGetData, usePostData, usePutData } from "../../useApis";


// export const useCreateCategory = () => {
//   return usePostData("pos/category/add-category");
// };


// export const useFetchAllCategories = (customPayload?: Partial<typeof defaultPayload>) => {
//   const defaultPayload = {
//     search: "",
//     sort_by: "",
//     start_date: "",
//     end_date: "",
//     date_range: "",
//     per_page: "",
//     paginate: true,
//   };

//   const payload = { ...defaultPayload, ...customPayload };

//   return useFetchPostData("pos/category/all", payload);
// };

// export const useFetchAllSubCategories = (customPayload?: Partial<typeof defaultPayload>) => {
//   const defaultPayload = {
//     search: "",
//     sort_by: "",
//     start_date: "",
//     end_date: "",
//     date_range: "",
//     per_page: "",
//     paginate: true,
//   };

//   const payload = { ...defaultPayload, ...customPayload };

//   return useFetchPostData("pos/subcategory/all", payload);
// };


// export const useUpdateCategories  = (categoryId: number | string) => {
//   return usePutData(`pos/category/update-category/${categoryId}`);
// };
// export const useUpdateSubCategories   = (subCategoryId: number | string) => {
//   return usePutData(`pos/subcategory/update-subcategory/${subCategoryId}`);
// };

// export const useCreateSubCategory = () => {
//   return usePostData("pos/subcategory/add-subcategory");
// };

// // export const useFetchSubCatOfCat = (categoryId: number | string) => {
// //   return useGetData(pos/category/${categoryId}/subcategories);
// // };

// export const useFetchSubCatOfCatNew = (categoryId: number | string | undefined) => {
//   return useLazyGetData("pos/category/${categoryId}/subcategories");
// };

// export const useFetchSubCatOfCat = (
//   categoryId: number | string | undefined,
//   options?: { enabled?: boolean }
// ) => {
//   return useGetData(
//     "pos/category/${categoryId}/subcategories",
//     options
//   );
// };


// export const useDeleteSubCategory = (subCategoryId: number | string) => {
//   return useDeleteData(`pos/subcategory/delete-subcategory/${subCategoryId}`);
// };
// export const useActivateCategories   = (subCategoryId: number | string) => {
//   return usePutData(`pos/subcategory/activate-subcategory/${subCategoryId}`);
// };
// export const useDeactivateCategories   = (subCategoryId: number | string) => {
//   return usePutData(`pos/subcategory/deactivate-subcategory/${subCategoryId}`);
// };

// export const useFetchSubCategory = (subCategoryId: number | string) => {
//   return useGetData(`pos/subcategory/show-subcategory/${subCategoryId}`);
// };