import { useMutation } from "@tanstack/react-query";
import { useFetchPostData, useGetData, usePostData } from "../../useApis";
import { axiosInstance, baseUrl } from "../../../utils/axios-instance";


  const defaultPayload = {
    search: "",
    sort_by: "",
    per_date: "",
    limit: "",
    paginate: false,
  };

export const useFetchUsers = (queryParams: Record<string, any> = {}) => {
  const queryString = new URLSearchParams(queryParams).toString();
  return useGetData(`admin/staff/all${queryString ? `?${queryString}` : ""}`);
};

export const useCreateUser = () => {
  return usePostData("admin/staff/add-staff");
};

export const useFetchAllRoles = (
  customPayload?: Partial<typeof defaultPayload>
) => {

  const payload = { ...defaultPayload, ...customPayload };

  return useFetchPostData("admin/roles/all-roles", payload);
};


export const useFetchSingleUser = (userUUID: string) => {
  return useGetData(`admin/staff/show-staff/${userUUID}`, undefined, !!userUUID);
};

export const useActivateUser = (userUUID: string) => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.put(`${baseUrl}admin/staff/activate-staff/${userUUID}`);
      return response.data;
    },
  });
};

export const useDeactivateUser = (userUUID: string) => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.put(`${baseUrl}admin/staff/deactivate-staff/${userUUID}`);
      return response.data;
    },
  });
};


export const useUpdateUser = (userUUID: string) => {
  return useMutation({
    mutationFn: async (arg: any) => {
      const response = await axiosInstance.put(
        `${baseUrl}admin/staff/update-staff/${userUUID}`,
        arg
      );
      return response.data;
    },
  });
};

export const useFetchAllPermissions = () => {
  return useGetData("admin/permission/all");
};

export const useCreateRole = () => {
  return useMutation({
    mutationFn: async (payload: {
      name: string;
      display_name: string;
      description: string;
      assign_all_permissions: boolean;
      permissions: number[];
    }) => {
      const response = await axiosInstance.post(`${baseUrl}admin/roles/add-role`, payload);
      return response.data;
    },
  });
};
