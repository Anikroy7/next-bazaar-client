import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { forgotPassword, loginUser, resetPassword } from "../services/auth.service";
import { toast } from 'sonner';


export const useUserLogin = () => {

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => {
      return await loginUser(userData)
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
export const useForgetPassword = () => {

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_FORGET_PASSWORD"],
    mutationFn: async (userData) => {
      return await forgotPassword(userData)
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
export const useResetPassword = () => {

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_RESET_PASSWORD"],
    mutationFn: async (userData) => {
      return await resetPassword(userData)
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

