import { useQuery } from "@tanstack/react-query";
import { getSpace } from "../client/queries/spaces";
import { useSpaceId } from "./useSpaceId";

export const useCurrentSpace = () => {
  const [currentSpaceId] = useSpaceId();
  const { data: space, isLoading, refetch } = useQuery({
    queryKey: ['space', currentSpaceId],
    queryFn: () => getSpace(currentSpaceId ?? ''),
    enabled: !!currentSpaceId,
  });
  return {
    space: space ?? null,
    isLoading,
    refetch,
  }
}
