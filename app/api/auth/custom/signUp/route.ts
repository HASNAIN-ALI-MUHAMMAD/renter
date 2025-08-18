import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto"
import bcrypt from "bcrypt"
import { Role } from "@prisma/client";
import { bodyZod } from "@/app/api/(utils)/schemasZod/signupZod";


export  async function POST(req:NextRequest) {
    try {
        // safe parsing the body with zod
        const body = await req.json()
        const parseZodBody  = await bodyZod.safeParse(body)
        if(!parseZodBody.success){
            return NextResponse.json({error:parseZodBody.error.message,status:400})
        }
        const {email,password} = await parseZodBody.data
        console.log("Data received from ",req.nextUrl.origin)
        console.log("Req Body: ",email)

        // check for email at prisma.user... 
        const isAlreadyUser = await prisma.user.findFirst({
            where:{
                email:email
            }
        })
        if(isAlreadyUser) return NextResponse.json({error:"User with email already exists!",status:401})
        // bcrypt password, create a random token for email verification...
        const hashedPassword = await bcrypt.hash(password,10);
        const verificationToken = crypto.randomBytes(32).toString("hex")
        const tokenExpiry = new Date(Date.now() + 1000 * 60 *20) // 20 minutes from now
        // save this temporary account and continue the user to dashboard for email verification process...also create an account as well
        try {
            const newUser = await prisma.user.create({
                data:{
                    email:email,
                    password:hashedPassword,
                    verificationToken:verificationToken,
                    tokenExpiry:tokenExpiry,
                    role:Role.USER
                }
            })
            return NextResponse.json({message:"continue",status:200,account:newUser})
        } catch (err) {
            console.log(err)
            return NextResponse.json({error:"Error creating account!",status:401,errorDetails:err})
        }            
    } catch (err) {
        return NextResponse.json({error:err,status:401})
    }
}
 // check if account already exists... 
 //     true ==> redirect to signIn
 // false ==> continue..
 // email verification ...
//      create a temporary custom account in prisma not verified...
//      show unverified status and recurrent message for verification and lesser access to features(unable to create a seller account and contact/add/bookmark properties...)
