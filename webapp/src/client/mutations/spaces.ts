import { Space } from "../types";
import { api } from "../api"

interface CreateSpaceInput {
  name: string;
  logo: string;
  slug: string;
  address: string;
};

export const createSpace = async (input: CreateSpaceInput) => {
  const { data } = await api.post<Space>('/spaces', input);
  return data;
};
