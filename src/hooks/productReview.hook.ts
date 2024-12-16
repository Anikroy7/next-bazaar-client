import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { createProductReview, deleteProductReviews, getALLProductReviews, getProductReviews } from "../services/productReview.service";
import { toast } from "sonner";
import { queryClient } from "../libs/providers";

export const useCreateProductReview = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_PRODUCT_REVIEW"],
    mutationFn: async (prData) => {
      return await createProductReview(prData);
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["GET_PRODUCT_REVIEWS"] });

        toast.success(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};


export const useGetAllProductReviews = () => {
  return useQuery({
    queryKey: ["GET_ALL_PRODUCT_REVIEWS"],
    queryFn: async () => {
      const response = await getALLProductReviews();
      return response;
    },
  });
};


export const useGetProductReviews = (id: string) => {
  return useQuery({
    queryKey: ["GET_PRODUCT_REVIEWS"],
    queryFn: async () => {
      const response = await getProductReviews(id);

      return response;
    },
  });
};
export const useDeleteProductReview = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["DELETE_PRODUCT_REVIEW"],
    mutationFn: async ({id}) => {
      return await deleteProductReviews(id);
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["GET_PRODUCT_REVIEWS"] });
        queryClient.invalidateQueries({ queryKey: ["GET_ALL_PRODUCT_REVIEWS"] });
        toast.success(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

