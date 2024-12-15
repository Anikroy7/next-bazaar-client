import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { createOrder, getMyOrderInfo } from "../services/order.service";
import { toast } from "sonner";
import axiosInstance from "../libs/AxiosInstance";

export const useCreateOrder = () => {
    return useMutation<any, Error, FieldValues>({
        mutationKey: ["CREATE_ORDER"],
        mutationFn: async (orderData) => {
            return await createOrder(orderData)
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


export const useGetMyOrderInfo = () => {

    return useQuery({
      queryKey: ["GET_MY_ORDER_INFO"],
      queryFn: async () => {
        const response = await getMyOrderInfo()
        return response
      },
    });
  }