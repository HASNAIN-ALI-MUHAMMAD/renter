import { NextRequest, NextResponse } from "next/server";



export async function POST(request:NextRequest):Promise<NextResponse> {
    try {
        const data = await request.formData()
        console.log(data)
        data.append("adType","Rent")
        console.log(data)

    return NextResponse.json({message:"Data received successfully!"});
        
    } catch (error) {
        console.log(error)
    }
    return NextResponse.json({message:"Request fullfilled!"})

}
  