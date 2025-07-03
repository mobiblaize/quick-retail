import { useGetData } from "../../useApis";

export const useFetchAuditTrails = () => {
    return useGetData(`admin/audittrail/all`);
  };  

  export const useFetchSingleAudit = (Id: number | string) => {
    return useGetData(`admin/audittrail/show/${Id}`);
  }