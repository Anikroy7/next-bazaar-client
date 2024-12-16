import axiosInstance from "../libs/AxiosInstance";

export const getAllPaymentInfo = async () => {
    try {
        const { data } = await axiosInstance.get("/payment/all");

        return data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};


export const cancelPaymentByAdmin = async (id: string) => {
    try {
        const { data } = await axiosInstance.patch(`/payment/admin/cancel/${id}`);
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};