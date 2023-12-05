"use client";
import { Calendar, Popover, theme } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { TextComponent, TextComponentProps } from "../typography/TextComponent";

export type ShowerDateProps = {
  date: Dayjs;
  textProps?: TextComponentProps;
};

export function ShowerDate({ date, textProps }: ShowerDateProps) {
  const { token } = theme.useToken();
  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  return (
    <Popover
      content={
        <div style={wrapperStyle}>
          <Calendar fullscreen={false} value={dayjs(date)} />
        </div>
      }
    >
      <TextComponent
        variantBg="slate"
        variantBgLevel={700}
        className="rounded-md"
        text={dayjs(date).format("DD/MM/YYYY HH:mm:ss")}
        variantColorLevel={400}
        {...textProps}
      />
    </Popover>
  );
}
