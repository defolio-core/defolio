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

export const indexPost = async (spaceId: string, slug: string) => {
  const { data } = await api.post<{ status: boolean }>(`/spaces/index-post`, { spaceId, slug });
  return data;
}
