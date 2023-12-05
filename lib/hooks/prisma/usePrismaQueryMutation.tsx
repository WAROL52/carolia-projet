"use client";
import {
  QueryClient,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { usePrismaClientSide } from "../../prisma/prismaHooks";
import { PrismaServerSide } from "@/lib/prisma/prismaType";
import { ReactNode } from "react";
import { notification } from "antd";
export type PrismaQueryMutateFunc<T, A> = (
  prisma: PrismaServerSide
) => (data: A) => Promise<T>;

export type PrismaQueryMutationOption<T> = UseMutationOptions<T> & {
  invalidateQueryOnsuccess?: string[];
  notificationOnSuccess?: ReactNode;
  notificationOnError?: ReactNode;
};
export function usePrismaQueryMutation<T, A>(
  query: PrismaQueryMutateFunc<T, A>,
  options?: PrismaQueryMutationOption<T>
) {
  const prisma = usePrismaClientSide();
  const queryClient = useQueryClient();
  const mutationFn = query(prisma.prismaClientSide);
  // @ts-ignore
  const queryOption = useMutation({
    ...options,
    mutationFn,
    onSuccess(_: any, _2: any, _3: any) {
      queryClient.invalidateQueries({ queryKey: [prisma.prismaModelName] });
      if (options?.onSuccess instanceof Function) options?.onSuccess(_, _2, _3);
      if (options?.invalidateQueryOnsuccess) {
        options?.invalidateQueryOnsuccess.map((key) =>
          queryClient.invalidateQueries({ queryKey: [key] })
        );
      }
      if (options?.notificationOnSuccess) {
        notification.success({
          message: "opération Reussi",
          description: options?.notificationOnSuccess,
        });
      }
    },
  });
  return {
    ...queryOption,
  };
}
