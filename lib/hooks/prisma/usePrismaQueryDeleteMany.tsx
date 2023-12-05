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

export function usePrismaQueryDeleteMany<
  T extends PrismaModelNameUncapitalize,
  A extends Prisma.Args<PrismaClientType[T], "deleteMany">,
  AR,
  R = Prisma.Result<PrismaClientType[T], A, "deleteMany">
>(
  modelName: T,
  where: (arg: AR) => A["where"],
  options?: PrismaQueryMutationOption<R>
) {
  return usePrismaQueryMutation(
    (prisma) => (arg: AR) => {
      // @ts-ignore
      return prisma[modelName].deleteMany({
        where: where(arg),
      }) as Promise<R>;
    },
    options
  );
}
