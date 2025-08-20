import { useMutation } from "@tanstack/react-query";
import { axiosInstance, baseUrl } from "../utils/axios-instance";

export const useGenerateReportExport = () => {
    return useMutation({
      mutationFn: async ({ payload, fileType }: { payload: any; fileType: string }) => {
        const response = await axiosInstance.post(
          `${baseUrl}pos/reports/report/export?type=${fileType}`,
          payload,
          { responseType: "blob" }
        );
        return response.data; // blob
      },
    });
  };