import prismaServerSide from "@/lib/prisma/prismaServerSide";
import { PrismaActionName, PrismaRequestBody, PrismaResponsetBody } from "@/lib/prisma/prismaType";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
const PrismaActionNameAffectatiion:PrismaActionName[]=["create","createMany","delete","deleteMany","update","updateMany","upsert"]
export async function POST(req: NextRequest) {
    const body = await req.json() as PrismaRequestBody || {}
    const model = prismaServerSide[body?.model || ""] || null as any
    if (!model) return NextResponse.json({
        error: `model invalide!'${body?.model}'`
    } as PrismaResponsetBody)
    // @ts-ignore
    const action = (model[body?.action || ""] || null) as any
    if (!action) return NextResponse.json({
        error: `action invalide!'${body?.action}'`
    } as PrismaResponsetBody)
    if (!(action instanceof Function)) {
        return NextResponse.json({
            error: `action n'est pas une fonction!'${body?.action}'`
        } as PrismaResponsetBody)
    }
    const res = await action(body.args)
    
    if(PrismaActionNameAffectatiion.includes( body?.action)){
        console.log(`
        [prismaRouterSide]______________________________________________________
        | database ${body?.action} detected !
        | "[revalidatePath]:"${body.pathName}
        ------------------------------------------------------------------------
        ________________________________________________________________________
        `);
        
        revalidatePath(body.pathName)
    }
    return NextResponse.json({
        data: res
    } as PrismaResponsetBody)
}