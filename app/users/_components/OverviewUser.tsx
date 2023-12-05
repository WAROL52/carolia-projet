"use client";
import { ShowerDate } from "@/components/antd/showers/ShowerDate";
import { TextComponent } from "@/components/antd/typography/TextComponent";
import { usePrismaQueryOne } from "@/lib/hooks/prisma/usePrismaQueryOne";
import { LoadingOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Calendar,
  Card,
  Descriptions,
  Empty,
  Popover,
  Space,
  Tabs,
  theme,
} from "antd";
import dayjs from "dayjs";
import React, { PropsWithChildren } from "react";
import { UserDescription } from "./UserDescription";
import { UserSetting } from "./UserSetting";

export type OverviewUserProps = {
  accountId: number | null;
  onClose?: () => void;
};
export function OverviewUser({ accountId, onClose }: OverviewUserProps) {
  const {
    data: account,
    isLoading,
    isFetching,
    isSuccess,
  } = usePrismaQueryOne("account", {
    where: { id: accountId || -1 },
    include: {
      User: true,
    },
  });
  const isEmpty = !account && isSuccess;
  return (
    <Card
      loading={isLoading}
      bordered={false}
      title={
        <Space size={"small"}>
          {isFetching && <LoadingOutlined className="text-slate-100" />}
          <Avatar src={account?.image} icon={<UserOutlined />} />
          <span className="text-white">
            {" "}
            {isLoading ? "Chargement..." : account?.email}{" "}
          </span>
        </Space>
      }
      className="bg-slate-800"
      rootClassName="bg-slate-800"
      bodyStyle={{ background: "rgb(30 41 59 / var(--tw-bg-opacity))" }}
      headStyle={{
        background: "rgb(30 41 59 / var(--tw-bg-opacity))",
        borderBottom: "white solid 2px",
      }}
      extra={<Space></Space>}
    >
      {accountId && !isEmpty ? (
        <Tabs
          items={[
            {
              key: "Apercue",
              label: <TextComponent text={"Apercue"} variantColorLevel={300} />,

              children: <UserDescription accountId={accountId} />,
            },
            {
              key: "Activité",
              label: (
                <TextComponent text={"Activité"} variantColorLevel={300} />
              ),
              children: "Activité",
            },
            {
              key: "Permissions",
              label: (
                <TextComponent text={"Permissions"} variantColorLevel={300} />
              ),
              children: "Permissions",
            },

            {
              key: "Parametre",
              label: (
                <TextComponent text={"Parametre"} variantColorLevel={300} />
              ),
              children: <UserSetting accountId={accountId} />,
            },
          ]}
        />
      ) : (
        <Empty description={<TextComponent>Pas de donnée</TextComponent>} />
      )}
    </Card>
  );
}
