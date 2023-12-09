import { useQuery } from "@tanstack/react-query";
import { getMe } from "../client/queries/me";

export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    retry: false,
  });
};
