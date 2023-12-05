"use client";
import { Form, Input } from "antd";
import { FormItemProps, Rule } from "antd/es/form";
import {
  InputProps,
  PasswordProps,
  SearchProps,
  TextAreaProps,
} from "antd/es/input";
import React from "react";
import clsx from "clsx";
type InputComponentProps = {
  Password: PasswordProps;
  Search: SearchProps;
  TextArea: TextAreaProps;
  default: InputProps;
};
const getinputProps = (inputType: InputType) => {
  if (!inputType.inputType) {
    return inputType.inputProps || {};
  }
  return (
    {
      Password: inputType.passwordProps,
      Search: inputType.searchProps,
      TextArea: inputType.textAreaProps,
      default: inputType.inputProps,
    }[inputType.inputType] || {}
  );
};
type InputComponentType = keyof InputComponentProps;
type InputType = {
  inputType?: InputComponentType;
  passwordProps?: PasswordProps;
  searchProps?: SearchProps;
  textAreaProps?: TextAreaProps;
  inputProps?: InputProps;
};
type Props<Values = any> = FormItemProps<Values> &
  InputType & {
    readOnly?: boolean;
  };

export type FieldTextComponentProps = {};

export function FieldTextComponent<Values>({
  name,
  inputType,
  passwordProps,
  textAreaProps,
  inputProps,
  searchProps,
  readOnly,
  required,
  ...rest
}: Props<Values>) {
  const props = getinputProps({
    inputType,
    passwordProps,
    textAreaProps,
    inputProps,
    searchProps,
  });
  const InputComp =
    inputType === undefined
      ? Input
      : inputType === "default"
      ? Input
      : Input[inputType];
  const rules = rest.rules || [];
  if (required) rules.push({ required: true });
  return (
    <Form.Item name={name} {...rest} rules={rules}>
      {/* @ts-ignore  */}
      <InputComp
        readOnly={readOnly}
        {...props}
        className={clsx(props.className, readOnly && "cursor-not-allowed")}
      />
    </Form.Item>
  );
}
