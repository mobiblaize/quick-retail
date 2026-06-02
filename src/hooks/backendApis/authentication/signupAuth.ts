import { useGetData, usePostData } from "../../useApis";


export const useFetchTrialSubscriptions = (enabled: boolean = true) => {
  return useGetData(
    "applications/allSubscription",
    { billing_type: "trial" },
    enabled
  );
};

export const useSignUpUser = () => {
  return usePostData("auth/onboarding/register");
};

export const useFetchCompanySize = () => {
  return useGetData(`applications/company-sizes`);
}

export const useFetchPaymentSummary = () => {
  return usePostData(`subscribe/payment-summary`);
};

export const useOnboardingPaymentSummary = () => {
  return usePostData(`auth/onboarding/payment-summary`);
};

export const useVerifyPayment = () => {
  return usePostData(`auth/onboarding/verify-payment`);
};
