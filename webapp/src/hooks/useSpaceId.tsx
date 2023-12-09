import { useLocalStorage } from "@uidotdev/usehooks";

export const useSpaceId = () => useLocalStorage<string>('defolio-space-id');
