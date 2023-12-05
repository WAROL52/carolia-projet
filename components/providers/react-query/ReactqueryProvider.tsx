"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export type ReactqueryProviderProps = React.PropsWithChildren;

export function ReactqueryProvider({ children }: ReactqueryProviderProps) {
  const [queryClient] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          networkMode: "always",
        },
      },
    })
  );
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
