import { signOut, useSession } from "next-auth/react"
import Image from "next/image";
import { TopBarButton } from "./TopBar";
import { CircleUserRound } from "lucide-react";

export function UserComp(){

  const { data: session, status } = useSession();
    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    if (status === 'unauthenticated') {
        return (
            <div>
                <TopBarButton link={"/auth/login"} onClick={()=>""}>Login/SignUp</TopBarButton>
            </div>
        )
    }
    else{
        return(
            <div className="flex flex-row items-center gap-2 justify-center">
                {
                    session?.user.image !== null ? 
                <Image src={session?.user.image || ""} alt="profile" width="30" height="30" className="rounded-full w-10"/>:
                <CircleUserRound/>
                }
                <div className="flex flex-col mt-2">
                    <p>{session?.user.email || "Not Found!"}</p>
                    <p>{session?.user.emailVerified ? session.user.emailVerified.toString() : "Unverified"}</p>
                </div>
                <TopBarButton link="" onClick={()=>signOut({redirect:true})}>Sign Out</TopBarButton>

            </div>
        )

    }

}