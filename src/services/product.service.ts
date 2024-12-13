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
export const getSingleProduct = async (id: string) => {
    try {
        const { data } = await axiosInstance.get(`/products/${id}`);
        return data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};


export const updateProduct = async (
    id: string,
    productData: FieldValues
) => {
    try {
        const { data } = await axiosInstance.patch(`/products/${id}`, productData);
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const deleteProduct = async (
    id: string,
   
) => {
    try {
        const { data } = await axiosInstance.delete(`/products/${id}`);
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};
