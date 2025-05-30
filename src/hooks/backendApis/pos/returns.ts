import { useMutation } from "@tanstack/react-query";
import { defaultPayload } from "../../../types";
import {  useFetchPostData, useGetData, useGetDataWithNoQuery, usePostData  } from "../../useApis";
import { axiosInstance, baseUrl } from "../../../utils/axios-instance";

type ResolveComplaintArgs = {
  returnID: string;
  payload: {
    status: string;
    refund_type?: string;
    // Add more fields if needed
  };
};


export const useLogComplain = () => {
  return usePostData("pos/returns/log-complaint");
};

export const useFetchAllOrders = (customerID: string) => {
  return useGetDataWithNoQuery(`pos/returns/completed-sales-order/${customerID}`);
};

export const useFetchOrdersByCustomer = (customerID?: string) => {
  return useGetData(`pos/returns/all-orders/${customerID}`,
    {}, 
  );
};

export const useFetchAllreturns = (
  returnPayload?: Partial<typeof defaultPayload>
) => {

  const payload = { ...defaultPayload, ...returnPayload };

  return useFetchPostData("pos/returns/all", payload);
};

export const useFetchSaleOrderById = (orderID: string) => {
  return useGetData(`pos/sales/show-sale-order/${orderID}`);
};

export const useSendMail = () => {
  return usePostData("pos/returns/send-mail");
};

// export const useResolveComplaint = (returnID: string) => {
//   return usePostData(`pos/returns/take-action/${returnID}`);
// }

export const useResolveComplaint = () => {
  return useMutation({
    mutationFn: async ({ returnID, payload }: ResolveComplaintArgs) => {
      const response = await axiosInstance.post(
        `${baseUrl}pos/returns/take-action/${returnID}`,
        payload
      );
      return response.data;
    },
  });
};