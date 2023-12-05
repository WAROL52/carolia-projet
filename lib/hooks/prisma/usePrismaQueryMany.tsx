"use client";
import { UseQueryOptions } from "@tanstack/react-query";
import {
  PrismaArgs,
  PrismaModelNameUncapitalize,
  PrismaResult,
} from "../../prisma/prismaType";
import { useLazyArgs } from "./useLazyArgs";
import { usePrismaQuery } from "./usePrismaQuery";

export function usePrismaQueryMany<
  T extends PrismaModelNameUncapitalize,
  A extends PrismaArgs<T, "findMany">
>(
  modelName: T,
  args?: A,
  option?: UseQueryOptions<PrismaResult<T, "findMany", A>>
) {
  const lazyArgs = useLazyArgs(args);
  return usePrismaQuery(
    (prisma) =>
      // @ts-ignore
      prisma[modelName].findMany(lazyArgs),
    {
      staleTime: 60000,
      ...option,
      queryKey: [modelName, "findMany", lazyArgs, ...(option?.queryKey || [])],
    }
  );
}
