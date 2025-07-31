import { useGetData, usePutData } from "../../useApis";

export const useChangePassword = () => {
  return usePutData("profile/password-update");
}

export const useSecurityQuestion = () => {
  return usePutData("profile/security-question-update");
}

export const useAllQuestion = () => {
  return useGetData(`superadmin/question/all`);;
}

export const useNotifications = () => {
  const query = useGetData("notifications/all");

  return {
    ...query,
    data: Array.isArray(query.data?.data) ? query.data.data : [], 
  };
};

export const useMarkAllNotificationsAsRead = () => {
  return usePutData("notifications/mark-all-read");
};