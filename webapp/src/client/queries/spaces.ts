import { Space } from "../types";
import { api } from "../api";

export const getSpaces = async () => {
  const { data } = await api.get<Space[]>('/spaces');
  return data;
};

export const getSpace = async (id: string) => {
  const { data } = await api.get<Space>(`/spaces/${id}`);
  return data;
};
