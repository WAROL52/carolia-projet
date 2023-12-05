"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { AuthGuard } from "./AuthGuard";
export type SessionProviderProps = React.PropsWithChildren<{
  session: Session | null;
}>;

export function SessionProviderComponent({
  children,
  session,
}: SessionProviderProps) {
  return (
    <SessionProvider session={session}>
      <AuthGuard>{children}</AuthGuard>
    </SessionProvider>
  );
}
