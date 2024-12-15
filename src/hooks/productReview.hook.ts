import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { createProductReview } from "../services/productReview.service";
import { toast } from "sonner";

export const useCreateProductReview = () => {
    return useMutation<any, Error, FieldValues>({
      mutationKey: ["CREATE_PRODUCT_REVIEW"],
      mutationFn: async (prData) => {
        return await createProductReview(prData);
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
  