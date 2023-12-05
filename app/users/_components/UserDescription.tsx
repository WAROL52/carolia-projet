"use client";
import { ShowerDate } from "@/components/antd/showers/ShowerDate";
import { TextComponent } from "@/components/antd/typography/TextComponent";
import { usePrismaQueryOne } from "@/lib/hooks/prisma/usePrismaQueryOne";
import { Descriptions } from "antd";
import dayjs from "dayjs";
import React from "react";

export type UserDescriptionProps = {
  accountId: number | null;
};

export function UserDescription({ accountId }: UserDescriptionProps) {
  const {
    data: account,
    isLoading,
    isFetching,
  } = usePrismaQueryOne("account", {
    where: { id: accountId || -1 },
    include: {
      User: true,
    },
  });
  return (
    <Descriptions
      title={`Information: ${account?.User ? "" : "(Pas encore inscrit)"}`}
      className="text-slate-50"
      column={2}
      items={[
        {
          key: "Email",
          label: <TextComponent>Email</TextComponent>,
          children: (
            <TextComponent text={account?.email} variantColorLevel={400} />
          ),
        },
        {
          key: "Code",
          label: <TextComponent>Code de validation</TextComponent>,
          children: (
            <TextComponent
              text={"* * * * * *"}
              variantColorLevel={400}
              copyable={{
                format: "text/plain",
                text: account?.token,
              }}
            />
          ),
        },
        {
          key: "Nom",
          label: <TextComponent>Nom</TextComponent>,
          children: (
            <TextComponent
              text={account?.User?.firstname}
              variantColorLevel={400}
            />
          ),
        },
        {
          key: "Prenom",
          label: <TextComponent>Prenom</TextComponent>,
          children: (
            <TextComponent
              text={account?.User?.lastname}
              variantColorLevel={400}
            />
          ),
        },
        {
          key: "Anniversaire",
          label: <TextComponent>Anniversaire</TextComponent>,
          children: (
            <TextComponent
              text={
                account?.User?.birthday &&
                dayjs(account?.User?.birthday).format("DD/MM/YYYY")
              }
              variantColorLevel={400}
            />
          ),
        },
        {
          key: "Lieu",
          label: <TextComponent>Lieu de naissance</TextComponent>,
          children: (
            <TextComponent
              text={account?.User?.bornAt}
              variantColorLevel={400}
            />
          ),
        },
        {
          key: "Date de création de compte",
          label: <TextComponent>Date de création de compte</TextComponent>,
          children: account?.createdAt && (
            <ShowerDate date={dayjs(account?.createdAt)} />
          ),
        },
        {
          key: "Date d'inscription",
          label: <TextComponent>Date d&apos;inscription</TextComponent>,
          children: account?.User?.createdAt && (
            <ShowerDate date={dayjs(account?.User?.createdAt)} />
          ),
        },
      ]}
    />
  );
}
