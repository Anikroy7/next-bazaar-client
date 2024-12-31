import { FieldValues } from "react-hook-form";
import axiosInstance from "../libs/AxiosInstance";

export const getAllCupons = async () => {
  try {
    const { data } = await axiosInstance.get("/cupons");

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteCupon = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/cupons/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const updateCupon = async (id: string, cuponData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(`/cupons/${id}`, cuponData);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const createCupon = async (cuponData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(`/cupons`, cuponData);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
