
export type propertyMI = {
  title: string;
  description: string;
  price: number;
  images: FileList | null;
  videos: FileList | null;
  propertyType: "house" | "land" | "agricultural" | string;
  purpose: string;
  location: {
    country: string;
    province: string;
    district: string;
    town: string;
    colony: string;
    address: string;
  };
};

export type LandI = {
  area: { unit: string; value: string };
  dimensions: { unit: string; width: string; length: string };
  isDeveloped: boolean;
  accessRoad: boolean;
  zoning: string;
};

export type HouseI = {
  area: { unit: string; value: string };
  dimensions: { unit: string; width: string; length: string };
  bedrooms: number;
  bathrooms: number;
  kitchen: number;
  floors: number;
  parking: boolean;
  servantRoom: boolean;
  lawn: boolean;
  furnished: boolean;
  yearBuilt: string;
};

export type AgriculturalI = {
  area: { unit: string; value: string };
  dimensions: { unit: string; width: string; length: string };
  soilType: string;
  topography: string;
  tenure: string;
  cropHistory: string;
  irrigation: string;
};
// export type propertyMI = {
//         title: string
//         description: string
//         price: number
//         images:FileList | null
//         videos:FileList | null
//         propertyType:string
//         purpose:string
//         location:{
//             country:string
//             province:string
//             district:string
//             town:string
//             colony:string
//             address:string
//         }
// }

// export type LandI  = {
//     area:{
//         unit:string,
//         value:string
//     },
//     dimensions:{
//         unit:string,
//         width:string,
//         length:string
//     },
//     isDeveloped:boolean,
//     accessRoad:boolean,
//     zoning:string,
// }

// export type HouseI = {
//     area:{
//         unit:string,
//         value:string
//     },
//     dimensions:{
//         unit:string,
//         width:string,
//         length:string
//     },
//     bedrooms:number,
//     bathrooms:number,
//     kitchen:number,
//     floors:number,
//     parking:boolean,
//     servantRoom:boolean,
//     lawn:boolean,
//     furnished:boolean,
//     yearBuilt:string
// }
// export type AgriculturalI = {
//     area:{
//         unit:string,
//         value:string
//     },
//     dimensions:{
//         unit:string,
//         width:string,
//         length:string
//     },
//     soilType:string,
//     topography:string,
//     tenure:string,
//     cropHistory:string,
//     irrigation:string,
// }

export function validateSellForm(data:propertyMI):{field:string|null,message:string}{
    // const keys:string[] = Object.keys(data)
    // for(const key of keys){
    //     const entrie:FileList|number|object|string|null = data[key as keyof propertyMI]
    //     if(entrie instanceof FileList){

    //     }
    // }
    const entries = Object.entries(data)
    for(const each of entries){
        const key:string =  each[0]
        const value:FileList|number|string|object|null = each[1]
        if(typeof value === "object" && value!==null){
            // checking the location details in detail and validation... 
            const innerEntries = Object.entries(value)
            for(const innerEach of innerEntries){
                const innerKey:string = innerEach[0]
                const innerValue:string|number = innerEach[1]
                if(innerValue === null || innerValue === ""){
                    return {field:innerKey,message:`${innerKey.toUpperCase()} shouldn't be left empty!`}
                }
            }
        }
        else if(typeof value ==="number"){
            // numbered values here...
            if(value === null || value === 0 ){
                return {field:key,message:`${key.toUpperCase()} shouldn't be 0!`}
            }
        }
        else if(typeof value ==="string"){
            // string values here...
            if(value === "" || value === null){
                return {field:key,message:`${key.toUpperCase()} shouldn't be left empty`}
            }
        }
        else if(key==="images"){
            if(value === null) return {field:key,message:"Images/Videos not uploaded!"}
        }
    }

    
    return {field:null,message:"Form was filled completely!"}
}

// handling form submissio for property sale
export const handleSubmit = (form_data:propertyMI): void => {
    const isValidated = validateSellForm(form_data);
    if(isValidated.field !==null && isValidated.message!==""){
        alert(isValidated.message)
        return
    }


    async function uploadData(data: propertyMI) {
        const Formdata = new FormData();

        const files: FileList = data?.images || new DataTransfer().files;
        console.log('Number of image files to append:', files.length);
        Formdata.append("imagesLength",files.length.toString())
        for (let i = 0; i < files.length; i++) {
            const element = files[i];
            Formdata.append(`images[${i}]`, element);
        }

        const vidFiles:FileList = data?.videos || new DataTransfer().files;
        console.log("Number of videos to append: ",vidFiles.length);
        Formdata.append("videosLength",vidFiles.length.toString());
        for (let i = 0; i < files.length; i++) {
            const element = files[i];
            Formdata.append(`images[${i}]`, element);
        }

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const value = data[key as keyof propertyMI];
                if (key === 'images' || key === 'videos') {
                    continue;
                }
                if (typeof value === 'object' && value !== null) {
                    if (!(value instanceof FileList)) {
                        Formdata.append(key, JSON.stringify(value));
                        console.log(`Appended JSON field: ${key}`, JSON.stringify(value));
                    }
                } else if (value !== undefined) {
                    Formdata.append(key, String(value));
                    console.log(`Appended simple field: ${key}`, String(value));
                }
            }
        }

        console.log('--- FormData contents to be sent ---');
        for (const pair of Formdata.entries()) {
            if (pair[1] instanceof File) {
                console.log(`${pair[0]}: File - ${pair[1].name} (${pair[1].type}, ${pair[1].size} bytes)`);
            } else {
                console.log(`${pair[0]}: ${pair[1]}`);
            }
        }
        console.log('--- End FormData contents ---');


        try {
            const res = await fetch(`/api/forms`, {
                method: "POST",
                body: Formdata
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error("Backend error response:", errorData);
                return alert(errorData.message || "Something went wrong on the server!");
            }

            const responseData = await res.json();
            console.log("API Response Data:", responseData);

            if (responseData?.error) {
                return alert(responseData.error);
            } else {
                return alert("Your post has been successfully uploaded!");
            }
        } catch (err) {
            console.error("Fetch error occurred:", err);
            return alert("Something went wrong during the upload process!");
        }
    }
    uploadData(form_data);

};