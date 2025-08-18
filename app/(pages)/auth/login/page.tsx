"use client"
import { signIn,signOut } from "next-auth/react"
import CustomAuth, { ButtonCustom } from "../../(utils)/components/CustomAuth"
import Link from "next/link"
import { useState } from "react" 

export default function Login() {
  return(
    <div className="flex flex-col bg-gray-600 items-center min-h-screen py-2 gap-2">
      <div className="w-full h-30 flex flex-col justify-center items-center">
          <p className="text-2xl text-center">Welcome to Renter!</p>
          <p className="text-lg text-center">In order to Continue you must <Link href={"#"}>Create an Account</Link> or <Link href={"#"}>Sign In</Link> to your account!</p>
      </div>
      <CustomAuth/>
      <p>or</p>
      <div className="flex gap-2 flex-col">
        <ButtonCustom onClick={()=>signIn("google")} type="button">Continue with Google</ButtonCustom>
      </div>
    </div>
  )
}