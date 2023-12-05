"use client";
import {
  Alert,
  Button,
  Flex,
  Form,
  Input,
  List,
  Spin,
  notification,
} from "antd";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import { usePrismaQueryMany } from "@/lib/hooks/prisma/usePrismaQueryMany";
import { FieldTextComponent } from "@/components/antd/form/FieldTextComponent";
import { FieldDateComponent } from "@/components/antd/form/FieldDateComponent";
import { usePrismaQueryMutation } from "@/lib/hooks/prisma/usePrismaQueryMutation";
import { Dayjs } from "dayjs";
import { useAuthentification } from "@/lib/hooks/next-auth/useAuthentification";
export type RegisterFormProps = {};

type FormData = {
  email: string;
  token: string;
  firstname: string;
  lastname: string;
  password: string;
  birthday?: Dayjs;
  bornAt?: string;
};
type AlertType = string;
export function RegisterForm({}: RegisterFormProps) {
  const { status: sessionStatus } = useAuthentification();
  const { push } = useRouter();

  const [alert, setAlert] = React.useState<AlertType | null>(null);
  const { mutate, status } = usePrismaQueryMutation(
    (prisma) =>
      async ({
        email,
        birthday,
        bornAt,
        firstname,
        lastname,
        password,
        token,
      }: FormData) => {
        const account = await prisma.account.findUnique({
          where: { email, token },
          include: {
            User: true,
          },
        });

        if (!account) {
          setAlert("email ou Code de vérification introuvable!");
          return null;
        }
        if (account.User) {
          setAlert("Il semble que vous êtes déja inscrit avec cette email!");
          return null;
        }
        const user = await prisma.user.create({
          data: {
            firstname,
            lastname,
            password,
            accountId: account.id,
            birthday: birthday?.toDate(),
            bornAt,
          },
        });
        notification.success({
          message: "Création de compte reussi!",
          description: "Votre compte a été correctement créer",
        });
        signIn("credentials", {
          callbackUrl: "/",
          email,
          password,
        });
        return user;
      }
  );
  const disabled = status == "pending" || !!alert;
  if (sessionStatus === "authenticated") {
    push("/");
    return <Alert description="Vous déja authentifié!" type="warning" />;
  }
  return (
    <>
      {alert && (
        <Alert
          message={alert}
          closable
          onClose={() => setAlert(null)}
          type="error"
        />
      )}
      <Form
        onFinish={(data: FormData) => {
          console.log(data);

          mutate(data);
        }}
        disabled={disabled}
        layout="vertical"
      >
        <FieldTextComponent
          label={<span className="text-white">Email</span>}
          name={"email"}
          rules={[{ type: "email" }]}
          required
        />
        <FieldTextComponent
          label={<span className="text-white">Code de vérification </span>}
          name={"token"}
          rules={[{ len: 6 }]}
        />
        <Flex justify="space-between">
          <FieldTextComponent
            label={<span className="text-white">Nom</span>}
            name={"firstname"}
            required
          />
          <FieldTextComponent
            label={<span className="text-white">Prenom</span>}
            name={"lastname"}
            required
          />
        </Flex>
        <Flex justify="space-between" gap={8}>
          <Form.Item
            label={<span className="text-white">Mots de passe</span>}
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6 },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            dependencies={["password"]}
            label={<span className="text-white">Confirmations</span>}
            name={"passwordConfirm"}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Flex>
        <Flex justify="space-between">
          <FieldDateComponent
            name={"birthday"}
            label={<span className="text-white">Anniversaire</span>}
          />
          <FieldTextComponent
            label={<span className="text-white">Lieu</span>}
            name={"bornAt"}
          />
        </Flex>
        <Button
          loading={status == "pending"}
          htmlType="submit"
          className="text-white"
          block
        >
          Create an account
        </Button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Login here
          </Link>
        </p>
      </Form>
      {/* <ListUser /> */}
    </>
  );
}
function ListUser() {
  const { data: users, isLoading, isFetching } = usePrismaQueryMany("user");
  return (
    <>
      {isFetching && <Spin spinning />}
      <List
        loading={isLoading}
        dataSource={users}
        renderItem={({ firstname }) => firstname}
      />
    </>
  );
}
