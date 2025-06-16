import { useGetData, usePostData } from "../../useApis";


export const useFetchTrialSubscriptions = (enabled: boolean = true) => {
  return useGetData(
    "applications/allSubscription",
    { billing_type: "trial" },
    enabled
  );
};

export const useSignUpUser = () => {
  return usePostData("auth/signup/register");
};

export const useFetchCompanySize = () => {
  return useGetData(`applications/company-sizes`);
}
