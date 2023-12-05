"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Alert } from "antd";
export type AuthGuardProps = React.PropsWithChildren;

export function AuthGuard({ children }: AuthGuardProps) {
  const { status } = useSession();
  const { push } = useRouter();
  const pathName = usePathname();
  if (
    !pathName.startsWith("/api") &&
    !["/login", "/register", "/forget-password"].includes(pathName) &&
    status === "unauthenticated"
  ) {
    push("/login");
    return (
      <Alert
        type="error"
        message="unauthenticated"
        description="Vous n'êtes pas authentifié!"
      />
    );
  }
  return children;
}
