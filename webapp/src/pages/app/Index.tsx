import { FC } from 'react'
import { AppLayout } from '../../layouts/AppLayout'
import { PostListingCard } from '../../components/PostListingCard'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../../client/queries/posts';
import { useCurrentSpace } from '../../hooks/useCurrentSpace';
import { Link } from 'react-router-dom';

export const AppIndexPage: FC = () => {
  const { space } = useCurrentSpace();
  const { data: posts } = useQuery({
    queryKey: ['posts', space?.id],
    queryFn: () => getPosts({
      spaceId: space?.id,
      page: 1,
      perPage: 50, // TODO: Add Pagination
    }),
    enabled: Boolean(space?.id),
  })
  return (
    <AppLayout title="Posts">
      <div className="grid grid-cols-4 gap-4">
        {posts && posts.map((post) => (
            <PostListingCard
              post={post}
              url={`/${space?.slug || ''}/${post?.slug}`}
          />
        ))}
      </div>
        {posts && posts.length === 0 && (
          <div className="border-4 border-dashed border-gray-200 p-24 w-full text-center">
            <div>
              <div>
                No Posts
              </div>
              <div className="mt-8">
                <Link className="btn btn-primary" to="/app/posts/create">Create Post</Link>
              </div>
            </div>
          </div>
        )}
    </AppLayout>
  )
}
