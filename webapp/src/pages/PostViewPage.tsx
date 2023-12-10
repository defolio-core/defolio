import { FC } from 'react'
import { WebsiteLayout } from '../layouts/WebsiteLayout'
import { PostView } from '../components/PostView'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { getPostBySlugs } from '../client/queries/posts';

export interface PostViewPageProps {}

export const PostViewPage: FC<PostViewPageProps> = () => {
  const { spaceSlug, postSlug } = useParams();
  const { data: post } = useQuery({
    queryKey: ['post', spaceSlug, postSlug],
    queryFn: () => getPostBySlugs({
      spaceSlug: spaceSlug || '',
      postSlug: postSlug || ''
    }),
  })
  if (!post) {
    return null;
  }
  return (
    <WebsiteLayout>
      <PostView
        title={post.title}
        coverCID={post.cover}
        author={{ address: post.authorAddress }}
        content={post.content}
      />
    </WebsiteLayout>
  )
}
