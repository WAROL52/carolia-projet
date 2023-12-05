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

export function usePrismaQueryUpdateMany<
  T extends PrismaModelNameUncapitalize,
  A extends Prisma.Args<PrismaClientType[T], "updateMany">,
  AR,
  R = Prisma.Result<PrismaClientType[T], A, "updateMany">
>(
  modelName: T,
  where: A["where"],
  action: (args: AR) => A["data"],
  options?: PrismaQueryMutationOption<R>
) {
  return usePrismaQueryMutation(
    (prisma) => (args: AR) => {
      // @ts-ignore
      return prisma[modelName].updateMany({
        where,
        data: action(args),
      }) as Promise<R>;
    },
    options
  );
}
