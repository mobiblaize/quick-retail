import { usePostData } from "../../useApis";

export const useCreateCustomer = () => {
    return usePostData("pos/customer/add-customer");
  };
  