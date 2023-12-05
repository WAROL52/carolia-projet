"use client";
import { FieldTextComponent } from "@/components/antd/form/FieldTextComponent";
import { TextComponent } from "@/components/antd/typography/TextComponent";
import { usePrismaQueryOne } from "@/lib/hooks/prisma/usePrismaQueryOne";
import { Button, Divider, Flex, Form, Space, Spin } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import React, { useEffect } from "react";
import { dividerProps } from "./UserSetting";
import { LoadingOutlined } from "@ant-design/icons";
import { usePrismaQueryUpdateOne } from "@/lib/hooks/prisma/usePrismaQueryUpdateOne";
import isEqual from "lodash.isequal";
import { useAuthentification } from "@/lib/hooks/next-auth/useAuthentification";
export type AccountFormProps = {
  accountId: number | null;
};
type FormData = {
  email: string;
  name: string;
};
export function AccountForm({ accountId }: AccountFormProps) {
  const { signOut, session, update } = useAuthentification();
  const [form] = useForm();
  const {
    data: account,
    isLoading,
    isFetching,
    isSuccess,
    dataUpdatedAt,
  } = usePrismaQueryOne("account", { where: { id: accountId || -1 } });
  const { status, mutate } = usePrismaQueryUpdateOne(
    "account",
    { id: accountId || -1 },
    (data: FormData) => data,
    {
      notificationOnSuccess: "Mise a jour réussi!",
    }
  );
  const disabled = accountId === null || status === "pending" || isLoading;
  const resetFormData = () => form.setFieldsValue(account);
  useEffect(resetFormData, [dataUpdatedAt]);
  const data = {
    email: useWatch("email", form),
    name: useWatch("name", form),
  };
  const isEq = isEqual(data, {
    email: account?.email,
    name: account?.name,
  });
  if (!account && isSuccess) return null;
  return (
    <>
      <Divider {...dividerProps}>
        <Space>
          {isFetching && <LoadingOutlined />}
          Compte
        </Space>
      </Divider>
      <Spin spinning={isLoading}>
        <Form
          // @ts-ignore
          onFinish={(data: FormData) => mutate(data)}
          layout="vertical"
          form={form}
          className="border p-3"
          disabled={disabled}
        >
          <Flex vertical>
            <Flex style={{ width: "50%" }} vertical>
              <FieldTextComponent
                label={<TextComponent text="Email" variantColorLevel={300} />}
                name={"email"}
                rules={[{ type: "email" }]}
                required
              />
              <FieldTextComponent
                label={<TextComponent text="Nom" variantColorLevel={300} />}
                name={"name"}
                required
              />
            </Flex>
            <Flex justify="end" gap={12}>
              <Button onClick={resetFormData} disabled={disabled || isEq}>
                Annuler
              </Button>
              <Button
                htmlType="submit"
                disabled={disabled || isEq}
                loading={status === "pending"}
              >
                Enregister
              </Button>
            </Flex>
          </Flex>
        </Form>
      </Spin>
    </>
  );
}
