import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { createProduct, getAllProducts, getSingleProduct } from "../services/product.service";
import { toast } from "sonner";

export const useCreateProduct = () => {
    return useMutation<any, Error, FieldValues>({
      mutationKey: ["CREATE_PRODUCT"],
      mutationFn: async (productData) => {
        return await createProduct(productData)
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


  
export const useGetAllProducts = () => {
  
  return useQuery({
    queryKey: ["GET_ALL_PRODUCTS"],
    queryFn: async () => {
      const response = await getAllProducts()
      return response
    },
  });
}
  
export const useGetSingleProduct = (id:string) => {
  
  return useQuery({
    queryKey: ["GET_SINGLE_PRODUCTS"],
    queryFn: async () => {
      const response = await getSingleProduct(id)
      return response
    },
  });
}
