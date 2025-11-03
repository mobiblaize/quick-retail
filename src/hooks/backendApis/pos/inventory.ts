import { useFetchPostData, usePutData, useGetData } from "../../useApis";

const defaultPayload = {
  search: "",
  sort_by: "",
  start_date: "",
  end_date: "",
  date_range: "",
  location_name: "",
  price_from: "",
  price_to: "",
  order_status: "",
  per_page: "",
  paginate: true,
};

export const useFetchAllProducts = (
  productPayload?: Partial<typeof defaultPayload>
) => {
  const payload = { ...defaultPayload, ...productPayload };

  return useFetchPostData("pos/product/all", payload);
};

export const useFetchProductById = (productId: string | undefined) => {
  return useGetData(
    `pos/product/show-product/${productId}`,
    undefined,
    !!productId
  );
};

// export const useActivateInventory   = (inventoryId: number | string) => {
//   return usePutData(`pos/product/update-inventory/${inventoryId}`);
// };

export const useActivateInventory = (
    inventoryId: number | string,
) => {
  return usePutData(`pos/product/update-inventory/${inventoryId}`);
};