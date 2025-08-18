import { supabase } from "../storage/supabase";

export class SupabaseStorageUpload{
    async imagesUpload(images:File[],userID:string) {
       images.forEach(async(img,indx)=>{
            supabase.storage
            .from("renter")
            .upload(`/images/${userID}/${this.createFileName(img,"213")}`,img,{
                cacheControl: "3600",
                upsert: false,
            })
       }) 
    }
    createFileName(img:File,adID:string){
        
    }
}