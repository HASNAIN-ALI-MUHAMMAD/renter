"use client"
import { use, useState } from "react";
import { useUser } from "../../(utils)/utils/user_info._utils";
import { TopBarButton } from "../../(utils)/components/TopBar";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CircleUserRound } from "lucide-react";
import { Role } from "@prisma/client";

export default function Profile({email,emailVerified,role,image,name,status}:{email?:string|null,emailVerified?:Date|null,role?:Role|null,image?:string|null,name?:string|null,status:"loading"|"unauthenticated"|"authenticated"}) {
  const [user,setUser] = useState()
  // const {session ,status} = useUser()
  // const {email,emailVerified,role,image,name} = {...session?.user}
  const router = useRouter()


  if(status === "loading") return <p>Loading...</p>
  // else if(status === "unauthenticated"){
  //   return(
  //     <div  className="w-full h-full flex flex-col justify-center items-center">
  //       <p>You are not authenticated!</p>
  //       <p>Please<span onClick={()=>router.push('/auth/login')} className="cursor-pointer hover:text-gray-800"> login in.</span></p>
  //       <TopBarButton link="/auth/login">Login</TopBarButton>
  //     </div>
  //   )
  // }
  return(
    <div className="p-2 flex flex-col">
      <p className="text-2xl py-2">Profile</p>
      <div className="flex flex-col w-full h-full p-2 rounded-sm bg-gray-600">
        <div className="userinfo flex flex-wrap h-max">
          <div className="outh-type w-full h-15 rounded-md flex flex-row items-center justify-center">
            {image ? <Image src={image} width={50} height={30} className="rounded-full" alt="profile_image"/> : <CircleUserRound size={30} className="text-center text-gray-800"/>}
          </div>
          <div className="email w-1/2 h-15 rounded-md flex flex-row items-center">
            <p className="text-lg flex flex-row items-center font-bold text-center w-1/3 px-3">Email :</p>
            <p>{email ? email : "undefined"}</p>
          </div>
          <div className="outh-type w-1/2 h-15 rounded-md flex flex-row items-center">
            <p className="text-lg flex flex-row items-center font-bold text-center w-1/3 px-3">Username :</p>
            <p>{name ? name :"undefined"}</p>
          </div>
          <div className="outh-type w-1/2 h-15 rounded-md flex flex-row items-center">
            <p className="text-lg flex flex-row items-center font-bold text-center w-1/2 px-3">Verification Status :</p>
            <p>{emailVerified ? "Verified" :"unVerified"}</p>
          </div>
            <div className="outh-type w-1/2 h-15 rounded-md flex flex-row items-center">
            <p className="text-lg flex flex-row items-center font-bold text-center w-1/3 px-3">Role :</p>
            <p>{role ? role :"undefined"}</p>
          </div>
        </div>

      </div>
    </div>
  );
}