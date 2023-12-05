"use client";

import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { usePrismaClientSide } from "../../prisma/prismaHooks";
import { PrismaServerSide } from "../../prisma/prismaType";

type PrismaQueryFunc<T> = (prisma: PrismaServerSide) => Promise<T>;

export function usePrismaQuery<T>(
  query: PrismaQueryFunc<T>,
  options?: UseQueryOptions<T>
) {
  const prisma = usePrismaClientSide();
  const queryFn = () => query(prisma.prismaClientSide);
  const result = useQuery({
    ...options,
    queryKey: options?.queryKey || [],
    queryFn,
  });
  return {
    ...result,
    loading: result.isLoading,
    refresh: () => result.refetch(),
  };
}
