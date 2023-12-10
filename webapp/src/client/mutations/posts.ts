import { api } from "../api";

export const indexPost = async (spaceId: string, slug: string) => {
  const { data } = await api.post<{ status: boolean }>(`/posts/index`, { spaceId, slug });
  return data;
}
