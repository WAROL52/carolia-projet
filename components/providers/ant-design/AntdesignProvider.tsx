"use client";
import React from "react";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import type Entity from "@ant-design/cssinjs/es/Cache";
import { useServerInsertedHTML } from "next/navigation";
import { ConfigProvider } from "antd";

export type AntdesignProviderProps = React.PropsWithChildren;

export function AntdesignProvider({ children }: AntdesignProviderProps) {
  const cache = React.useMemo<Entity>(() => createCache(), []);
  const isServerInserted = React.useRef<boolean>(false);
  useServerInsertedHTML(() => {
    // avoid duplicate css insert
    if (isServerInserted.current) {
      return;
    }
    isServerInserted.current = true;
    return (
      <style
        id="antd"
        dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
      />
    );
  });
  return (
    <StyleProvider cache={cache}>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              rowHoverBg: "rgb(148 163 184 / var(--tw-bg-opacity))",
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
}
