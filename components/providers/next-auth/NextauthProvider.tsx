import React from "react";
import { SessionProviderComponent } from "./SessionProviderComponent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import "server-only";

export type NextauthProviderProps = React.PropsWithChildren;

export async function NextauthProvider({ children }: NextauthProviderProps) {
  const session = await getServerSession(authOptions);
  console.log({ session });

  return (
    <SessionProviderComponent session={session}>
      {children}
    </SessionProviderComponent>
  );
}
