import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req:NextRequest):Promise<NextResponse> {
    const {email,id} = await req.json();
    try {
        const user = await prisma.user.findFirst({
            where:{id:id,email:email},
            select:{verificationToken:true,tokenExpiry:true,createdAt:true,accounts:true}
        })
        if(!user) return NextResponse.json({error:"User not found!",user:null});
        return NextResponse.json({message:"User fetched!",user:user});
    } catch (err) {
        return NextResponse.json({error:err});
    }
}