import { FieldValues } from "react-hook-form";
import axiosInstance from "../libs/AxiosInstance";

export const createProduct = async (productData: FieldValues) => {
    try {
        const { data } = await axiosInstance.post("/products", productData);
        return data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};
export const getAllProducts = async () => {
    try {
        const { data } = await axiosInstance.get("/products");
        return data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};
