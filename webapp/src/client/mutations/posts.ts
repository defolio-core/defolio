import { api } from "../api";

interface CreateScheduledPost {
  spaceId: string;
  title: string;
  slug: string;
  cover: string;
  content: string;
  authorAddress: string;
  cid: string;
  date: string;
}

export const indexPost = async (spaceId: string, slug: string) => {
  const { data } = await api.post<{ status: boolean }>(`/posts/index`, {
    spaceId,
    slug,
  });
  return data;
};

export const createScheduledPost = async (input: CreateScheduledPost) => {
  const { data } = await api.post<{ status: boolean }>(`/posts/scheduled`, input);
  return data;
};
