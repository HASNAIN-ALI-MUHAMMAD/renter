import { NextRequest, NextResponse } from "next/server";
import {createId} from "@paralleldrive/cuid2";
import { FormUploadPrisma, LocationSchemaI } from "../(utils)/forms_api_util";
import { PropertySchemaI } from "../(utils)/forms_api_util";
import { getToken } from "next-auth/jwt";

const FormUploadPrismai = new FormUploadPrisma();
const url = process.env.URL_API
export async function POST(request:NextRequest):Promise<NextResponse> {
    try {
        // user session token...and unique id for each property advertisement...and cuid for each category
        const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
        const uuidProperty = createId()
        const uuidLocation = createId()
        // upload location to the location model...
        const locationUpload:LocationSchemaI = {
            id:uuidLocation,
            province:"",
            district:"",
            town:"",
            address:"",
            colony:"",
            coordinates:{
                latitudes:0,
                longitudes:0
            }
        }
        FormUploadPrismai.LocationUpload(locationUpload)

        // // form data ...
        const data = await request.formData()

        // creating a single file array and uploading files to supabase and getting the public urls in a single array file ...
        const images:File[] = []
        const imgLength = Number.parseInt(data.get("imagesLength") as string)
        for(let i=0; i<imgLength; i++){
            const image = data.get(`images[${i}]`)
            images.push(image as File)
        }
        const publicUrls:string[] = await FormUploadPrismai.ImageUploadSupabase(images,uuidProperty,token?.id as string)
        console.log("Line no. 24: ",publicUrls)

        // doing the same for the videos...
        const videos:File[] = []
        const videosLength = Number.parseInt(data.get("videosLength") as string)
        for(let i=0; i<videosLength; i++){
            const video = data.get(`videos[${i}]`)
            videos.push(video as File)
        }
        const publicUrlsVideo:string[] = await FormUploadPrismai.VideoUploadSupabase(videos,uuidProperty,token?.id as string)
        console.log("Line no. 41: ",publicUrlsVideo)
        
        // create a new object  with property schema and upload data...
        const dataUpload:PropertySchemaI = {
            id:uuidProperty,
            title:data.get("title")?.toString(),
            description:data.get("description")?.toString(),
            propertyCategory:data.get("category")?.toString(),
            purpose:"sell",
            userId:token?.id, 
            price:Number.parseInt(data.get("price")?.toString() as string),
            locationId:uuidLocation,
            images:publicUrls,
            videos:publicUrlsVideo
        }
        console.log('Data to be uploaded(ad): ',dataUpload)
        // uploading the data to the database...
        try{
            const propertyUploaded = FormUploadPrismai.propertyUpload(dataUpload)
            if(await propertyUploaded){
                "will see about this..."
            }
        }
        catch(err){
            console.log(err)
            return NextResponse.json({message:"Data not uploaded!"})
        }
        
    return NextResponse.json({message:"Data received successfully!"});
        
    } catch (error) {
        console.log(error)
    }
    return NextResponse.json({message:"Request fullfilled!"})

}
  