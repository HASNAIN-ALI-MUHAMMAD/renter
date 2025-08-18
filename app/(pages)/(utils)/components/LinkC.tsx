import Link from "next/link";
import React, { ReactNode } from "react";

export default function LinkC({children,href}:{children:ReactNode,href:string}) {
    return(
        <Link href={href} className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 block">
            {children}
        </Link>
    )

}