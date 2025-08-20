"use client"
import { useSession } from "next-auth/react";
import fi from "zod/v4/locales/fi.cjs";

 
export const useUser = ()=>{
    const {data:session,status} = useSession()
    return {session,status}
}

export async function fetchUserData(email:unknown,id:unknown) {
    try{
        if(!email || !id) return {error:"Missing email or id"}
        const response = await fetch(`http://localhost:3000/api/auth/custom/fetchuser`,{ 
            method:'POST',
            body:JSON.stringify({email,id})
        })
        const data = await response.json()
        if(data.err) return {error:data.error}
        else if(data.user) return {user:data}
    }
    catch(err){
        return {error:err}
    }

}