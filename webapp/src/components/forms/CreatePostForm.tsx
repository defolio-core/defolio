import { useCurrentSpace } from "../../hooks/useCurrentSpace";
import { Form, FormProps } from "../Form";
import { FormGroup } from "../FormGroup";
import { ImageUploaderFormInput } from "./inputs/ImageUploaderFormInput";
import { RichTextFormInput } from "./inputs/RichTextFormInput";
import { TextFormInput } from "./inputs/TextFormInput";

export interface CreatePostFormFields {
  title: string;
  slug: string;
  cover: string;
  content: string;
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
      {footer}
    </Form>
  );
}
