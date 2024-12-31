import { useMutation, useQuery } from "@tanstack/react-query";
import { createCupon, deleteCupon, getAllCupons, updateCupon } from "../services/cupon.service";
import { FieldValues } from "react-hook-form";
import { queryClient } from "../libs/providers";
import { toast } from "sonner";

export const useCreateCupon = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_CUPON"],
    mutationFn: async (data) => {
      return await createCupon(data);
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["GET_ALL_CUPONS"] });
        toast.success(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};


export const useGetAllCupons = () => {
  return useQuery({
    queryKey: ["GET_ALL_CUPONS"],
    queryFn: async () => {
      const response = await getAllCupons();
      return response;
    },
  });
};


export const useDeleteCupon = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["DELETE_CUPON"],
    mutationFn: async ({ id }) => {
      return await deleteCupon(id);
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["GET_ALL_CUPONS"] });

        toast.success(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};


export const useUpdateCupon = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_CUPON"],
    mutationFn: async (data) => {
      
      const { id, cuponData } = data
      return await updateCupon(id, cuponData);
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["GET_ALL_CUPONS"] });
        toast.success(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};