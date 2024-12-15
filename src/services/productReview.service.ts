import { FieldValues } from "react-hook-form";
import axiosInstance from "../libs/AxiosInstance";

export const createProductReview = async (reviewData: FieldValues) => {
    try {
      const { data } = await axiosInstance.post("/productReviews", reviewData);
  
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };