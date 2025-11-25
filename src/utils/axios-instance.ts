import axios from "axios";

import { notifications } from "@mantine/notifications";
import { clearUser } from "../hooks/useCustomSession";

export const baseUrl =
  import.meta.env.VITE_BACKEND_BASE_ENDPOINT ||
  "https://api-quick-retail.sbscuk.co.uk/public/api/v1/";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json" },
});

const attachToken = (config: any) => {
  const token = sessionStorage.getItem("access_token");
  const tenantId = sessionStorage.getItem("tenant_uuid");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (tenantId) {
    config.headers["X-Tenant-ID"] = tenantId;
  }
  return config;
};

let isShowingError = false;
const errorResetTimeout = 10000;

const handleError = (error: any) => {
  if (!error.response) {
    return Promise.reject(new Error("Network error or server is unreachable."));
  }

  const { status, data } = error.response;
  const messages: Record<number, string> = {
    400: "Bad Request: Please check your input.",
    401: "Unauthorized: Please log in again.",
    403: "Forbidden: You do not have access to this resource.",
    404: "Not Found: The resource was not found.",
    500: "Internal Server Error: Please try again later.",
  };

  const errorMessage =
    data?.message ||
    messages[status as keyof typeof messages] ||
    "An unexpected error occurred.";

  if (!isShowingError) {
    isShowingError = true;

    notifications.show({
      color: "red",
      message: errorMessage,
    });

    // Reset the flag after timeout
    setTimeout(() => {
      isShowingError = false;
    }, errorResetTimeout);
  }

  if (status === 401) {
    clearUser();
    window.location.replace("/login");
  }

  // CRITICAL: Reject with the original error to preserve response data
  // This maintains backward compatibility while allowing components to access error.response
  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(attachToken, Promise.reject);
axiosInstance.interceptors.response.use((res: any) => res, handleError);

export { axiosInstance };