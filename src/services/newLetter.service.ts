import { FieldValues } from "react-hook-form";

import axiosInstance from "../libs/AxiosInstance";

export const getAllNewsLetters = async () => {
  try {
    const { data } = await axiosInstance.get("/newsLetters");

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteNewsLetter = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/newsLetters/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createNewsLetter = async (letterData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(`/newsLetters`, letterData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const sendNewsLetter = async (
  email: string,
  letterData: FieldValues,
) => {
  try {
    const { data } = await axiosInstance.post(
      `/newsLetters/sendEmail/${email}`,
      letterData,
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
