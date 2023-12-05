"use client";
import { DatePicker, DatePickerProps } from "antd";
import Form, { FormItemProps } from "antd/es/form";
import React from "react";

type Props<Values = any> = FormItemProps<Values> & {
  dateProps?: DatePickerProps;
};

export type FieldDateComponentProps = {};

export function FieldDateComponent<Values = any>({
  name,
  label,
  dateProps: dataProps,
  ...rest
}: Props<Values>) {
  return (
    <Form.Item<Values> label={label || (name as string)} name={name} {...rest}>
      <DatePicker
        style={{ width: "100%" }}
        {...dataProps}
        format={"DD/MM/YYYY"}
      />
    </Form.Item>
  );
}
