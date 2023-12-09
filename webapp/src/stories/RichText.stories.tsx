import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RichText } from "../components/RichText";
import { Meta, StoryObj } from "@storybook/react";

const queryClient = new QueryClient();


const meta: Meta<typeof RichText> = {
  component: RichText,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        {Story()}
      </QueryClientProvider>
    )
  ]
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <RichText
      initialValue="<h1>Hello World</h1> <p>This is just a example</p>"
      onChange={console.log}
    />
  ),
};
