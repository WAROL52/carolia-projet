"use client";
import { signIn, signOut, useSession } from "next-auth/react";
export function useAuthentification() {
  const { data: session, status, update } = useSession();
  return {
    status,
    update,
    session,
    signIn,
    signOut,
  };
}
