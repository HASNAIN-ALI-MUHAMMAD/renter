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
            password:{label:"Password",type:"password"},
          },
          async authorize(credentials:Partial<Record<"email" | "password",unknown>>, request:Request) {
            try {
                const credentialsValidation = credentialsZod.safeParse(credentials);
                if(!credentialsValidation.success || !credentials.email){
                    throw new Error("Invalid credentials");
                }
                const user = await prisma.user.findFirst({
                  where:{email:credentials.email},
                });
                if(user) return {
                    id:user.id,
                    name:user.name || "",
                    email:user.email,
                    role:user.role,
                    image:user.image || null,
                    emailVerified:user.emailVerified
                }
                else throw new Error("User not found");
              
            } catch (err) {
              console.error(err)
              throw err
            }
        }
          }),
        Google({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
        
      ],
      adapter:PrismaAdapter(prisma),
      secret: process.env.AUTH_SECRET,
      session:{
        strategy:"jwt" as const,
        maxAge:60*60*24*15,
        updateAge:60*60*5
      },callbacks: {
      async jwt({ token, user,trigger,session }) {
        if (user) {
          token.id = user.id ??"";
          token.role = user.role;
          token.emailVerified =user.emailVerified;
        }
        if(trigger === "update" && session.emailVerified !== undefined) token.emailVerified = session.emailVerified
        return token;
      },
      async session({ session,token }) {
        if(token){
          session.user.id = token.id;
          session.user.role = token.role;
          session.user.emailVerified = token.emailVerified
        }
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
        },
        async signIn({user}){
            console.log("New signIn by the user: ",user.email)
        }
      },
      pages:{signIn:"/dashboard",signOut:"/auth/login",newUser:"/dashboard",error:"/error"}

})