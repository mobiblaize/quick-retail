import { defaultPayload2, SalesPayload } from "../../../types";
import { useFetchPostData } from "../../useApis";

export const useFetchAllTransactions = (customPayload?: SalesPayload) => {
    const defaultPayload2: SalesPayload = {
      search: "",
      sort_by: "",
      per_page: "500",
      paginate: true,
      start_date: "",
      end_date:"",
    };
  
    const payload = { ...defaultPayload2, ...customPayload };
  
    return useFetchPostData("pos/transactions/all-transactions", payload);
  };