import { NextResponse,NextRequest } from "next/server";
import { supabase } from "../supabase";

// take images as type File upload to the storage and return signed public urls...to the forms upload route...

export async function POST(request:Request):Promise<NextResponse> {
    const body = await request.formData();
    console.log(body);
    
    return NextResponse.json({ message: "ok" });
}