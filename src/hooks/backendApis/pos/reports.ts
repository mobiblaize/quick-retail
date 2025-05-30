import { useCreateExportData, usePostData } from "../../useApis";

export const useGenerateReport = () => {
    return usePostData("pos/reports/report/generate");
  };

  export const useGenerateReportExport = () => {
    return useCreateExportData("pos/reports/report/export");
  };
