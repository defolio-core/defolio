/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormGroup } from "../../FormGroup";
import { RichText } from "../../RichText";

export interface RichTextFormInputProps {
  name: string;
  label: string;
}

export const RichTextFormInput: FC<RichTextFormInputProps> = ({
  name,
  label,
}) => {
  const form = useFormContext();
  return (
    <FormGroup
      form={form}
      name={name}
      label={label}
      type="textarea"
      render={({ error }) => (
        <Controller
          control={form.control}
          name={name}
          render={({
            field: { onChange, onBlur, value },
          }) => (
            <RichText
              hasError={!!error}
              onChange={(value) => {
                console.log(value);
                onChange({ target: { value } })
              }}
              onBlur={() => onBlur()}
              initialValue={value}
            />
          )}
        />
      )}
    />
  );
};
