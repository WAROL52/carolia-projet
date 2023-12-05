import { PageComponentProps } from "@/configs/types/componentsPropsType";
import React from "react";
import { UserManager } from "./_components/UserManager";
type Props = PageComponentProps;

// dossier:\users
export default async function Page(props: Props) {
  return <UserManager />;
}
