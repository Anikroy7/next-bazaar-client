import { FieldValues } from "react-hook-form";

import axiosInstance from "../libs/AxiosInstance";
import { useQuery } from "@tanstack/react-query";

export const createOrder = async (orderData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/orders", orderData);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getMyOrderInfo = async () => {
  try {
    const { data } = await axiosInstance.get("/orders/my-order");

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};



export const getOrdersForVendor = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/orders/vendor-order/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
