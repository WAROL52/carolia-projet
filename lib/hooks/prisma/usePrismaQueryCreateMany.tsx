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

export function usePrismaQueryCreateMany<
  T extends PrismaModelNameUncapitalize,
  A extends Prisma.Args<PrismaClientType[T], "createMany">,
  AR,
  R = Prisma.Result<PrismaClientType[T], A, "createMany">
>(
  modelName: T,
  action: (args: AR) => A["data"],
  skipDuplicates?: boolean,
  options?: PrismaQueryMutationOption<R>
) {
  return usePrismaQueryMutation(
    (prisma) => (args: AR) => {
      // @ts-ignore
      return prisma[modelName].createMany({
        data: action(args),
        skipDuplicates,
      }) as Promise<R>;
    },
    options
  );
}
