import React, { PropsWithChildren } from "react";
import { AntdesignProvider } from "./ant-design/AntdesignProvider";
import { NextauthProvider } from "./next-auth/NextauthProvider";
import { ReactqueryProvider } from "./react-query/ReactqueryProvider";

export type ProviderComponentProps = PropsWithChildren;

export function ProviderComponent({ children }: ProviderComponentProps) {
  return (
    <ReactqueryProvider>
      <NextauthProvider>
        <AntdesignProvider>{children}</AntdesignProvider>
      </NextauthProvider>
    </ReactqueryProvider>
  );
}
