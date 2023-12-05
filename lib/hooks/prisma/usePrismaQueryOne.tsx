"use client";
import { UseQueryOptions } from "@tanstack/react-query";
import {
  PrismaClientType,
  PrismaModelNameUncapitalize,
} from "../../prisma/prismaType";
import { Prisma } from "@prisma/client";
import { useLazyArgs } from "./useLazyArgs";
import { usePrismaQuery } from "./usePrismaQuery";

export function usePrismaQueryOne<
  T extends PrismaModelNameUncapitalize,
  A extends Prisma.Args<PrismaClientType[T], "findUnique">,
  R = Prisma.Result<PrismaClientType[T], A, "findUnique">
>(modelName: T, args: A, option?: UseQueryOptions<R>) {
  const lazyArgs = useLazyArgs(args);
  return usePrismaQuery(
    (prisma) => {
      // @ts-ignore
      return prisma[modelName].findUnique(lazyArgs);
    },
    {
      staleTime: 15000,
      ...option,
      queryKey: [
        modelName,
        "findUnique",
        lazyArgs,
        ...(option?.queryKey || []),
      ],
    }
  );
}
