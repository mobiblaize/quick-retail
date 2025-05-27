
import { defaultPayload2 } from "../../../types";
import { useFetchPostData, useGetData, usePostData, usePutData, } from "../../useApis";


export const useCreateStore = () => {
  return usePostData("pos/location/add-location");
};

export const useFetchStore = (customPayload?: Partial<typeof defaultPayload2>) => {
  const defaultPayload2 = {
    search: "",
    sort_by: "",
    per_page: "",
    paginate: true,
  };

  const payload = { ...defaultPayload2, ...customPayload };

  return useFetchPostData("pos/location/all", payload);
};

export const useFetchStat = () => {
  return useGetData(`pos/location/stats`);
}

const defaultPayload = {
  search: "",
  sort_by: "",
  start_date: "",
  end_date: "",
  date_range: "",
  per_page: "",
  paginate: true,
};

export const useSinglestoreOverview = (locationId: string, customPayload?: Partial<typeof defaultPayload>) => {
  const payload = { ...defaultPayload, ...customPayload };

  return useFetchPostData(`pos/location/single-location-overview/${locationId}`, payload);
};


export const useToggleStore = (locationId: string) => {
  return usePutData(`pos/location/toggle-status/${locationId}`);
};

export const useSingleStoreStat = (
  locationId?: string,
  customPayload?: Partial<typeof defaultPayload>
) => {
  if (!locationId) return { data: null, isLoading: false };

  const payload = { ...defaultPayload, ...customPayload };
  return useFetchPostData(`pos/location/single-location-stat/${locationId}`, payload);
};

export const useStoreOrders = (
  locationId?: string,
  customPayload?: Partial<typeof defaultPayload>
) => {
  if (!locationId) return { data: null, isLoading: false };

  const payload = { ...defaultPayload, ...customPayload };
  return useFetchPostData(`pos/location/single-location-overview/${locationId}`, payload);
};

export const useEditStore = (locationId: string) => {
  return usePutData(`pos/location/update-location/${locationId}`);
};

export const uselocationTarget = () => {
  return usePostData("pos/location/create-location-target");
};
