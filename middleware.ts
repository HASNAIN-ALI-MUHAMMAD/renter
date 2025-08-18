import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
    const pathname = request.nextUrl.pathname;
    if(pathname.startsWith('/buy') || pathname.startsWith("/sell")){
        if(!token){
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }
        else NextResponse.next()        
    }
    else if(pathname.startsWith('/auth/login')){
        if(token){
            return NextResponse.redirect(new URL('/', request.url))
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/sell','/','/buy','/auth/login'],
}


