import { useFetchData, useGetData, useGetExportData } from "../../useApis";
import { defaultPayload2 } from "../../../types";


// export const useFetchAuditTrails = () => {
//     return useGetData(`admin/audittrail/all`);
//   };  
export const useFetchAuditTrails = (customPayload?: Partial<typeof defaultPayload2>) => {
    const payload = {
      search: "",
      sort_by: "",
      per_page: "500",
      paginate: true,
    };
    const updatedPayload = { ...payload, ...customPayload };

    return useFetchData(`admin/audittrail/all`, updatedPayload);
  };

  export const useFetchSingleAudit = (Id: number | string) => {
    return useGetData(`admin/audittrail/show/${Id}`);
  }

  export const useExportAuditTrail = (format: "pdf" | "excel") => {
    return useGetExportData(`admin/audittrail/export?format=${format}`);
  };