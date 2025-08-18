import Logo from "./Logo";
import { UserComp } from "./Userinfo";
import {  ReactNode } from "react";
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider'

export default function TopBar(){
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
                <UserComp/>
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

