import { useGetData } from "../../useApis";

// export const useFetchAuditTrails = () => {
//     return useGetData(`admin/audittrail/all`);
//   };  

export const useFetchAuditTrails = (queryParams: Record<string, any>) => {
    const queryString = new URLSearchParams(queryParams).toString();
    return useGetData(`admin/audittrail/all?${queryString}`);
  };

  export const useFetchSingleAudit = (Id: number | string) => {
    return useGetData(`admin/audittrail/show/${Id}`);
  }