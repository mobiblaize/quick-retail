import { usePostData, usePutData } from "../../useApis";

export const useCreateCustomer = () => {
    return usePostData("pos/customer/add-customer");
  };
  
  export const useUpdateCustomer  = (customerId: number | string) => {
    return usePutData(`pos/customer/update-custome/${customerId}`);
  };