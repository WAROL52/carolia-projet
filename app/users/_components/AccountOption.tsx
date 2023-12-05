"use client";
import { usePrismaQueryDeleteOne } from "@/lib/hooks/prisma/usePrismaQueryDeleteOne";
import { usePrismaQueryOne } from "@/lib/hooks/prisma/usePrismaQueryOne";
import { usePrismaQueryUpdateOne } from "@/lib/hooks/prisma/usePrismaQueryUpdateOne";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Popconfirm } from "antd";
import React, { useState } from "react";
import { dividerProps } from "./UserSetting";

export type AccountOptionProps = {
  accountId: number | null;
};

export function AccountOption({ accountId }: AccountOptionProps) {
  if (!accountId || accountId < 0) return null;
  return (
    <Flex vertical justify="center" gap={16}>
      <Divider {...dividerProps}>Option</Divider>
      <DeleteUser accountId={accountId} />
      <DeleteAccount accountId={accountId} />
    </Flex>
  );
}

function DeleteUser({ accountId }: AccountOptionProps) {
  const { data: account, isSuccess } = usePrismaQueryOne("account", {
    where: { id: accountId || -1 },
    include: {
      User: true,
    },
  });
  const { mutate } = usePrismaQueryUpdateOne(
    "account",
    { id: accountId || -1 },
    (_: void) => ({
      User: {
        delete: true,
      },
    }),
    {
      notificationOnSuccess: "L'utilisateur a bien été effacer!",
      invalidateQueryOnsuccess: ["account", "user"],
    }
  );
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    mutate(undefined, {
      onSuccess() {
        setOpen(false);
        setConfirmLoading(false);
      },
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };
  if (!account && isSuccess) return null;
  return (
    <Popconfirm
      title="Confirmation"
      description="Est ce que vous êtes sûr de vouloir effacer cette l'utilisateur ?"
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading, danger: true }}
      okText="Oui, Je Confirme"
      cancelText="Annuler"
      onCancel={handleCancel}
      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
    >
      <Button disabled={!account?.User} danger onClick={showPopconfirm}>
        Effacer l'utilisateur
      </Button>
    </Popconfirm>
  );
}
function DeleteAccount({ accountId }: AccountOptionProps) {
  const { data: account, isSuccess } = usePrismaQueryOne("account", {
    where: { id: accountId || -1 },
  });
  const { mutate } = usePrismaQueryDeleteOne(
    "account",
    (_: void) => ({ id: accountId || -1 }),
    {
      notificationOnSuccess: "le compte a bien été effacer!",
      invalidateQueryOnsuccess: ["account", "user"],
    }
  );
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    mutate(undefined, {
      onSuccess() {
        setOpen(false);
        setConfirmLoading(false);
      },
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };
  if (!account && isSuccess) return null;
  return (
    <Popconfirm
      title="Confirmation"
      description="Est ce que vous êtes sûr de vouloir effacer cette compte ?"
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading, danger: true }}
      okText="Oui, Je Confirme"
      cancelText="Annuler"
      onCancel={handleCancel}
      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
    >
      <Button danger onClick={showPopconfirm}>
        Effacer ce Compte
      </Button>
    </Popconfirm>
  );
}
