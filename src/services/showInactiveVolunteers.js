import supabase from "../../supabase-client";

export async function getInactiveVolunteers(){
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    try{
        const {data, error } = await supabase
        .from('volunteer')
        .select('*')
        .lt('last_volunteer_date', thirtyDaysAgo.toISOString());
        if (error){
            console.error("Supabase Error: ", error.message);
            return [];
        }
        return data;

    }catch(error){
        console.error(error?.message);
    }


}
