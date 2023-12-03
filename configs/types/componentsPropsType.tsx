import { PropsWithChildren } from "react";

export type PageComponentProps = {
  params: string | string[];
};
export type LayoutComponentProps<T = {}> = PropsWithChildren<
  {
    params: string | string[];
  } & T
>;
