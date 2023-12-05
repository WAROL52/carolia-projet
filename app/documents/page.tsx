import { PageComponentProps } from "@/configs/types/componentsPropsType";
import { Button, Flex } from "antd";
import React from "react";
type Props = PageComponentProps;

// dossier:\documents
export default async function Page(props: Props) {
  return (
    <Flex vertical justify="center">
      <Button>Effacer l'utilisateur</Button>
      <Button>Effacer ce Compte</Button>
    </Flex>
  );
}
