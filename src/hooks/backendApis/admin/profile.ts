
import {  useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../utils/axios-instance";
import { useGetData, usePostData, usePutData } from "../../useApis";

export interface ApplicationPayload {
    subscription_id: string;
    application_id: string;
    amount: string;
    additional_seat: string;
  }
  
  export interface RenewSubscriptionPayload {
    billing_type: "monthly" | "yearly";
    paystack_complete_callback: string;
    applications: ApplicationPayload[];
  }
  

  export const useFetchProfile = () => {
    return useGetData(`profile/about-me`);
  };  

  export const useFetchPhoto = () => {
    return usePutData(`profile/change-profile-image`);
  };  

  export const useFetchCurrentSub = () => {
    return useGetData(`profile/current-subscription`);
  };  

  export const useFetchAllSub = () => {
    return useGetData(`profile/subscriptions`);
  };  

  export const useFetchCancelSub = () => {
    return usePutData(`profile/cancel-subscription`);
  }; 

export const useSubmitSubscription = () => {
    return usePostData("profile/renew-subscription");
  };
  
  export const useFetchVerifyPayment = () => {
    const queryClient = useQueryClient();
  
    const verify = async (reference: string) => {
      const res = await queryClient.fetchQuery({
        queryKey: ["verify-payment", reference],
        queryFn: async () => {
          const response = await axiosInstance.get("/profile/verify-payment", {
            params: { reference },
          });
          return response.data;
        },
      });
  
      return res;
    };
  
    return verify;
  };
  
  // export const useFetchVerifyPayment = () => {
  //   const queryClient = useQueryClient();
  
  //   const verify = async (reference: string) => {
  //     return await queryClient.fetchQuery({
  //       queryKey: ["verify-payment", reference],
  //       queryFn: async () => {
  //         const { data } = await axios.get(
  //           `/profile/verify-payment?reference=${reference}`
  //         );
  //         return data;
  //       },
  //     });
  //   };
  
  //   return { verifyPayment: verify };
  // };
  // export const useFetchVerifyPayment = () => {
  //   return useMutation((ref: string) => api.verifyPayment(ref));
  // };
  