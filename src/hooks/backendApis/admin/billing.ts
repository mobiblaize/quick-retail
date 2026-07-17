import { useMutation } from "@tanstack/react-query";
import { axiosInstance, baseUrl } from "../../../utils/axios-instance";
import {
  useFetchData,
  useGetData,
  // useGetExportData,
  useCreateExportData,
} from "../../useApis";
import { defaultPayload2 } from "../../../types";

export const useFetchBilling = (
  customPayload?: Partial<typeof defaultPayload2>,
) => {
  const payload = {
    date_filter: "",
    start_date: "",
    end_date: "",
    paginate: true,
    page: "1",
    limit: "10",
    transaction_fee_status: "",
  };
  const updatedPayload = { ...payload, ...customPayload };

  return useFetchData(`admin/billing`, updatedPayload);
};

export const useFetchInvoice = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      console.log(
        "useFetchInvoice: Calling endpoint:",
        `${baseUrl}admin/billing/view-invoice/:id`,
      );
      console.log("useFetchInvoice: Sending payload:", { id });
      const response = await axiosInstance.get(
        `admin/billing/view-invoice/${id}`,
      );
      console.log("useFetchInvoice: Response:", response);
      return response.data;
    },
  });
};

export const useFetchBillingShow = (
  tenantId: string | null,
  customPayload?: Partial<typeof defaultPayload2>,
) => {
  const payload = {
    date_filter: "",
    start_date: "",
    end_date: "",
    paginate: true,
    page: "1",
    limit: "10",
    transaction_fee_status: "",
  };
  const updatedPayload = { ...payload, ...customPayload };

  return useGetData(
    `admin/billing/show/${tenantId}`,
    updatedPayload,
    !!tenantId,
  );
};

export const useExportBilling = () => {
  return useCreateExportData(`admin/billing/export`);
};
