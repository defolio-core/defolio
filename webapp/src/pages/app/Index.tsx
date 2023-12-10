import { FC } from 'react'
import { AppLayout } from '../../layouts/AppLayout'
import { PostListingCard } from '../../components/PostListingCard'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../../client/queries/posts';
import { useCurrentSpace } from '../../hooks/useCurrentSpace';

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
    <AppLayout>
      <div className="grid grid-cols-4 gap-4">
        {posts && posts.map((post) => (
            <PostListingCard
              post={post}
              url={`/${space?.slug || ''}/${post?.slug}`}
          />
        ))}
      </div>
    </AppLayout>
  )
}
