import { PageComponentProps } from "@/configs/types/componentsPropsType";
import { Button, Flex } from "antd";
import React from "react";
import { DocumentManager } from "./DocumentManager";
type Props = PageComponentProps;

// dossier:\documents
export default async function Page(props: Props) {
  return <DocumentManager />;
}
