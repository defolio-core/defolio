import React, { FC } from "react";
import { Form, FormProps } from "../Form";

export interface DeployArgs {}

export interface DeployFormProps
  extends Omit<FormProps<DeployArgs>, "children"> {
  loading?: boolean;
  footer?: React.ReactNode;
}

export const DeployForm: FC<DeployFormProps> = ({
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
      {/*
        TODO: Add more parameters for contract deployment here
      */}
      {footer}
    </Form>
  );
};
