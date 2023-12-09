import { getCIDLink } from './web3Storage';
import { PostMetadata } from '../types/PostMetadata';
import axios from 'axios';

export const getPostMetadata = async (cid: string): Promise<PostMetadata> => {
  const url = getCIDLink(cid);
  const { data } = await axios.get<PostMetadata>(url);
  return data;
};
