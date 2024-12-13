import { FieldValues } from "react-hook-form";
import axiosInstance from "../libs/AxiosInstance";

export const registerUser = async (userData: FieldValues) => {
    try {
        const { data } = await axiosInstance.post("/users/create-customer", userData);
        return data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};
export const createVendor = async (userData: FieldValues) => {
    try {
        const { data } = await axiosInstance.post("/users/create-vendor", userData);
        return data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};


export const loggedUserInfo = async () => {
    try {
        const { data } = await axiosInstance.get("/users/me");
        return data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};



export const updateSingleUser = async (
    userData: FieldValues
) => {
    try {
        const { data } = await axiosInstance.patch("/users/update-customer", userData);
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};
export const updateVendor = async (
    userData: FieldValues
) => {
    try {
        const { data } = await axiosInstance.patch("/users/update-vendor", userData);
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};
