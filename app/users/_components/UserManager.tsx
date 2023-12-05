"use client";
import { Col, Row } from "antd";
import React from "react";
import { ListUser } from "./ListUser";
import { OverviewUser } from "./OverviewUser";

export type UserManagerProps = {};

export function UserManager({}: UserManagerProps) {
  const [userId, setUserId] = React.useState<number | null>(null);
  return (
    <Row gutter={16}>
      <Col span={24} lg={8}>
        <ListUser userId={userId} onSelectUser={setUserId} />
      </Col>
      <Col span={0} lg={16}>
        <OverviewUser accountId={userId} onClose={() => setUserId(null)} />
      </Col>
    </Row>
  );
}
