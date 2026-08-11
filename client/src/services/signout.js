import supabase from "../../supabase-client";

export async function removeRefreshToken(uuid){
    console.log("getting here!");
    const {error} = await supabase
    .from('tokens')
    .delete()
    .eq('uid', uuid)

    if(error){
        return {success: false, error: error.message};
    }
    return {success:true, error: null}
}