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
export const getAllProducts = async (filters: FieldValues) => {
  try {
    const { data } = await axiosInstance.get(
      `/products?searchTerm=${filters.searchTerm || ""}&priceRange=${filters.priceRange || ""}&categoryId=${filters.categoryId || ""}&page=${filters.page || ""}`,
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
export const getSingleProduct = async (id: string | null) => {
  try {
    if (id) {
      const { data } = await axiosInstance.get(`/products/${id}`);

      return data;
    }

    return null;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const updateProduct = async (id: string, productData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(`/products/${id}`, productData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/products/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
