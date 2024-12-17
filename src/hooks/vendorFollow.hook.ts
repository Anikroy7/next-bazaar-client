import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  crateVendorFollow,
  isVendorFollow,
  removeVendorFollow,
} from "../services/vendorFollow.service";

export const useCreateVendorFollow = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_VENDOR_FOLLOW"],
    mutationFn: async (userData) => {
      return await crateVendorFollow(userData);
    },
    onSuccess: (data) => {
      if (data) {
        toast.success(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useIsVendorFollow = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["IS_VENDOR_FOLLOW"],
    mutationFn: async (userData) => {
      return await isVendorFollow(userData);
    },
    onSuccess: (data) => {
      if (data) {
        toast.success(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useRemoveVendorFollow = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["REMOVE_VENDOR_FOLLOW"],
    mutationFn: async (userData) => {
      return await removeVendorFollow(userData);
    },
    onSuccess: (data) => {
      if (data) {
        toast.success(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
