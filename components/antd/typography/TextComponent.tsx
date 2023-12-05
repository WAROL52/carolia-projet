"use client";
import { VariantProps } from "@/configs/types/themeType";
import { Typography } from "antd";
import { TextProps } from "antd/es/typography/Text";
import clsx from "clsx";
import React from "react";

export type TextComponentProps = TextProps &
  VariantProps & {
    text?: React.ReactNode;
  };

export function TextComponent({
  variantBg,
  variantBgLevel,
  variantColor = "slate",
  variantColorLevel,
  text,
  children = text,
  ...textProps
}: TextComponentProps) {
  let bgColor = "";
  let color = "";
  if (variantBg) bgColor = `bg-${variantBg}-${variantBgLevel || 50}`;
  if (variantColor) color = `text-${variantColor}-${variantColorLevel || 50}`;

  return (
    <Typography.Text {...textProps} className={clsx(color, bgColor)}>
      {children}
    </Typography.Text>
  );
}
