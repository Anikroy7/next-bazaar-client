import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { allCustomerInfo, allVendorInfo, createVendor, getSingleVendor, loggedUserInfo, registerUser, updateRole, updateSingleUser, updateStatus, updateVendor, vendorBlacklist } from "../services/user.service";
import { toast } from "sonner";
import { queryClient } from "../libs/providers";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => {
      return await registerUser(userData)
    },
    onSuccess: (data) => {
      if (data) {
        toast.success(data.message)
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

};

export const useCreateVendor = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["VENDOR_REGISTRATION"],
    mutationFn: async (userData) => {
      return await createVendor(userData)
    },
    onSuccess: (data) => {
      if (data) {
        toast.success(data.message)
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

};

export const useGetLoogedUserInfo = () => {

  return useQuery({
    queryKey: ["GET_LOGGED_USER_INFO"],
    queryFn: async () => {
      const response = await loggedUserInfo()
      return response
    },
  });
}
export const useAllCustomerInfo = () => {

  return useQuery({
    queryKey: ["GET_ALL_CUSTOMER_INFO"],
    queryFn: async () => {
      const response = await allCustomerInfo()
      return response
    },
  });
}
export const useAllVendorInfo = () => {

  return useQuery({
    queryKey: ["GET_ALL_VENDOR_INFO"],
    queryFn: async () => {
      const response = await allVendorInfo()
      return response
    },
  });
}


export const useUpdateSingleUser = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async (userData) => {
      return await updateSingleUser(userData)
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["GET_LOGGED_USER_INFO"] });

        toast.success(data.message)
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

};
export const useUpdateVendor = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_VENDOR"],
    mutationFn: async (userData) => {
      return await updateVendor(userData)
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["GET_LOGGED_USER_INFO"] });

        toast.success(data.message)
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

};
export const useUpdateStatus = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_STATUS"],
    mutationFn: async (data) => {
      const { userData, id } = data
      return await updateStatus(id, userData)
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["GET_ALL_CUSTOMER_INFO"] });
        // queryClient.invalidateQueries({ queryKey: ["GET_ALL_VENDOR_INFO"] });

        toast.success(data.message)
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

};
export const useUpdateRole = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_ROLE"],
    mutationFn: async (data) => {
      const { userData, id } = data

      return await updateRole(id, userData)
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["GET_ALL_CUSTOMER_INFO"] });

        toast.success(data.message)
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

};
export const useVendorBlacklist = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_ROLE"],
    mutationFn: async (data) => {
      const { id, userData } = data

      return await vendorBlacklist(id, userData)
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["GET_ALL_VENDOR_INFOj"] });

        toast.success(data.message)
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

};


export const useGetSingleVendor = (id: string) => {

  return useQuery({
    queryKey: ["GET_SINGLE_VENDOR"],
    queryFn: async () => {
      const response = await getSingleVendor(id)
      return response
    },
  });
}


