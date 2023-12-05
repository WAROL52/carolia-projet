"use client";
import React from "react";
import { dividerProps } from "./UserSetting";
import { Descriptions, Divider } from "antd";
import { TextComponent } from "@/components/antd/typography/TextComponent";
import { usePrismaQueryOne } from "@/lib/hooks/prisma/usePrismaQueryOne";

export type AccountTokenProps = {
  accountId: number | null;
};

export function AccountToken({ accountId }: AccountTokenProps) {
  const {
    data: account,
    isLoading,
    isFetching,
  } = usePrismaQueryOne("account", { where: { id: accountId || -1 } });
  return (
    <>
      <Descriptions
        items={[
          {
            key: "token",
            label: <TextComponent text="Code de verification" />,
            children: (
              <TextComponent
                variantColorLevel={500}
                text={"* * * * * *"}
                copyable={{
                  format: "text/plain",
                  text: account?.token,
                }}
              />
            ),
          },
        ]}
      />
    </>
  );
}
