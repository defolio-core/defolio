import { getCIDLink, uploadToWeb3Storage } from './web3Storage';
import { PostMetadata } from '../types/PostMetadata';
import axios from 'axios';


export const createPostMetadata = (postMetadata: PostMetadata) => {
  const jsonData = JSON.stringify(postMetadata, null, 2);
  const file = new File([jsonData], 'post-metadata.json');
  return uploadToWeb3Storage([file], {
    wrapWithDirectory: false,
  });
}

export const getPostMetadata = async (cid: string): Promise<PostMetadata> => {
  const url = getCIDLink(cid);
  const { data } = await axios.get<PostMetadata>(url);
  return data;
}
