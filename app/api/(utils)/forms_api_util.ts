import { prisma } from "@/lib/prisma";
import { supabase } from "../storage/supabase";
import { PropertyCategory, PURPOSE, STATUS, ZONING } from "@prisma/client";


export interface PropertySchemaI{
    id:string,
    title:string|undefined,
    description:string|undefined,
    price:number|undefined,
    propertyCategory:string|undefined,
    images:string[],
    videos:string[],
    locationId:string|undefined,
    userId:string|undefined,
    purpose:string|undefined
}
interface HouseSchemaI{
    area:object,
    dimensions:object,
    bedrooms:number,
    bathrooms:number,
    kitchen:number,
    floors:number,
    parking:boolean,
    servantRoom:boolean,
    lawn:boolean,
    propertyId:string
}
interface LandSchemaI{
    area:object,
    dimensions:object,
    isDeveloped:boolean,
    accessRoad:boolean,
    zoning:string,
    propertyId:string
}
interface AgriUploadI{
    area:object,
    dimensions:object,
    soilType:string,
    topography:string,
    tenure:string,
    cropHistory:string,
    irrigation:string,
    propertyId:string
}
export interface LocationSchemaI{
    id:string,
    province:string,
    district:string,
    town:string,
    colony:string,
    address:string,
    coordinates:{
        latitudes:number,
        longitudes:number
    }
}    


export class FormUploadPrisma{
    // main property model data upload...
    async propertyUpload(data:PropertySchemaI):Promise<string>{
        const purposeCheck = data.purpose === "rent" ? PURPOSE.RENT : (data.purpose === "sale" ? PURPOSE.SALE : PURPOSE.LEASE);
        const propertyCategoryCheck = data.propertyCategory === "land" ? PropertyCategory.LAND : (data.propertyCategory === "house" ? PropertyCategory.HOUSE : PropertyCategory.AGRICULTURAL);
        try {
            await prisma.property.create({
                data:{
                    id:data.id,
                    title:data.title,
                    description:data.description,
                    price:{
                        value: data.price,
                        unit:"$"
                    },
                    propertyCategory:propertyCategoryCheck,
                    user:{
                        connect:{
                            id:data.userId
                        }
                    },
                    purpose:purposeCheck,
                    videos:data.videos,
                    images:data.images,
                    status:STATUS.AVAILABLE,
                    location:{
                        connect:{
                            id:data.locationId
                        }
                    }
                }})
                .catch(err=>{console.log(err)})
                return data.id
        } catch (err) {
            console.log(err)
            return "Kuch nahin mila ..."
        }
    }

    //optional house model data upload...after the property
    async houseUpload(data:HouseSchemaI){
        try {
            await prisma.houseProperty.create({
                data:{
                    area:data.area,
                    dimensions:data.area,
                    bedrooms:data.bedrooms,
                    floors:data.floors,
                    kitchen:data.kitchen,
                    parking:data.parking,
                    lawn:data.lawn,
                    servantRoom:data.servantRoom,
                    bathrooms:data.bathrooms,
                    property:{
                        connect:{
                            id:data.propertyId
                        }
                    }
                }
            })
            
        } catch (err) {
            return console.log(err)
        }
    }

    // optional land model data upload...
    async landUpload(data:LandSchemaI){

        try {
            const zoningCheck = data.zoning==="residential" ? ZONING.Residential :(data.zoning === "commercial" ? ZONING.Commercial : data.zoning === "industrial" ? ZONING.Industrial : ZONING.Other)
            await prisma.landProperty.create({
                data:{
                    area:data.area,
                    dimensions:data.dimensions,
                    isDeveloped:data.isDeveloped,
                    accessRoad:data.accessRoad,
                    zoning:zoningCheck,
                    property:{
                        connect:{
                            id:data.propertyId
                        }
                    }
                }
            })
            
        } catch (err) {
            console.log(err)
        }
    }
    // data upload for optional agricultural land
    async agriUpload(data:AgriUploadI){
        try {
            await prisma.agriculturalProperty.create({
                data:{
                    area:data.area,
                    dimensions:data.dimensions,
                    soilType:data.soilType,
                    tenure:data.tenure,
                    cropHistory:data.cropHistory,
                    topography:data.topography,
                    property:{
                        connect:{
                            id:data.propertyId
                        }
                    }

                }
            }).catch(err=>{throw new Error(err)})
            
        } catch (err) {
            console.log(err)
        }

    }
    // adding location in a different model...
    async LocationUpload(data:LocationSchemaI):Promise<boolean>{
        try{
            await prisma.location.create({
                data:{
                    id:data.id,
                    area:data.colony,
                    latitude:data.coordinates.latitudes,
                    longitude:data.coordinates.longitudes,
                    address:data.address,
                    province:data.province,
                    city:data.town,
                }
            }).catch(err=>{
                throw new Error(err)
            })
            return true
        }
        catch(err){
            console.log(err)
            return false
        }
    }
    async ImageUploadSupabase(files:File[],adID:string,userID:string):Promise<string[]>{
        if(files.length<1) return []

        const sizeCheck = (f:File[])=>{
        const size = f.map((file)=>{
            if(file.size>20000000) return false
                return true
            })
            return size
        }
        if(sizeCheck(files).includes(false)) throw new Error("File size exceeds the size limit!")
            
        try {
            const uploadPromises = files.map(async(f,i)=>{
                const filename = this.createFileName(adID,i)
                try{
                    await supabase.storage.from('renter').upload(`/images/${userID}/${filename}`,f)
                    
                    const publicUrl = await supabase.storage.from('renter').getPublicUrl(`/images/${userID}/${filename}`)
                    return publicUrl.data.publicUrl
                }
                catch(err){
                    console.log("Supabase error occurred: ",err)
                }})
                return await Promise.all(uploadPromises) as string[]
        } catch (err) {
            console.log(err)
            return []
        }

    }
    async VideoUploadSupabase(files:File[],adId:string,userID:string):Promise<string[]>{
        if(files.length<1) return[]
        const sizeCheck = (f:File[])=>{
            const size = f.map((file)=>{
                if(file.size>50000000) return false
                return true
            })
            return size
        }
        if(sizeCheck(files).includes(false)) throw new Error("File size exceeds the size limit!")
            
        try {
            const uploadPromises = files.map(async (file,indx)=>{
                const filename = this.createFileName(adId,indx)
                try {
                    await supabase.storage.from("renter").upload(`/videos/${userID}/${filename}`,file)
                    const publicUrl = await supabase.storage.from("renter").getPublicUrl(`/videos/${userID}/${filename}`)
                    return publicUrl.data.publicUrl
                } catch (err) {
                    console.log(err)
                }
            })
                return await Promise.all(uploadPromises) as string[]
            
        } catch (err) {
            console.log("Error occurred: ",err)
        }
        return []
    }
    private createFileName(adID:string,idx:number):string{
        const filename:string = `${adID}_${idx}`
        return filename
    }




}