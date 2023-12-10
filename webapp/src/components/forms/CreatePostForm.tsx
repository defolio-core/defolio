import { useState } from "react";
import { useCurrentSpace } from "../../hooks/useCurrentSpace";
import { Form, FormProps } from "../Form";
import { FormGroup } from "../FormGroup";
import { ImageUploaderFormInput } from "./inputs/ImageUploaderFormInput";
import { RichTextFormInput } from "./inputs/RichTextFormInput";
import { TextFormInput } from "./inputs/TextFormInput";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";
import classNames from "classnames";

export interface CreatePostFormFields {
  title: string;
  slug: string;
  cover: string;
  content: string;
  scheduled: boolean;
  scheduledDate: Date | null;
}

export interface CreatePostFormProps
  extends Omit<FormProps<CreatePostFormFields>, "children"> {
  footer?: React.ReactNode;
  loading?: boolean;
}

export function CreatePostForm({
  form,
  onSubmit,
  loading,
  footer = (
    <div className="mt-2 flex justify-end">
      <button
        className="btn btn-primary btn-block"
        type="submit"
        disabled={!form.formState.isDirty}
      >
        {loading ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            Creating...
          </>
        ) : (
          <>Create</>
        )}
      </button>
    </div>
  ),
}: CreatePostFormProps) {
  const { space } = useCurrentSpace();
  const scheduled = form.watch("scheduled");
  return (
    <Form form={form} onSubmit={onSubmit}>
      <TextFormInput name="title" label="Title" type="text" />

      <FormGroup
        form={form}
        name="slug"
        label="URL"
        type="input"
        render={({ props }) => {
          return (
            <div className="input input-bordered flex">
              <div className="flex items-center text-gray-500 mr-1">
                https://defolio.xyz/{space?.slug}/
              </div>
              <input {...props} type="text" className="focus:outline-none" />
            </div>
          );
        }}
        options={{ required: true }}
      />

      <ImageUploaderFormInput
        name="cover"
        label="Cover"
        previewHeight={120}
        previewWidth={320}
      />

      <RichTextFormInput name="content" label="Content" />

      <div className="mt-4 my-8">
        <div className="max-w-md ">
          <div className="flex items-center">
            <input
              id="scheduled"
              type="checkbox"
              className="checkbox"
              {...form.register("scheduled")}
            />
            <label htmlFor="scheduled" className="label ml-2 cursor-pointer">
              Schedule Post
            </label>
          </div>
        </div>

        <div className="mt-2">
          <div className={classNames({ hidden: !scheduled })}>
            <Controller
              control={form.control}
              name="scheduledDate"
              render={({ field: { onChange, onBlur, value } }) => (
                <DatePicker
                  selected={value}
                  onChange={(date) => onChange(date)}
                  onBlur={() => onBlur()}
                  showTimeSelect
                  className="input input-bordered"
                  dateFormat={"MMMM d, yyyy h:mm aa"}
                />
              )}
            />
          </div>
        </div>
      </div>

      {footer}
    </Form>
  );
}
