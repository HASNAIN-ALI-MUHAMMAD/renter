"use client"
import {  ChangeEvent, FormEvent, ReactNode, useState } from "react"
import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"
import { spData } from "../utils/auth_utils"
import { siData } from "../utils/auth_utils"
import { validateSignUp } from "../utils/auth_utils"
import { validateSignIn } from "../utils/auth_utils"


export default function CustomAuth(){
    const [formState,setFormState] = useState("signUp")
    const [loading,setLoading] = useState<string>("")

    const handelStateChange  = (btn:string)=>{
        if(btn === "signIn") {
            if(formState ==="signUp"){
                setLoading("signIn")
                setFormState("signIn")
                setTimeout(()=>{
                    return setLoading("")
                },250)
            } 
        }
        else if(btn==="signUp"){
            if(formState ==="signIn"){
                setLoading("signUp")
                setFormState("signUp")
                setTimeout(()=>{
                    return setLoading("")
                },250)
            }
        }
        return
    }

    return(
        <div className="border-1 text-gray-900 bg-gray-500 border-gray-600 w-100 h-110 rounded-lg">
            <div className="w-full h-15 flex flex-row p-2 justify-center items-center">
                <ButtonGroup size="medium" fullWidth>
                    <Button onClick={()=>handelStateChange("signUp")} variant={formState ==="signUp" ? "text" :"outlined"} loading={loading === "signUp"} color={formState === "signUp" && "inherit" || "inherit" }>
                        Sign Up
                    </Button>
                    <Button onClick={()=>handelStateChange("signIn")}  variant={formState ==="signIn" ? "text" :"outlined"} color={formState === "signIn" && "inherit" || "inherit" } loading={loading==="signIn"}>
                        Sign In
                    </Button>
                </ButtonGroup>
            </div>
            <div>
                {
                    formState === "signUp" ? <SignUp/> : <SignIn/>

                }
            </div>
        </div>
    )
}


// signup form function...

function SignUp(){
    const [spData,setSpData] = useState<spData>({
        email:"",
        password:"",
        confirmPassword:""
    })
    
    const handleSubmit = (e:FormEvent,data:spData)=>{
        e.preventDefault()
        try {
            const res = Promise.resolve(validateSignUp(data))
            res.then((data)=>{
                if(data.error) return alert(data.error)
                else if(data.message) return alert(data.message)
            })
        } catch (err) {
            console.log(err)
        }
        console.log("------Data to submit------")
        console.log(spData)
    }
    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        return setSpData({
            ...spData,
            [e.target.name as keyof spData]:e.target.value
        })
    }
    console.log(spData)

    return(
        <div className="w-full h-full p-2">
            <p className="text-center text-lg text-gray-900">Sign Up with us!</p>
            <form className="flex flex-col p-2 gap-4">
                <div className="w-60 text-lg">
                    <label htmlFor="email">Enter your email</label>
                    <input type="email" name="email" id="email" onChange={(e:ChangeEvent<HTMLInputElement>)=>handleChange(e)}
                    className="w-90 p-2 rounded-lg ouline-none text-md border-gray-200 border-1" autoFocus autoComplete="off"/>
                </div>
                <div className="w-60 flex flex-col gap-2 justify-center items-center">
                    <div className="w-60 text-lg">
                        <label htmlFor="password">Create a password</label>
                        <input type="password" name="password" id="password" onChange={(e:ChangeEvent<HTMLInputElement>)=>handleChange(e)}
                        className="w-90 p-2 rounded-lg ouline-none text-md border-gray-200 border-1"/>
                    </div>
                    <div className="w-60 text-lg">
                        <label htmlFor="confirmPassword">Confirm your password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" onChange={(e:ChangeEvent<HTMLInputElement>)=>handleChange(e)}
                        className="w-90 p-2 rounded-lg ouline-none text-md border-gray-200 border-1"/>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center p-1">
                    <ButtonCustom onClick={(e:FormEvent)=>handleSubmit(e,spData)} type="submit">Create an account</ButtonCustom>
                </div>
            </form>
        </div>

    )
}


// signin form function

function SignIn(){
    const [siData,setSiData] = useState<siData>({
        email:"",
        password:""
    })
    const handleSubmit = (e:FormEvent,data:siData)=>{
        e.preventDefault()
        try {
            const res = Promise.resolve(validateSignIn(data))
            res.then((val)=>console.log(val.message || val.error))
        } catch (err) {
            console.log(err)
        }
        console.log("------Data to submit------")
        console.log(siData)
    }
    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        return setSiData({
            ...siData,
            [e.target.name as keyof spData]:e.target.value
        })
    }
    console.log(siData)
    return(
        <div className="w-full h-full p-2">
            <h1 className="text-center text-lg p-2 text-gray-900">Signing you in!</h1>
            <form className="flex flex-col px-2 gap-3">
                <div className="w-60 text-lg">
                    <label htmlFor="email">Enter your email</label>
                    <input type="text" name="email" id="email" onChange={(e:ChangeEvent<HTMLInputElement>)=>handleChange(e)} autoFocus autoComplete="off"
                    className="w-90 p-2 rounded-lg ouline-none text-md border-gray-200 border-1"/>
                </div>
                <div className="w-60 flex flex-col justify-center items-center">
                    <div className="w-60 text-lg">
                        <label htmlFor="password">Enter your password</label>
                        <input type="password" name="password" id="password" onChange={(e:ChangeEvent<HTMLInputElement>)=>handleChange(e)}
                        className="w-90 p-2 rounded-lg ouline-none text-md border-gray-200 border-1"/>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center p-5">
                    <ButtonCustom onClick={(e)=>handleSubmit(e,siData)} type="submit">Sign In</ButtonCustom>
                </div>
            </form>
        </div>
    )
}

// custom button
export function ButtonCustom({onClick,type,link,children}:{onClick:(e:FormEvent)=>void,children:ReactNode,type:"submit"|"button",link?:string}){
    return(
        // <button type={type} onClick={onClick} className="bg-gray-400 w-50 rounded-md p-2 text-center hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-300">
        //     {text}
        // </button>
        <Button onClick={onClick} type={type} size="large" color="inherit" href={link} variant="outlined">
            {children}
        </Button>
    )
}