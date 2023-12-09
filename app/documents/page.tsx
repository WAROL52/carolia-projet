import { PageComponentProps } from "@/configs/types/componentsPropsType";
import { Button, Flex } from "antd";
import React from "react";
import { DocumentManager } from "./DocumentManager";
import { S3Client, PutObjectCommand, S3 } from "@aws-sdk/client-s3";
type Props = PageComponentProps;
import { Client } from "minio";
// dossier:\documents

export default async function Page(props: Props) {
  // const minioClient = new Client({
  //   // endPoint: "http://127.0.0.1:9000",
  //   endPoint: "127.0.0.1",
  //   port: 9000,
  //   accessKey: "HjQFW6kHjQqM0E1eQyDM",
  //   secretKey: "NPZsv03u1B80P5VPX5hgFkkp7IA8T4Fl2Nrp3WTw",
  // });
  // // const buckets = await minioClient.listBuckets();
  // // console.log(buckets);
  // const result = await minioClient.makeBucket("mondossier");

  return <DocumentManager />;
}
