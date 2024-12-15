import { FieldValues } from "react-hook-form";

import axiosInstance from "../libs/AxiosInstance";

export const getAllCategories = async () => {
  try {
    const { data } = await axiosInstance.get("/categories");

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const createCategories = async (bodyData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/categories", bodyData);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
