import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSpace } from "../client/queries/spaces";
import { getPosts } from "../client/queries/posts";
import { PostListingCard } from "../components/PostListingCard";
import { SpaceAvatar } from "../components/SpaceAvatar";

export interface SpaceHomeProps {}

export const SpaceHome: FC<SpaceHomeProps> = () => {
  const params = useParams();
  const { data: space, isLoading } = useQuery({
    queryKey: ["space", params.spaceSlug],
    queryFn: () => getSpace(params.spaceSlug ?? ""),
    enabled: !!params.spaceSlug,
  });
  const { data: posts } = useQuery({
    queryKey: ["posts", space?.id],
    queryFn: () =>
      getPosts({
        spaceId: space?.id,
        page: 1,
        perPage: 50, // TODO: Add Pagination
      }),
    enabled: Boolean(space?.id),
  });
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }
  if (!space) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="text-gray-500">Space Not Found</div>
      </div>
    );
  }
  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <div className="py-8 text-center">
          <SpaceAvatar space={space} wrapperClassName="w-20" />
          <h1 className="text-4xl text-center text-gray-700 mt-4">
            {space.name}
          </h1>
        </div>
        <div className="mt-4 border-t pt-8">
          <div className="grid grid-cols-3 gap-4">
            {posts &&
              posts.map((post) => (
                <PostListingCard
                  post={post}
                  url={`/${space?.slug || ""}/${post?.slug}`}
                />
              ))}
          </div>
          {posts?.length === 0 && (
            <div className="items-center justify-center text-center mt-20">
              <div className="text-gray-500">No Posts</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
