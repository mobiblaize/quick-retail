import {
  useFetchPostData,
  useGetData,
  usePostData,
  usePutData,
} from "../../useApis";

export const useCreateStore = () => {
  return usePostData("pos/location/add-location");
};

export const useFetchStore = (
  customPayload?: Partial<typeof defaultPayload>
) => {
  const defaultPayload = {
    search: "",
    sort_by: "",
    per_page: "",
    paginate: true,
    start_date: "",
    end_date: "",
  };

  const payload = { ...defaultPayload, ...customPayload };

  return useFetchPostData("pos/location/all", payload);
};

export const useFetchAllStore = () => {
  return useGetData("pos/location/stores");
};

export const useFetchAllSellingUnits = () => {
  return useGetData("pos/selling-unit/all");
};

export const useFetchStat = () => {
  return useGetData(`pos/location/stats`);
};

const defaultPayload = {
  search: "",
  sort_by: "",
  start_date: "",
  end_date: "",
  date_range: "",
  per_page: "500",
  paginate: true,
};

export const useSinglestoreOverview = (
  locationId: string,
  customPayload?: Partial<typeof defaultPayload>
) => {
  const payload = { ...defaultPayload, ...customPayload };

  return useFetchPostData(
    `pos/location/single-location-overview/${locationId}`,
    payload
  );
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
  return useFetchPostData(
    `pos/location/single-location-stat/${locationId}`,
    payload
  );
};

export const useStoreOrders = (
  locationId?: string,
  customPayload?: Partial<typeof defaultPayload>
) => {
  if (!locationId) return { data: null, isLoading: false };

  const payload = { ...defaultPayload, ...customPayload };
  return useFetchPostData(
    `pos/location/single-location-overview/${locationId}`,
    payload
  );
};

export const useEditStore = (locationId: string) => {
  return usePutData(`pos/location/update-location/${locationId}`);
};

export const uselocationTarget = () => {
  return usePostData("pos/location/create-location-target");
};

export const useFetchCountries = () => {
  return useGetData("demography/countries");
};

export const useFetchStates = (countryId: string) => {
  return useGetData(`demography/states/${countryId}`, {}, !!countryId);
};

export const useFetchCities = (stateId: string) => {
  return useGetData(`demography/cities/${stateId}`, {}, !!stateId);
};
