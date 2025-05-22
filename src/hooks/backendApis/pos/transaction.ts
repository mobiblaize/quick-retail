import { defaultPayload } from "../../../types";
import { useFetchPostData } from "../../useApis";

export const useFetchAllTransactions = (customPayload?: Partial<typeof defaultPayload>) => {
    const defaultPayload = {
      search: "",
      sort_by: "",
      start_date: "",
      end_date: "",
      date_range: "",
      per_page: "",
      paginate: true,
    };
  
    const payload = { ...defaultPayload, ...customPayload };
  
    return useFetchPostData("pos/transactions/all-transactions", payload);
  };
  