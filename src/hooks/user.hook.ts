import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { createVendor, loggedUserInfo, registerUser, updateSingleUser } from "../services/user.service";
import { toast } from "sonner";

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


export const useUpdateSingleUser = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => {
      return await updateSingleUser(userData)
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


