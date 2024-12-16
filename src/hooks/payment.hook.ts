import { useMutation, useQuery } from "@tanstack/react-query";
import { cancelPaymentByAdmin, getAllPaymentInfo } from "../services/payment.service";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { queryClient } from "../libs/providers";

export const useGetAllPaymentInfo = () => {
    return useQuery({
        queryKey: ["GET_ALL_PAYMENT_INFO"],
        queryFn: async () => {
            const response = await getAllPaymentInfo();
            return response;
        },
    });
};

export const useCancelPaymentByAdmin = () => {
    return useMutation<any, Error, FieldValues>({
        mutationKey: ["CANCEL_PAYMENT_BY_ADMIN"],
        mutationFn: async ({ id }) => {
            return await cancelPaymentByAdmin(id);
        },
        onSuccess: (data) => {
            if (data) {
                queryClient.invalidateQueries({ queryKey: ["GET_ALL_PAYMENT_INFO"] });
                toast.success(data.message);
            }
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};