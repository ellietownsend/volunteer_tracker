import supabase from "../../../supabase-client";

export async function uploadImage(image, imagePath){
    try{
        const {data, error } = await supabase
        .storage
        .from('Volunteer Images')
        .upload(imagePath, image)
        if(error){
            throw error;
        }
          console.log('Upload successful! File path:', data.path)

    }catch(error){
         console.error('Upload failed:', error)
    }

}