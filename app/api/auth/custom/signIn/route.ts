import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt"
import { bodyZodSignIn } from "@/app/api/(utils)/schemasZod/signinZod";


export  async function POST(req:NextRequest) {
    const body = await req.json()
    const parsedBody = await bodyZodSignIn.safeParse(body)
    if(!parsedBody.success){
        return NextResponse.json({error:parsedBody.error.message,status:400})
    }
    const {email,password} = parsedBody.data
    console.log("Data received from ",req.url)
    console.log("Req Body: ",body)
    const isUser = await prisma.user.findFirst({
        where:{
            email:email
        },
        select:{
            id:true,
            password:true,
            email:true,
            
        }
    })
    if(!isUser){
        return NextResponse.json({error:"User not found!",status:401})
    }
    else if(isUser && isUser.password!==null){
        const isPasswordMatch = await bcrypt.compare(password,isUser.password)
        if(!isPasswordMatch){
            return NextResponse.json({error:"Password does not match!",status:401})
        }
        else if(isPasswordMatch && isUser){
            return NextResponse.json({message:"continue",status:200,user:isUser})
        }
    }
}