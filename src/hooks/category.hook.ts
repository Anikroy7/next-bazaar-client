import { useQuery } from "@tanstack/react-query";
import { getALlCategories } from "../services/category.service";

export const useGetAllCategories = () => {
  
    return useQuery({
      queryKey: ["GET_ALL_CATEGORIES"],
      queryFn: async () => {
        const response = await getALlCategories()
        return response
      },
    });
  }