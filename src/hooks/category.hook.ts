import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { deleteCategory, getALlCategories } from "../services/category.service";
import { createCategories } from "../services/categories.service";
import { queryClient } from "../libs/providers";

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["GET_ALL_CATEGORIES"],
    queryFn: async () => {
      const response = await getALlCategories();

      return response;
    },
  });
};

export const useCreateCategory = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_CATEGORY"],
    mutationFn: async (userData) => {
      return await createCategories(userData);
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

export const useDelteCategory = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["DELETE_PRODUCT"],
    mutationFn: async ({ id }) => {
      return await deleteCategory(id);
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["GET_ALL_CATEGORIES"] });
        toast.success(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
