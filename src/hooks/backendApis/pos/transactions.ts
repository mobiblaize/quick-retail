import { defaultPayload2 } from "../../../types";
import { useFetchPostData } from "../../useApis";

export const useFetchAllTransactions = (customPayload?: Partial<typeof defaultPayload2>) => {
    const defaultPayload2 = {
      search: "",
      sort_by: "",
      per_page: "",
      paginate: true,
    };
  
    const payload = { ...defaultPayload2, ...customPayload };
  
    return useFetchPostData("pos/transactions/all-transactions", payload);
  };