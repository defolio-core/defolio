/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from 'react'
import { CreatePostForm, CreatePostFormFields } from '../../../components/forms/CreatePostForm'
import { useForm } from 'react-hook-form'
import { useCurrentSpace } from '../../../hooks/useCurrentSpace';
import { useDeFolioSpacePublishPost } from '../../../generated';
import { waitForTransaction } from 'wagmi/actions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { createPostMetadata } from '../../../utils/postMetadata';
import { useMutation } from '@tanstack/react-query';
import { indexPost } from '../../../client/mutations/posts';
import { useAccount } from 'wagmi';

export interface PostsCreateProps {
  
}

export const PostsCreate: FC<PostsCreateProps> = (props) => {
  const navigate = useNavigate();
  const { space } = useCurrentSpace();
  const account = useAccount();
  const useIndexPostMutation = useMutation({
    mutationFn: (input: { spaceId: string; slug: string }) =>
      indexPost(input.spaceId, input.slug),
  });
  const contractPublishPost = useDeFolioSpacePublishPost({
    address: space?.address as `0x${string}`,
  });
  const form = useForm<CreatePostFormFields>({
    defaultValues: {
      scheduled: false,
      scheduledDate: new Date(),
    }
  });
  const onSubmit = async (data: CreatePostFormFields) => {

    const cid = await createPostMetadata({
      ...data,
      author: {
        address: account.address,
      }
    });

    try {
      const tx = await contractPublishPost.writeAsync({
        args: [data.slug, cid]
      })
      const txn = await waitForTransaction({ hash: tx.hash });
      await useIndexPostMutation.mutateAsync({
        slug: data.slug,
        spaceId: space?.id as string,
      });
      toast.success("Post created!");
      form.reset();
      navigate('/app');
    } catch (err) {
      toast.error('Could not create post');
      console.error(err);
    }
  }
  return (
    <div className="max-w-3xl border mx-auto mt-8 p-8">
      <CreatePostForm form={form} onSubmit={onSubmit} />
    </div>
  )
}
