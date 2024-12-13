import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../services/product.service";
import { toast } from "sonner";
import { queryClient } from "../libs/providers";

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

export const useGetSingleProduct = (id: string) => {

  return useQuery({
    queryKey: ["GET_SINGLE_PRODUCTS"],
    queryFn: async () => {
      const response = await getSingleProduct(id)
      return response
    },
  });
}


export const useUpdateProduct = (id: string) => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_PRODUCT"],
    mutationFn: async (userData) => {
      return await updateProduct(id, userData)
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["GET_ALL_PRODUCTS"] });
        toast.success(data.message)
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

}


export const useDeleteProduct = (id: string) => {
  return useMutation<any, Error>({
    mutationKey: ["DELETE_PRODUCT"],
    mutationFn: async () => {
      return await deleteProduct(id)
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["GET_ALL_PRODUCTS"] });
        toast.success(data.message)
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

}