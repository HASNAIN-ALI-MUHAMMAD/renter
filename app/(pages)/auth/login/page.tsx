"use client"
import { signIn,signOut } from "next-auth/react"
import CustomAuth, { ButtonCustom } from "../../(utils)/components/CustomAuth"
import Link from "next/link"
import { useState } from "react" 

export default function Login() {
  return(

    <div className="flex flex-col bg-gray-600 p-1 m-0 h-full">
      <div className="bg-gray-500 w-full h-full min-h-screen rounded-lg flex flex-col p-2">
        <div className="w-full h-max flex flex-col items-center py-2 bg-gray-600 rounded-sm">
            <div className="w-full h-30 flex flex-col justify-center items-center">
              <p className="text-2xl text-center">Welcome to Renter!</p>
              <p className="text-lg text-center">In order to Continue you must <Link href={"#"}>Create an Account</Link> or <Link href={"#"}>Sign In</Link> to your account!</p>
            </div>
            <CustomAuth/>
            <p>or</p>

            <div className="flex gap-2 flex-col py-4">
              <ButtonCustom onClick={()=>signIn("google")} type="button">Continue with Google</ButtonCustom>
            </div>

        </div>
      </div>
    </div>
  )
}