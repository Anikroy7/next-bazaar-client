import axiosInstance from "../libs/AxiosInstance";

export const getALlCategories = async () => {
    try {
        const { data } = await axiosInstance.get("/categories");
        return data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};