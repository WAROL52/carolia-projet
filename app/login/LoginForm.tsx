"use client";
import { Alert, Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import Link from "next/link";
import { FieldTextComponent } from "@/components/antd/form/FieldTextComponent";
import { useAuthentification } from "@/lib/hooks/next-auth/useAuthentification";
import { usePathname, useRouter } from "next/navigation";
export type LoginFormProps = {};

export function LoginForm({}: LoginFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const pathname = usePathname();
  const { push } = useRouter();
  useEffect(() => setIsLoading(false), [pathname]);
  const { signIn, status } = useAuthentification();
  if (status === "authenticated") {
    push("/");
    return <Alert description="Vous déja authentifié!" type="warning" />;
  }
  return (
    <Form
      layout="vertical"
      disabled={isLoading}
      onFinish={(data) => {
        setIsLoading(true);
        signIn("credentials", { callbackUrl: "/", ...data });
      }}
    >
      <FieldTextComponent
        label={<span className="text-white">Email</span>}
        name={"email"}
        rules={[{ type: "email" }]}
        required
      />
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
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              checked
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="remember"
              className="text-gray-500 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
        </div>
        <Link
          href="/forget-password"
          className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Forgot password?
        </Link>
      </div>
      <Button loading={isLoading} htmlType="submit" className=" my-2" block>
        Se connecter
      </Button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet?{" "}
        <Link
          href="/register"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Sign up
        </Link>
      </p>
    </Form>
  );
}
