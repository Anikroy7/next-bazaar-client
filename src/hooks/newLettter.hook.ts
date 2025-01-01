import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { queryClient } from "../libs/providers";
import {
  createNewsLetter,
  deleteNewsLetter,
  getAllNewsLetters,
  sendNewsLetter,
} from "../services/newLetter.service";

export const useCreateNewsLetter = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_NEWS_LETTER"],
    mutationFn: async (data) => {
      return await createNewsLetter(data);
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["GET_ALL_NEWS_LETTERS"] });
        toast.success(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useSendNewsLetter = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["SEND_NEWS_LETTER"],
    mutationFn: async ({ email, letterData }) => {
      return await sendNewsLetter(email, letterData);
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["GET_ALL_NEWS_LETTERS"] });
        toast.success(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllNewsLetters = () => {
  return useQuery({
    queryKey: ["GET_ALL_NEWS_LETTERS"],
    queryFn: async () => {
      const response = await getAllNewsLetters();

      return response;
    },
  });
};

export const useDeleteNewsLetter = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["DELETE_NEWS_LETTER"],
    mutationFn: async ({ id }) => {
      return await deleteNewsLetter(id);
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["GET_ALL_NEWS_LETTERS"] });

        toast.success(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
