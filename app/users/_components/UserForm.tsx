"use client";
import { FieldTextComponent } from "@/components/antd/form/FieldTextComponent";
import { TextComponent } from "@/components/antd/typography/TextComponent";
import { Button, Divider, Flex, Form } from "antd";
import { Input } from "postcss";
import React, { useEffect } from "react";
import { dividerProps } from "./UserSetting";
import { usePrismaQueryOne } from "@/lib/hooks/prisma/usePrismaQueryOne";
import { useForm, useWatch } from "antd/es/form/Form";
import { FieldDateComponent } from "@/components/antd/form/FieldDateComponent";
import { usePrismaQueryUpdateOne } from "@/lib/hooks/prisma/usePrismaQueryUpdateOne";
import dayjs, { Dayjs } from "dayjs";

export type UserFormProps = {
  accountId: number | null;
};
type FormData = {
  firstname: string;
  lastname: string;
  birthday?: Dayjs;
  bornAt?: string;
};
export function UserForm({ accountId }: UserFormProps) {
  const [form] = useForm();
  const { data: account, dataUpdatedAt } = usePrismaQueryOne("account", {
    where: {
      id: accountId || -1,
    },
    include: {
      User: true,
    },
  });
  const { status, mutate } = usePrismaQueryUpdateOne(
    "account",
    { id: accountId || -1 },
    (data: FormData) => ({
      User: {
        update: {
          firstname: data.firstname,
          lastname: data.lastname,
          bornAt: data.bornAt,
          birthday: data.birthday && data.birthday?.toDate(),
        },
      },
    }),
    {
      notificationOnSuccess: "Mise a jour réussi!",
    }
  );
  useEffect(
    () =>
      form.setFieldsValue({
        ...account?.User,
        birthday: account?.User?.birthday && dayjs(account?.User.birthday),
      }),
    [dataUpdatedAt]
  );
  const isSame = {
    firstname: account?.User?.firstname === useWatch("firstname", form),
    lastname: account?.User?.lastname === useWatch("lastname", form),
    birthday: dayjs(useWatch("birthday", form)).isSame(account?.User?.birthday),
    bornAt: account?.User?.bornAt === useWatch("bornAt", form),
  };
  const disabledBtn = Object.values(isSame).every((is) => is as boolean);
  if (!account) return null;
  if (!account.User) return null;
  const disabled = status === "pending";
  return (
    <>
      <Divider {...dividerProps}>Utilisateur</Divider>
      <Form
        // @ts-ignore
        onFinish={(data: FormData) => mutate(data)}
        form={form}
        layout="vertical"
        className="border p-3"
        disabled={disabled}
      >
        <Flex gap={12}>
          <FieldTextComponent
            label={<TextComponent text="Nom" />}
            name={"firstname"}
            required
          />
          <FieldTextComponent
            label={<TextComponent text="Prenom" />}
            name={"lastname"}
            required
          />
        </Flex>
        <Flex gap={12}>
          <FieldDateComponent
            label={<TextComponent text="Anniversaire" />}
            name={"birthday"}
          />
          <FieldTextComponent
            label={<TextComponent text="Lieu de naissance" />}
            name={"bornAt"}
          />
        </Flex>
        <Flex gap={12} justify="end">
          <Button disabled={disabled || disabledBtn}>Annuler</Button>
          <Button
            disabled={disabled || disabledBtn}
            loading={status === "pending"}
            htmlType="submit"
          >
            Enregistrer
          </Button>
        </Flex>
      </Form>
    </>
  );
}
