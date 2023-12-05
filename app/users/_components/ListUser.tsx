"use client";
import { usePrismaQueryMany } from "@/lib/hooks/prisma/usePrismaQueryMany";
import { LoadingOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Card, List, Space } from "antd";
import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";
import { BtnCreateAccount } from "./BtnCreateAccount";

export type ListUserProps = {
  userId: number | null;
  onSelectUser?: (userId: number) => void;
};

const Li = motion(List.Item);

export function ListUser({ onSelectUser, userId }: ListUserProps) {
  const {
    data: accounts = [],
    isLoading,
    isFetching,
  } = usePrismaQueryMany("account", {
    include: { User: true },
  });

  return (
    <Card
      loading={isLoading}
      bordered={false}
      title={
        <Space size={"small"}>
          {isFetching && <LoadingOutlined className="text-slate-100" />}
          <span className="text-white">Liste des comptes utilisateur</span>
        </Space>
      }
      className="bg-slate-800"
      rootClassName="bg-slate-800"
      bodyStyle={{ background: "rgb(30 41 59 / var(--tw-bg-opacity))" }}
      headStyle={{
        background: "rgb(30 41 59 / var(--tw-bg-opacity))",
        borderBottom: "white solid 2px",
      }}
      extra={
        <Space>
          <BtnCreateAccount />
        </Space>
      }
    >
      <List
        size="small"
        dataSource={accounts}
        renderItem={({ email, image, name, id }) => {
          return (
            <Li
              className={clsx(
                " cursor-pointer hover:bg-slate-600 rounded-md hover:text-slate-900",
                userId === id && "bg-slate-700 "
              )}
              whileHover={{ scale: 1.079 }}
              whileTap={{ scale: 0.999 }}
              onClick={() => onSelectUser?.(id)}
            >
              <List.Item.Meta
                avatar={<Avatar src={image} icon={<UserOutlined />} />}
                description={<span className="text-slate-500 ">{name}</span>}
                title={<span className="text-slate-400">{email}</span>}
              />
            </Li>
          );
        }}
      />
    </Card>
  );
}
