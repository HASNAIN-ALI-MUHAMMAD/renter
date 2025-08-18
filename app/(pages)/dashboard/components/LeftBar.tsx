import React, { useState } from "react";
import { TopBarButton } from "../../(utils)/components/TopBar";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { set } from "zod";


export enum STATE {
    "PROFILE",
    "SETTINGS",
    "ADVERTISEMENTS",
    "EXTRAS"
}

export enum EXTRAS{
    "X",
    "Y",
    "Z"
}

export default function LeftBar({setValue,value}:{value:string,setValue:React.Dispatch<React.SetStateAction<string>>}){
    const handleExtraClick = (val:string)=>{
        return setValue(val)
    }
    return(
        <div className="flex flex-col gap-2 p-2 bg-gray-600 rounded-sm ">
            <TopBarButton  onClick={()=>setValue("profile")}>Profile</TopBarButton>
            <TopBarButton  onClick={()=>setValue("settings")}>Settings</TopBarButton>
            <TopBarButton  onClick={()=>setValue("ads")}>Advertisements</TopBarButton>
            <LeftBarButtonGroup onClick={(val)=>handleExtraClick(val)} value={value}/>
        </div>
    )
}


export function LeftBarButtonGroup({onClick,value}:{onClick:(value:string)=>void,value:string}){
    const [open,setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open)
    }
    return(
        <div className="flex flex-col items-center w-full">
            <div className="flex w-full h-full items-center hover:opacity-80 opacity-100 transition-opacity cursor-pointer">
                <div className="w-4/4 h-full flex flex-row justify-center items-center">
                    <TopBarButton onClick={()=>handleClick()}>Extras</TopBarButton>
                </div>
                <div>
                    <ChevronDown size={19} focusable={true} className="text-gray-400 hover:text-gray-200 cursor-pointer w-5 h-5 rounded-full 
                    active:outline-2 active:outline-gray-400 active:bg-gray-500" onClick={()=>handleClick()}/>
                </div>
            </div>
                {
                    (open) &&
                <div className="flex flex-col gap-2 text-md">
                    <TopBarButton onClick={()=>{
                        return onClick("X")

                    }}>Wow this one worked!</TopBarButton>
                    <TopBarButton onClick={()=>{
                        return onClick("Y")
                        }}>Wow this one worked!</TopBarButton>
                </div>
                }

        </div>
    )
}