"use client";
import React, { PropsWithChildren } from "react";
import { HeaderComponent } from "./header/HeaderComponent";
import { SiderComponent } from "./sider/SiderComponent";
import { useSession, signIn } from "next-auth/react";
export type LayoutComponentProps = PropsWithChildren;

export function LayoutComponent({ children }: LayoutComponentProps) {
  const { status } = useSession();
  if (status === "unauthenticated") {
    return children;
  }
  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">
      <HeaderComponent />
      <SiderComponent />
      <main className="p-4 md:ml-72 h-auto pt-20">{children}</main>
    </div>
  );
}
