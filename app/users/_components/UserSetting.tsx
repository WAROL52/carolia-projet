"use client";
import { Divider, DividerProps, Flex } from "antd";
import React from "react";
import { AccountForm } from "./AccountForm";
import { UserForm } from "./UserForm";
import { AccountOption } from "./AccountOption";
import { AccountToken } from "./AccountToken";
import { usePrismaQueryOne } from "@/lib/hooks/prisma/usePrismaQueryOne";
import { useAuthentification } from "@/lib/hooks/next-auth/useAuthentification";
import Alert from "antd/es/alert/Alert";
import Link from "next/link";

export type UserSettingProps = {
  accountId: number | null;
};
export const dividerProps: DividerProps = {
  className: "text-slate-500",
  orientation: "left",
};
export function UserSetting({ accountId }: UserSettingProps) {
  const {
    data: account,
    isLoading,
    isFetching,
  } = usePrismaQueryOne("account", { where: { id: accountId || -1 } });
  const { session } = useAuthentification();
  if (session?.user?.email === account?.email) {
    return (
      <Alert
        type="warning"
        message="Erreur De Permissions"
        description={
          <div>
            <p>Vous ne pouvez pas acceder sur votre propre parametre.</p>
            <Link href={"/profile/setting"}>Mon paramètres</Link>
          </div>
        }
      />
    );
  }
  return (
    <Flex vertical>
      <AccountToken accountId={accountId} />
      <AccountForm accountId={accountId} />
      <UserForm accountId={accountId} />
      <AccountOption accountId={accountId} />
    </Flex>
  );
}
