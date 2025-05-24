import { useFetchPostData } from "../../useApis";

const defaultPayload = {
  search: "",
  sort_by: "",
  start_date: "",
  end_date: "",
  date_range: "",
  per_page: "",
  paginate: true,
};


export const useFetchAllCustomers = (
  productPayload?: Partial<typeof defaultPayload>
) => {

  const payload = { ...defaultPayload, ...productPayload };

  return useFetchPostData("pos/customer/all", payload);
};