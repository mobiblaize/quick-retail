import { useGetData, usePutData } from "../../useApis";

export const useChangePassword = () => {
    return usePutData("profile/password-update");
  }
  
  export const useSecurityQuestion= () => {
    return usePutData("profile/security-question-update");
  }

  export const useAllQuestion= () => {
    return useGetData(`superadmin/question/all`);;
  }