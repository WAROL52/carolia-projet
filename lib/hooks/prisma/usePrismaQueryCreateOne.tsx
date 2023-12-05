"use client";

import {
  PrismaModelNameUncapitalize,
  PrismaClientType,
} from "@/lib/prisma/prismaType";
import { Prisma } from "@prisma/client";
import {
  PrismaQueryMutationOption,
  usePrismaQueryMutation,
} from "./usePrismaQueryMutation";

export function usePrismaQueryCreateOne<
  T extends PrismaModelNameUncapitalize,
  A extends Prisma.Args<PrismaClientType[T], "create">,
  AR,
  R = Prisma.Result<PrismaClientType[T], A, "create">
>(
  modelName: T,
  action: (args: AR) => A["data"],
  options?: PrismaQueryMutationOption<R>
) {
  return usePrismaQueryMutation(
    (prisma) => (args: AR) => {
      // @ts-ignore
      return prisma[modelName].create({
        data: action(args),
      }) as Promise<R>;
    },
    options
  );
}
