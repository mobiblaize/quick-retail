import { useFetchPostData, usePutData } from "../../useApis";

const defaultPayload = {
  search: "",
  sort_by: "",
  start_date: "",
  end_date: "",
  date_range: "",
  per_page: "",
  paginate: true,
};


export const useFetchAllProducts = (
  productPayload?: Partial<typeof defaultPayload>
) => {

  const payload = { ...defaultPayload, ...productPayload };

  return useFetchPostData("pos/product/all", payload);
};

// export const useActivateInventory   = (inventoryId: number | string) => {
//   return usePutData(`pos/product/update-inventory/${inventoryId}`);
// };

export const useActivateInventory = (
    inventoryId: number | string,
) => {
  return usePutData(`pos/product/update-inventory/${inventoryId}`);
};