/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance, baseUrl } from "../utils/axios-instance";

// Create Data
export const usePostData = (url: string) => {
  const mutation = useMutation({
    mutationFn: async (arg: any) => {
      const response = await axiosInstance.post(baseUrl + url, arg);
      return response.data;
    },
  });

  return mutation;
};

export const usePostDataAttach = (url: string) => {
  const mutation = useMutation({
    mutationFn: async (arg: any) => {
      const isFormData = arg instanceof FormData;
      const response = await axiosInstance.post(baseUrl + url, arg, {
        headers: !isFormData ? { "Content-Type": "application/json" } : undefined,
      });
      return response.data;
    },
  });

  return mutation;
};


export const useCreateExportData = (url: string) => {
  const mutation = useMutation({
    mutationFn: async (arg: any) => {
      const response = await axiosInstance.post(baseUrl + url, arg, {
        responseType: "blob",
      });
      return response.data;
    },
  });

  return mutation;
};

// Get Export Data
export const useGetExportData = (url: string) => {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.get(baseUrl + url, {
        responseType: "blob",
      });
      return response.data;
    },
  });

  return mutation;
};

// Upload Data
export const useUploadData = (url: string) => {
  const mutation = useMutation({
    mutationFn: async (arg: any) => {
      const response = await axiosInstance.post(baseUrl + url, arg, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      // Check if response indicates an error
      if (response.data?.error === true) {
        throw {
          response: {
            data: response.data
          }
        };
      }
      
      return response.data;
    },
  });

  return mutation;
};

// Logout
export const useLogout = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.get(baseUrl + "auth/logout");
      return response.data;
    },
  });

  return mutation;
};

// Update (PUT) Data
// export const usePutData = (url: string) => {
//   const mutation = useMutation({
//     mutationFn: async (arg: any) => {
//       const response = await axiosInstance.put(baseUrl + url, arg);
//       return response.data;
//     },
//   });

//   return mutation;
// };
export const usePutData = (url: string) => {
  const mutation = useMutation({
    mutationFn: async (arg?: any) => {
      const response = await axiosInstance.put(baseUrl + url, arg);
      // Make sure we treat this as success if error is false
      if (response.data?.error) {
        throw new Error(response.data.message || "Failed request");
      }
      return response.data;
    },
  });

  return mutation;
};


// Update (PATCH) Data
export const usePatchData = (url: string) => {
  const mutation = useMutation({
    mutationFn: async (arg: any) => {
      const response = await axiosInstance.patch(baseUrl + url, arg);
      return response.data;
    },
  });

  return mutation;
};

// Delete Data
export const useDeleteData = (url: string) => {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(baseUrl + url);
      return response.data;
    },
  });

  return mutation;
};

// Get Data (Single Fetch)
export const useGetDataWithNoQuery = (url: string) => {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.get(baseUrl + url);
      return response.data;
    },
  });

  return mutation;
};

// Fetch Data (GET with Query)
export const useGetData = (url: string, options?: any, enabled?: boolean, staleTime= 300) => {
  const query = useQuery({
    queryKey: [url, options],
    queryFn: async () => {
      const response = await axiosInstance.get(baseUrl + url, {
        params: options,
      });
      return response.data;
    },
    staleTime: staleTime * 1000, // Cache data for 5 minutes
    refetchOnWindowFocus: false,
    enabled: enabled,

    
  });

  return {
    ...query,
    // Use isPending for React Query v5 (replaces isLoading)
    // isPending is true when query has no data and is currently fetching
    isLoading: query.isPending,
  };
};

// Fetch Data (GET with Query)
export const useFetchData = (url: string, options?: any) => {
  const query = useQuery({
    queryKey: [url, options],
    queryFn: async () => {
      const response = await axiosInstance.get(baseUrl + url, {
        params: options,
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
    // Use isPending for React Query v5 (replaces isLoading)
    isLoading: query.isPending,
  };
};

// Fetch Post Data (POST with Query)
export const useFetchPostData = (url: string, options: any) => {
  const query = useQuery({
    queryKey: [url, options],
    queryFn: async () => {
      const response = await axiosInstance.post(baseUrl + url, options);
      return response.data;
    },
  });

  return {
    ...query,
    // Use isPending for React Query v5 (replaces isLoading)
    isLoading: query.isPending,
  };
};

export const useLazyGetData = (url: string) => {
  return useMutation({
    mutationFn: async (params?: Record<string, any>) => {
      const response = await axiosInstance.get(baseUrl + url, {
        params,
      });
      return response.data;
    },
  });
};


export const useToggleRoleStatus = () => {
  return useMutation({
    mutationFn: async (roleId: number) => {
      const response = await axiosInstance.put(
        `${baseUrl}admin/roles/toggle-status/${roleId}`
      );
      return response.data;
    },
  });
};

