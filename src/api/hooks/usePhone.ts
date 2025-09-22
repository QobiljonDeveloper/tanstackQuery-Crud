import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api";
import { message } from "antd";

export interface Phone {
  id: string;
  title: string;
  price: string;
  image?: string;
  memories: string[];
  isDelivery: boolean;
}

export const usePhones = () => {
  const client = useQueryClient();

  const getPhones = useQuery<Phone[], any>({
    queryKey: ["phones"],
    queryFn: async () => {
      const { data } = await api.get("/phone");
      return data;
    },
  });

  const createPhone = useMutation<any, any, Omit<Phone, "id">>({
    mutationFn: async (newPhone) => {
      const { data } = await api.post("/phone", newPhone);
      return data;
    },
    onSuccess: () => {
      message.success("Phone created successfully");
      client.invalidateQueries({ queryKey: ["phones"] });
    },
    onError: () => {
      message.error("Failed to create phone");
    },
  });

  const updatePhone = useMutation<any, any, Phone>({
    mutationFn: async (phone) => {
      const { data } = await api.put(`/phone/${phone.id}`, phone);
      return data;
    },
    onSuccess: () => {
      message.success("Phone updated successfully");
      client.invalidateQueries({ queryKey: ["phones"] });
    },
    onError: () => {
      message.error("Failed to update phone");
    },
  });

  const deletePhone = useMutation<any, any, string>({
    mutationFn: async (id) => {
      await api.delete(`/phone/${id}`);
    },
    onSuccess: () => {
      message.success("Phone deleted successfully");
      client.invalidateQueries({ queryKey: ["phones"] });
    },
    onError: () => {
      message.error("Failed to delete phone");
    },
  });

  return { getPhones, createPhone, updatePhone, deletePhone };
};
