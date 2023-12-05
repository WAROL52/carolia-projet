"use client"
import { useSession, } from "next-auth/react";
import axios from "axios"
import { PrismaRequestBody, PrismaResponsetBody, PrismaServerSide, PrismaServerSideType } from "./prismaType";


export type FetchProps = PrismaRequestBody
export type InitPrismaClientSideProps = {
    fnFetch: (body: FetchProps) => Promise<any>
    pathName:string
}
export async function postPrismaRequest(body: PrismaRequestBody) {
    return await axios.post<PrismaResponsetBody>("/api/prismaRouterSide", body)
}
export function initPrismaClientSide({ fnFetch,pathName }: InitPrismaClientSideProps): () => PrismaServerSide {
    return () => {
        const session = useSession() || undefined
        return new Proxy({}, {
            get(target, model, receiver) {
                return new Proxy({}, {
                    get(target, action, receiver) {
                        return async (args: any) => {
                            // @ts-ignore
                            return await fnFetch({ action, model, args, session,pathName })
                        }
                    },
                })
            },
        }) as unknown as PrismaServerSide
    }
}


