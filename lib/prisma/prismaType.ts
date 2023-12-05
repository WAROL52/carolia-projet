import { Prisma, PrismaClient, } from "@prisma/client";
import prismaServerSide from "./prismaServerSide";
import { Session } from "next-auth";
import { Operation } from "@prisma/client/runtime/library";

export type PrismaModelName = Prisma.ModelName
export type PrismaModelNameUncapitalize = Uncapitalize<Prisma.ModelName>

export type PrismaArgs<M extends PrismaModelNameUncapitalize,A extends PrismaOperationName>=Prisma.Args<PrismaClient[M],A>



export type PrismaResult<M extends PrismaModelNameUncapitalize,F extends PrismaOperationName, A extends PrismaArgs<M,F>>=Prisma.Result<PrismaClient[M],A,F>
export type PrismaClientType = {
    [x in PrismaModelNameUncapitalize]: PrismaClient[Uncapitalize<x>]
}
// export type PrismaIncludeType<T extends PrismaModelName>=Parameters<>
export type PrismaActionName = Prisma.PrismaAction
export type PrismaOperationName = Operation




export type PrismaArgsFlated = {
    [k: string]: string
}
export type PrismaInclude<M extends PrismaModelNameUncapitalize> = "include" extends keyof Required<PrismaArgs<M, "findFirst">> ? PrismaArgs<M, "findFirst">["include"] : never


export type PrismaRequestBody = {
    model: PrismaModelNameUncapitalize,
    action: PrismaActionName,
    args?: object
    session?: Session
    pathName:string
}

export type PrismaResponsetBody = {
    data: null | object
    error: null | string
}
export type PrismaServerSideType = typeof prismaServerSide
export type PrismaServerSide = typeof prismaServerSide
