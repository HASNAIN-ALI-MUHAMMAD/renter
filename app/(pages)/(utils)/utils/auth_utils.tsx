import { signIn } from "next-auth/react"


export type spData = {
    email:string,
    password:string,
    confirmPassword:string
}

export type siData = {
    email:string,
    password:string,
}

export async function validateSignIn(data:siData){
    if(data.email === "") return {error:"Email field left empty!"}
    if(data.password === "") return {error:"Password field left empty!"}
    const {email,password}  = data;

    try {
        const res = await fetch("/api/auth/custom/signIn",{
            method:"POST",
            body:JSON.stringify({
                email:data.email,
                password:data.password
            })
        })
        const dataFetch = await res.json()
        console.log("Data fetched from signin api route: ",dataFetch)
        if(!res.ok || dataFetch?.error) return {error:dataFetch?.error}
        else if(res.status===200 && dataFetch.message==="continue"){
            await signIn("credentials",{email,password,redirect:true}).catch((err)=>console.log(err))
            return {message:"SignIn successfull!"}
        }
        return {message:"Something unexpected happened!"} 
    } catch (err) {
        console.log(err)
        return {error:err}
    }
}

export async function validateSignUp(data:spData) {
    const {email,password,confirmPassword} = data
    if(email ==="") return {error:"Email field left empty!"}
    if(password === "") return {error:"Password field left empty!"}
    if (confirmPassword === "") return {error:"Confirm Password field left empty!"}
    else if(password !== confirmPassword) return {error:"Password and Confirm password do not match!"}

    try {
        const res = await fetch("/api/auth/custom/signUp",{
            method:"POST",
            body:JSON.stringify({
                email:email,
                password:password,
                confirmPassword:confirmPassword
            })
        })
        const dataFetch = await res.json()
        console.log("Data fetched from signup api route: ",dataFetch)
        if(!res.ok || dataFetch?.error) return {error:dataFetch?.error}
        else if(res.status===200 && dataFetch.message === "continue"&& dataFetch.account){
            const res = await signIn("credentials",{email,password,redirect:false})
            if(res.error) return {error:res.error,res:res}
            return {message:"Account created successfully! Verify your email now!"}
        }
        return {message:"Something unexpected happened!"} 
    } catch (err) {
        console.log(err)
        return {error:err}
    }
}