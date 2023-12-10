export const getAddressExplorerUrl = (addr?: string) => {
  if (!addr) {
    return null;
  }
  const baseURL = import.meta.env.VITE_EXPLORER_BASE_URL as string;
  return `${baseURL}/address/${addr}`;
};