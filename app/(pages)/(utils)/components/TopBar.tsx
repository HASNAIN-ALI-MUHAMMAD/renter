"use client"
import Logo from "./Logo";
import {  ReactNode } from "react";
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider'
import Image from "next/image";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { useUser } from "../utils/user_info._utils";
import { usePathname } from "next/navigation";


export default function TopBar(){
    const pathname = usePathname()
    const {session,status} = useUser()

    return(
        <div className="bg-gray-600 p-2 h-12 flex flex-row justify-between">
            <div className=" flex flex-row gap-5"> 
                <TopBarButton link="/">
                    Home
                </TopBarButton>
                <Divider orientation="vertical" variant="fullWidth"/>
                <TopBarButton link="/sell">
                    Sell your property
                </TopBarButton>
                <Divider orientation="vertical"/>
                <TopBarButton link="/buy">
                    Buy a property
                </TopBarButton>
                <Divider orientation="vertical" />
                <TopBarButton link="/renter/aboutus">
                    About us
                </TopBarButton>
            </div>
            <div>
                <Logo/>
            </div>
            <div className=" flex flex-row items-center">
                <AccountTB email={session?.user?.email || ""} image={session?.user?.image || ""} status={status} />
            </div>
        </div>
    )
}

export function TopBarButton({onClick,children,link}:{onClick?:()=>void,children?:ReactNode,link?:string}){
    return(
        <Button onClick={onClick} color="inherit" href={link} variant="text" classes={"background:black"}>
            {children}
        </Button>
    )
}

function AccountTB({email,image,status}:{email:string,image:string,status:"loading"|"unauthenticated"|"authenticated"}){
    if(status === "loading"){
        return(
            <div className="w-full h-full flex flex-row items-center justify-center">
                Loading...
            </div>
        )
    }
    else if(status === "unauthenticated"){
        return(
            <div className="w-full h-full flex flex-row items-center justify-center">
                <TopBarButton link="/auth/login">
                    Login/Signup
                </TopBarButton>
            </div>
        )
    }
    return(
        <div className="w-full h-full flex flex-row items-center justify-center p-2">
            <Link href={"/dashboard"} className="w-max h-max bg-gray-600 rounded-full hover:bg-gray-500 focus:outline-2 focus:outline-gray-800" >
                {
                image ? 
                <Image src={image} alt="profileImageTopbar" width="30" height="30" className="rounded-full w-10"/>:
                <CircleUserRound width={30} height={30} className="rounded-full hover:text-gray-800 text-gray-900" />
                }
            </Link>
        </div>
    )
}