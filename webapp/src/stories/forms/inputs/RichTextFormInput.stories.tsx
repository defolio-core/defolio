/* eslint-disable react-hooks/rules-of-hooks */
import { useForm } from "react-hook-form";
import { RichTextFormInput } from "../../../components/forms/inputs/RichTextFormInput";
import { Meta, StoryObj } from "@storybook/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "../../../components/Form";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const meta: Meta<typeof RichTextFormInput> = {
  title: 'Forms/Inputs/RichTextFormInput',
  component: RichTextFormInput,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        {Story()}
      </QueryClientProvider>
    )
  ]
};

export default meta;

const schema = yup.object().shape({
  message: yup.string().label('Message').min(10).required(),
}).required();


export const Default: StoryObj = {
  render: () => {
    const form = useForm<{ message: string }>({
      resolver: yupResolver(schema),
      mode: 'onBlur',
      defaultValues: {
        message: '<p>Hello <strong>World</strong>!!</p>',
      }
    });
    return (
      <Form form={form} onSubmit={console.log}>
        <RichTextFormInput
          name="message"
          label="Message"
        />
      </Form>
    );
  },
};