import { useGetData } from "../../useApis";
import { defaultDiscountPayload, defaultPayload2 } from "../../../types";


// export const useFetchAuditTrails = () => {
//     return useGetData(`admin/audittrail/all`);
//   };  
export const useFetchAuditTrails = (customPayload?: Partial<typeof defaultPayload2>) => {
    const defaultPayload2 = {
      search: "",
      sort_by: "",
      per_page: "500",
      paginate: true,
    };
    const payload = { ...defaultPayload2, ...customPayload };

    return useGetData(`admin/audittrail/all`, payload);
  };
// export const useFetchAuditTrails = (queryParams: Record<string, any>) => {
//     const queryString = new URLSearchParams(queryParams).toString();
//     return useGetData(`admin/audittrail/all?${queryString}`);
//   };

  export const useFetchSingleAudit = (Id: number | string) => {
    return useGetData(`admin/audittrail/show/${Id}`);
  }