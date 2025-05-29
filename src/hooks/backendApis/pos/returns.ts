import { defaultPayload } from "../../../types";
import {  useFetchPostData, useGetData, usePostData  } from "../../useApis";


export const useLogComplain = () => {
  return usePostData("pos/returns/log-complaint");
};

export const useFetchAllCustomers = (customerID: string) => {
  return useGetData(`pos/returns/completed-sales-order/${customerID}`);
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