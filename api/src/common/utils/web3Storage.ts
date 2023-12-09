export const getCIDLink = (cid: string, path?: string) => {
  if (!path) {
    return `https://w3s.link/ipfs/${cid}`;
  }
  return `https://w3s.link/ipfs/${cid}${
    path.startsWith('/') ? path : `/${path}`
  }`;
};
