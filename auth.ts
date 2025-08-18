import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { prisma } from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Role } from "@prisma/client";
import z from "zod";


const credentialsZod = z.object({
    email:z.email(),
    password:z.string().min(8).max(14)
})
export const {handlers ,signIn,signOut,auth} = NextAuth({
    providers: [
        CredentialsProvider({
          name:"Credentials",
          credentials:{
            email:{label:"Email",type:"text",placeholder:"email"},
            password:{label:"Password",type:"password"}
          },
          async authorize(credentials:Partial<Record<"email" | "password",unknown>>, request:Request) {
            const credentialsValidation = credentialsZod.safeParse(credentials);
            if(!credentialsValidation.success || !credentials.email){
                return null;
            }
            const user = await prisma.user.findFirst({
              where:{email:credentials?.email},
            });
            if(user) return {
                id:user.id,
                name:user.name || "",
                email:user.email,
                role:user.role || "",
                image:user.image || null,
            }
            else return null

        }
          }),
        Google({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
        
      ],
      adapter:PrismaAdapter(prisma),
      secret: process.env.AUTH_SECRET,
      pages:{signIn:"/buy",signOut:"/auth/login",newUser:"/dashboard",error:"/error"},
      session:{
        strategy:"jwt" as const,
        maxAge:24*60*60,
        updateAge:60*60
      },callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id ??"";
          token.role = user.role ?? "user";
        }
        return token;
      },
      async session({ session, token }) {
        session.user.id = token.id;
        session.user.role = token.role;
        return session;
      }
    },
    events:{
        async createUser({user}){
            console.log("New signin with email: ",user.email)
        },
        async linkAccount({user,account}){
            if(account.provider === "google"){
                await prisma.user.update({
                    where:{id:user.id},
                    data:{
                        role:Role.USER,
                        emailVerified:new Date()
                    }
                })
            }
            console.log("User: ",user.email," updated!")
        }
        }
})