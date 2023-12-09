"use client";

import { clientS3 } from "@/configs/s3/clientS3";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useBuckets() {
  const {
    data: listBuckets = [],
    isLoading: isBucketsLoading,
    isFetching: isBucketsFetching,
  } = useQuery({
    queryKey: ["bucket", "list"],
    queryFn: async ({}) => {
      const result = await clientS3.listBuckets({});
      return result.Buckets || [];
    },
  });
  return {
    listBuckets,
    isBucketsLoading,
    isBucketsFetching,
  };
}
