"use client";
import React, { useEffect } from "react";

import type { MenuProps } from "antd";
import { Menu, Space } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LoadingOutlined } from "@ant-design/icons";
import { privateRootes } from "@/configs/routes/privateRootes";

export type SiderMenuProps = {};

export function SiderMenu({}: SiderMenuProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedKey, setSelectedKey] = React.useState("");
  const pathname = usePathname();
  const onClick: MenuProps["onClick"] = (e) => {
    setSelectedKey(e.key);
  };
  useEffect(() => setIsLoading(false), [pathname]);

  return (
    <Menu
      theme="dark"
      onClick={onClick}
      style={{ width: 256 }}
      selectedKeys={[pathname]}
      mode="inline"
      onSelect={() => setIsLoading(true)}
      items={privateRootes.map((roote) => ({
        key: roote.url,
        label: (
          <Space>
            {roote.icon}
            <Link href={roote.url}>
              {roote.label}{" "}
              {selectedKey === roote.url && isLoading && <LoadingOutlined />}
            </Link>
          </Space>
        ),
      }))}
      className="rounded"
    />
  );
}
