import { S3 } from "@aws-sdk/client-s3";

export const clientS3 = new S3({
  region: "rolio",
  endpoint: "http://127.0.0.1:9000",
  credentials: {
    accessKeyId: "HjQFW6kHjQqM0E1eQyDM",
    secretAccessKey: "NPZsv03u1B80P5VPX5hgFkkp7IA8T4Fl2Nrp3WTw",
  },
});
