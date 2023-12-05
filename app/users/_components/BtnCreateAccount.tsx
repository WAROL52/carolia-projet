"use client";
import { FieldTextComponent } from "@/components/antd/form/FieldTextComponent";
import { usePrismaQueryCreateOne } from "@/lib/hooks/prisma/usePrismaQueryCreateOne";
import { UserAddOutlined } from "@ant-design/icons";
import { Button, Drawer, Flex, Form, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { PropsWithChildren, useMemo } from "react";

export type BtnCreateAccountProps = {};

type FormData = {
  email: string;
  name: string;
};

export function BtnCreateAccount({}: BtnCreateAccountProps) {
  const [form] = useForm();
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const token = useMemo(() => Date.now().toString().slice(0, 6), []);

  const { mutate, status } = usePrismaQueryCreateOne(
    "account",
    (data: FormData) => ({
      ...data,
      token,
    }),
    {
      notificationOnSuccess: "Création d'un nouveau compte reussi!",
    }
  );
  return (
    <>
      <Button
        onClick={openDrawer}
        type="text"
        className="text-white"
        icon={<UserAddOutlined className="text-white" />}
      />
      <Drawer
        title={<span className="text-slate-50">Créer un nouveau compte</span>}
        className="bg-slate-800"
        classNames={{
          body: "bg-slate-800",
          header: "bg-slate-700 text-slate-100",
        }}
        open={open}
        onClose={closeDrawer}
      >
        <Form
          onFinish={(data: FormData) => {
            // @ts-ignore
            mutate(data, {
              onSuccess() {
                form.resetFields();
              },
            });
          }}
          disabled={status === "pending"}
          form={form}
          layout="vertical"
        >
          <FieldTextComponent
            label={<Text>Email</Text>}
            name={"email"}
            rules={[{ type: "email" }]}
            required
          />
          <FieldTextComponent label={<Text>Nom</Text>} name={"name"} required />
          <Flex gap={8} justify="center">
            <Button htmlType="reset" onClick={closeDrawer}>
              Annuler
            </Button>
            <Button loading={status === "pending"} htmlType="submit">
              Enregistrer
            </Button>
          </Flex>
        </Form>
      </Drawer>
    </>
  );
}
type TextProps = PropsWithChildren;
function Text({ children }: TextProps) {
  return <span className="text-slate-100"> {children} </span>;
}
