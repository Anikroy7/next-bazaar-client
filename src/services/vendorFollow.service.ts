import { FieldValues } from "react-hook-form";
import axiosInstance from "../libs/AxiosInstance";

export const crateVendorFollow = async (followdata: FieldValues) => {
    try {
      const { data } = await axiosInstance.post(
        "/vendorFollowers/add",
        followdata,
      );
  
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };
export const removeVendorFollow = async (followdata: FieldValues) => {
    try {
      const { data } = await axiosInstance.post(
        "/vendorFollowers/remove",
        followdata,
      );
  
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };
export const isVendorFollow = async (followdata: FieldValues) => {
    try {
      const { data } = await axiosInstance.post(
        "/vendorFollowers/isFollowed",
        followdata,
      );
  
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };