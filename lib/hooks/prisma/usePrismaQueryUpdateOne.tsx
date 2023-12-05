"use client";
import {
  PrismaClientType,
  PrismaModelNameUncapitalize,
} from "../../prisma/prismaType";
import { Prisma } from "@prisma/client";
import {
  PrismaQueryMutationOption,
  usePrismaQueryMutation,
} from "./usePrismaQueryMutation";

export function usePrismaQueryUpdateOne<
  T extends PrismaModelNameUncapitalize,
  A extends Prisma.Args<PrismaClientType[T], "update">,
  AR,
  R = Prisma.Result<PrismaClientType[T], A, "update">
>(
  modelName: T,
  where: A["where"],
  action: (args: AR) => A["data"],
  options?: PrismaQueryMutationOption<R>
) {
  return usePrismaQueryMutation(
    (prisma) => (args: AR) => {
      // @ts-ignore
      return prisma[modelName].update({
        where,
        data: action(args),
      }) as Promise<R>;
    },
    options
  );
}
