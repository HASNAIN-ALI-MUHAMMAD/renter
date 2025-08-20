"use client"
import Link from "next/link";
import TopBar from "../(utils)/components/TopBar";
import LeftBar from "./components/LeftBar";
import { useEffect, useState } from "react";
import { STATE,EXTRAS } from "./components/LeftBar";
import Profile from "./components/Profile";
import { fetchUserData } from "../(utils)/utils/user_info._utils";
import { useUser } from "../(utils)/utils/user_info._utils";
import { useSearchParams } from "next/navigation";

export default function Dashboard() {
  const [user,setUser] = useState()
  const {session ,status} = useUser()
  const [error,setError] = useState<Error|undefined>(undefined)
  const {email,emailVerified,role,id,image,name} = {...session?.user}
  const [loading,setLoading] = useState<boolean>(true)
  console.log("User from session: ",session)
  const params = useSearchParams().get("verified")
  console.log("Params: ",params)
  
  useEffect(()=>{
    if(params === "true"){
      return
    }
    else if(loading &&(params === "false" || !emailVerified )){
      setLoading(false)
      return alert("Verify your email!")
    }
  },[params])


    const [state,setState] = useState<string>("profile");
    console.log("Current state: ",state)
    // useEffect(()=>{
    //   if(loading){
    //     (async ()=>{
    //       const data = await fetchUserData(id,email)
    //       setLoading(false)
    //       if(data?.error) return setError(data.error)
    //       else if(!data?.user) return setError(new Error("Failed fetching user details!",{cause:"User not found"}))
    //       setUser(data.user)
    //     })().catch((err)=>{
    //       console.log(err)
    //       setError(err)
    //   })
    //   }
    //   },[])
    
  return (
        <div className="bg-gray-600 w-full m-0 h-full p-1 text-gray-900 flex flex-col gap-5">
          <div className="bg-gray-500 w-full p-2 h-max min-h-screen rounded-lg flex flex-col gap-3">
            <div className="w-full h-150 bg-gray-600 rounded-sm flex flex-row p-2">
              <div className="w-1/5 h-full bg-gray-600 rounded-sm border-2 border-gray-500">
                <LeftBar setValue={setState} value={state}/>
              </div>
              <div className="w-4/5 h-full bg-gray-500 rounded-sm border-2 border-gray-700">
              {
                state === "profile" &&
                <div className="w-full h-full bg-gray-500 rounded-sm border-2 border-gray-700">
                  <Profile role={role} name={name} email={email} image={image} emailVerified={emailVerified} status={status}/>
                </div>
              }
              {
                state === "settings" && 
                <div className="w-full h-full bg-gray-500 rounded-sm border-2 border-gray-700">
                  settings section...
                </div>
              }
              {
                state === "ads" && 
                <div className="w-full h-full bg-gray-500 rounded-sm border-2 border-gray-700">
                  Your ads...
                </div>
              }
              {
                state === "X" &&
                <div className="w-full h-full bg-gray-500 rounded-sm border-2 border-gray-700">
                  X
                </div>

              }
              {
                state === "Y" &&
                <div className="w-full h-full bg-gray-500 rounded-sm border-2 border-gray-700">
                  Y
                </div>

              }
              </div>
            </div>
          </div>
        </div>
  )
}