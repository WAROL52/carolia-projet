"use client";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
export default function Home() {
  const { data } = useSession();
  return <div>Bienvenue {data?.user?.name}</div>;
}
