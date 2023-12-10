import { api } from "../api";
import { Post } from '../types';

export const getPosts = async ({ page, perPage, spaceId }: { page: number, perPage: number, spaceId?: string }) => {
  const { data } = await api.get<Post[]>('/posts', {
    params: {
      page,
      perPage,
      spaceId
    }
  });
  return data;
};


export const getPostBySlugs = async ({ spaceSlug, postSlug }: { spaceSlug: string, postSlug: string }) => {
  const { data } = await api.get<Post>(`/posts/${spaceSlug}/${postSlug}`);
  return data;
}
