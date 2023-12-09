"use client";
import { ShowerDate } from "@/components/antd/showers/ShowerDate";
import { TextComponent } from "@/components/antd/typography/TextComponent";
import {
  AppstoreOutlined,
  BarsOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { S3 } from "@aws-sdk/client-s3";
import { Button, Card, Dropdown, Flex, Segmented, Space, Table } from "antd";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import React, { ReactNode, useEffect } from "react";

export type DocumentManagerLayout = "card" | "list";
export type DocumentFile = {
  name: string;
  size: number;
  type: string;
  icon?: ReactNode;
};
export type DocumentManagerProps = {
  layout?: DocumentManagerLayout;
};

export function DocumentManager({
  layout: layoutProps = "list",
}: DocumentManagerProps) {
  const test = async () => {
    const client = new S3({
      region: "rolio",
      endpoint: "http://127.0.0.1:9000",
      credentials: {
        accessKeyId: "HjQFW6kHjQqM0E1eQyDM",
        secretAccessKey: "NPZsv03u1B80P5VPX5hgFkkp7IA8T4Fl2Nrp3WTw",
      },
    });

    const result = await client.listBuckets({});
    const buckets = result.Buckets;
    console.log({ buckets });
  };
  useEffect(() => {
    test();
  }, []);
  const [layout, setLayout] = React.useState(layoutProps);
  useEffect(() => setLayout(layoutProps), [layoutProps]);
  return (
    <Card
      title="Disque nuagique"
      extra={
        <Space>
          <Button>Créer un dossier</Button>
          <Button>Téléverser</Button>
          <Segmented
            // @ts-ignore
            onChange={setLayout}
            value={layout}
            options={[
              { value: "list", icon: <BarsOutlined /> },
              { value: "card", icon: <AppstoreOutlined /> },
            ]}
          />
        </Space>
      }
      rootClassName="bg-slate-700"
    >
      {layout === "card" ? <CardElement /> : <ListElement />}
    </Card>
  );
}

function ListElement() {
  return (
    <Table
      className="bg-slate-700"
      rootClassName="bg-slate-700"
      rowClassName={"bg-slate-500"}
      size="small"
      dataSource={[
        {
          name: "folder 1",
          key: 1,
          size: 1234,
          type: "folder",
          createAt: new Date(),
        },
        {
          name: "folder 2",
          key: 2,
          size: 1234,
          type: "folder",
          createAt: new Date(),
        },
        {
          name: "folder 3",
          key: 9,
          size: 1234,
          type: "folder",
          createAt: new Date(),
        },
        {
          name: "folder 4",
          key: 4,
          size: 1234,
          type: "folder",
          createAt: new Date(),
        },
        {
          name: "folder 5",
          key: 5,
          size: 1234,
          type: "folder",
          createAt: new Date(),
        },
        {
          name: "folder 6",
          key: 6,
          size: 1234,
          type: "folder",
          createAt: new Date(),
        },
        {
          name: "folder 7",
          key: 7,
          size: 1234,
          type: "folder",
          createAt: new Date(),
        },
        {
          name: "folder 8",
          key: 8,
          size: 1234,
          type: "folder",
          createAt: new Date(),
        },
        {
          name: "folder 9",
          key: 9,
          size: 1234,
          type: "folder",
          createAt: new Date(),
        },
      ]}
      columns={[
        {
          dataIndex: "name",
          width: "40%",
          key: "name",
          title: "Nom",
          render(value, record, index) {
            return (
              <Space>
                <FolderIcon />
                <TextComponent
                  className="font-semibold"
                  variantColorLevel={800}
                  text={record.name}
                />
              </Space>
            );
          },
        },
        {
          dataIndex: "Taille",
          key: "Taille",
          title: "Taille",
          render(value, record, index) {
            return (
              <Space>
                <TextComponent
                  className="font-semibold"
                  variantColorLevel={800}
                  text={record.size}
                />
              </Space>
            );
          },
        },
        {
          dataIndex: "Type",
          key: "Type",
          title: "Type",
          render(value, record, index) {
            return (
              <Space>
                <TextComponent
                  className="font-semibold"
                  variantColorLevel={800}
                  text={record.type}
                />
              </Space>
            );
          },
        },
        {
          dataIndex: "date",
          key: "date",
          title: "Date d'ajout",
          render(value, record, index) {
            return (
              <Space>
                <ShowerDate date={dayjs(record.createAt)} />
              </Space>
            );
          },
        },
        {
          dataIndex: "option",
          key: "option",
          title: "Option",
          render(value, record, index) {
            return (
              <Space>
                <ElementMenu />
              </Space>
            );
          },
        },
      ]}
    />
  );
}
function ElementMenu() {
  return (
    <Dropdown
      trigger={["click"]}
      menu={{
        items: [
          {
            key: "RENAME",
            label: "Renomer",
          },
          {
            key: "123",
            type: "divider",
          },
          {
            danger: true,
            key: "DELETE",
            label: "Supprimer",
          },
        ],
      }}
    >
      <Button
        type="text"
        onClick={(e) => {
          e.preventDefault();
        }}
        icon={<MoreOutlined />}
        size="small"
      />
    </Dropdown>
  );
}
function CardElement() {
  return (
    <Flex justify="left" wrap="wrap" gap={16} className="mx-auto">
      <Element />
      <Element />
      <Element />
      <Element />
      <Element />
      <Element />
      <Element />
      <Element />
      <Element />
      <Element />
      <Element />
      <Element />
      <Element />
      <Element />
      <Element />
      <Element />
      <Element />
      <Element />
      <Element />
      <Element />
      <Element />
      <Element />
      <Element />
      <Element />
    </Flex>
  );
}

function Element() {
  return (
    <motion.div
      className="hover:border-3 hover:border-red-300 select-none text-center rounded-lg shadow bg-slate-400 cursor-pointer hover:bg-slate-300"
      drag
      dragConstraints={{
        top: -1,
        left: -1,
        right: 1,
        bottom: 1,
      }}
      whileHover={{ scale: 1.04 }}
      // whileTap={{ scale: 0.999 }}
    >
      <Flex
        style={{
          width: 90,
          //   height: 90,
        }}
        vertical
        justify="space-evenly"
      >
        <Flex justify="end">
          <ElementMenu />
        </Flex>
        <Flex justify="center">
          <FolderIcon size={48} />
        </Flex>
        <div>footer</div>
      </Flex>
    </motion.div>
  );
}
type FolderIconProps = {
  size?: number;
};
function FolderIcon({ size = 32 }: FolderIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      className="text-slate-700 shadow-sm"
      viewBox="0 0 16 16"
    >
      <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3m-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981z" />
    </svg>
  );
}
