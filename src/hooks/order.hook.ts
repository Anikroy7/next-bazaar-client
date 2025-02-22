import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  createOrder,
  getAllOrderedProducts,
  getMyOrderInfo,
  getOrdersForVendor,
} from "../services/order.service";

export const useCreateOrder = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_ORDER"],
    mutationFn: async (orderData) => {
      return await createOrder(orderData);
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

export const useGetMyOrderInfo = () => {
  return useQuery({
    queryKey: ["GET_MY_ORDER_INFO"],
    queryFn: async () => {
      const response = await getMyOrderInfo();

      return response;
    },
  });
};
export const useGetAllOrderedProducdts = () => {
  return useQuery({
    queryKey: ["GET_ALL_ORDERED_PRODUCTS"],
    queryFn: async () => {
      const response = await getAllOrderedProducts();

      return response;
    },
  });
};

export const useGetOrdersForVendor = (id: string) => {
  return useQuery({
    queryKey: ["GET_ORDERS_FOR_VENDOR"],
    queryFn: async () => {
      const response = await getOrdersForVendor(id);

      return response;
    },
  });
};
