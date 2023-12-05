"use client"
import { AxiosResponse } from "axios"
import { PrismaActionName, PrismaArgsFlated, PrismaModelName, PrismaRequestBody, PrismaResponsetBody } from "./prismaType";
import { useState } from "react";
import { initPrismaClientSide, postPrismaRequest } from "./prismaClientSide";
import { usePathname } from "next/navigation";
import { notification } from "antd";


export function usePrismaClientSide<T extends any>() {
    const pathName=usePathname()
    const [requestBody, setRequestBody] = useState<PrismaRequestBody>()
    const [prismaModelName, setPrismaModelName] = useState<PrismaModelName>()
    const [prismaActionName, setPrismaActionName] = useState<PrismaActionName>()
    const [prismaArgs, setPrismaArgs] = useState<object>()
    const [prismaArgsFlated, setPrismaArgsFlated] = useState<PrismaArgsFlated>()
    const [responseBody, setResponseBody] = useState<T | null>(null)
    const [responseAxios, setResponseAxios] = useState<AxiosResponse<PrismaResponsetBody, any>>()
    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState("")
    const prismaClientSide = initPrismaClientSide({
        pathName,
        async fnFetch(body) {
            setRequestBody(body)
            setPrismaModelName(body.model as PrismaModelName)
            setPrismaActionName(body.action as PrismaActionName)
            setPrismaArgs(body.args)
            setPrismaArgsFlated(body.args as PrismaArgsFlated)
            setIsFetching(true)
            try {
                const axiosResponse = await postPrismaRequest(body)
                setResponseAxios(axiosResponse)
                const prismaResponsetBody = axiosResponse.data
                const data = prismaResponsetBody.data
                setResponseBody(data as any)
                setError(prismaResponsetBody?.error || "")
                setIsFetching(false)
                return data
            } catch (error) {
                notification.error({
                    message:"Prisma Client Side",
                    description:String(error)
                })
                throw new Error(String(error))
            }
        },
    })()
    return {
        requestBody, responseBody, prismaClientSide, isFetching, prismaModelName, prismaActionName, prismaArgsFlated, prismaArgs, responseAxios, error
    }
}

