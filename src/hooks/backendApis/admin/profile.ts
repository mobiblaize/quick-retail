
import {  useQueryClient } from "@tanstack/react-query";
import axios from "axios";
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
        queryKey: ['verify-payment', reference],
        queryFn: async () => {
          const res = await axios.get(`/profile/verify-payment?reference=${reference}`);
          return res.data;
        },
      });
      return res;
    };
  
    return verify; // ✅ this returns a function
  };
  
  