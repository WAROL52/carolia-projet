"use client";

import { clientS3 } from "@/configs/s3/clientS3";
import { _Object } from "@aws-sdk/client-s3";
import { useQuery } from "@tanstack/react-query";

export type useS3ObjectsProps = {
  bucketName: string | null;
};
export type S3Object = _Object;
export function useS3Objects({ bucketName }: useS3ObjectsProps) {
  const {
    data: listS3Objects = [],
    dataUpdatedAt: dataS3ObjectsUpdatedAt,
    isLoading: isS3ObjectsLoading,
    isFetching: isS3ObjectsFetching,
  } = useQuery({
    enabled: !!bucketName,
    queryKey: ["s3Object", "list", bucketName],
    queryFn: async () => {
      const result = await clientS3.listObjects({
        Bucket: bucketName!,
        OptionalObjectAttributes: ["RestoreStatus"],
        Prefix: "",
      });
      //   clientS3.
      return result.Contents || [];
    },
    staleTime: 0,
  });
  return {
    listS3Objects,
    dataS3ObjectsUpdatedAt,
    isS3ObjectsLoading,
    isS3ObjectsFetching,
  };
}
// repertoire
