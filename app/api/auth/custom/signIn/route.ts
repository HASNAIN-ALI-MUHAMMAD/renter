import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt"

export  async function POST(req:NextRequest) {
    const {email,password} = await req.json()
    console.log("Data received from ",req.url)
    console.log("Req Body: ",{email,password})
    const isUser = await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    if(!isUser){
        return NextResponse.json({error:"User not found!",status:401})
    }
    else if(isUser && isUser.password){
        const isPasswordMatch = await bcrypt.compare(password,isUser.password)
        if(!isPasswordMatch){
            return NextResponse.json({error:"Password does not match!",status:401})
        }
        else if(isPasswordMatch){
            return NextResponse.json({message:"continue",status:200})
        }
    }
    // compare bcrypted password and user password...and return message for signing in with the next-auth session
}