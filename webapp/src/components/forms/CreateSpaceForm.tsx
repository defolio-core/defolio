import React, { FC } from "react";
import { Form, FormProps } from "../Form";
import { ImageUploaderFormInput } from "./inputs/ImageUploaderFormInput";
import { TextFormInput } from "./inputs/TextFormInput";
import { FormGroup } from "../FormGroup";

export interface CreateSpaceFormFields {
  logo: string;
  name: string;
  slug: string;
}

export interface CreateSpaceFormProps
  extends Omit<FormProps<CreateSpaceFormFields>, "children"> {
  loading?: boolean;
  footer?: React.ReactNode;
}

export const CreateSpaceForm: FC<CreateSpaceFormProps> = ({
  form,
  onSubmit,
  loading,
  footer = (
    <div className="mt-2 flex justify-end">
      <button
        className="btn btn-primary btn-block"
        type="submit"
        disabled={loading}
      >
        {loading && (
          <span className="loading loading-spinner"></span>
        )}
        {loading ? 'Deploying...' : 'Deploy'}
      </button>
    </div>
  ),
}) => {
  return (
    <Form form={form} onSubmit={onSubmit}>

      <ImageUploaderFormInput
        name="logo"
        label="Logo"
        previewHeight={80}
        previewWidth={80}
      />

      <TextFormInput name="name" label="Name" type="text" />

      <FormGroup
        form={form}
        name="slug"
        label="URL"
        type="input"
        render={({ props }) => {
          return (
            <div className="input input-bordered flex">
              <div className="flex items-center text-gray-500 mr-1">
                https://defolio.xyz/
              </div>
              <input {...props} type="text" className="focus:outline-none" />
            </div>
          );
        }}
        options={{ required: true }}
      />

      {footer}
    </Form>
  );
};
