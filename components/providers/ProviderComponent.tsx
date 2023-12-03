"use client";
import React, { PropsWithChildren } from "react";
import { AntdesignProvider } from "./ant-design/AntdesignProvider";

export type ProviderComponentProps = PropsWithChildren;

export function ProviderComponent({ children }: ProviderComponentProps) {
  return <AntdesignProvider>{children}</AntdesignProvider>;
}
