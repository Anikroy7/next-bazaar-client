import { useQuery } from "@tanstack/react-query";
import { getAllPaymentInfo } from "../services/payment.service";

export const useGetAllPaymentInfo = () => {
    return useQuery({
        queryKey: ["GET_ALL_PAYMENT_INFO"],
        queryFn: async () => {
            const response = await getAllPaymentInfo();
            return response;
        },
    });
};