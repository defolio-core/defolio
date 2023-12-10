import { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PostAuthorInfo } from "../components/PostAuthorInfo";

const queryClient = new QueryClient();


const meta: Meta<typeof PostAuthorInfo> = {
  component: PostAuthorInfo,
  decorators: [
    (Story) => (
        <QueryClientProvider client={queryClient}>
            {Story()}
        </QueryClientProvider>
    )
  ]
};

export default meta;

// Default

export const Default: StoryObj = {
  render: () => (
    <PostAuthorInfo
      author={{
        address: '0xFdaAc16d3bE97F8DD562218BFc913055901Be15e',
      }}
    />
  ),
};

// With Info

export const WithAdditionalInfo: StoryObj = {
  render: () => (
    <PostAuthorInfo
      author={{
        address: '0xFdaAc16d3bE97F8DD562218BFc913055901Be15e',
      }}
      info={(
        <div>Info Example</div>
      )}
    />
  ),
};