import supabase from "../../supabase-client";

export async function addVolunteer(volunteer){
    const {
        email,
        first_name,
        last_name,
        birthdate,
        subject,
        role,
    } = volunteer;

 
    const {data, error} = await supabase
        .from('volunteer')
        .insert(
            {
                email,
                first_name,
                last_name,
                birthdate,
                subject,
                role,
            }
        )
    if(error){
        return {success: false, error: error.message};
    }
    return {success: true, error: null};
}



 export async function retrieveVolunteers() {
    const { data, error } = await supabase
        .from("volunteer")
        .select("*");

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}

export async function retrieveVolunteer(email){
    const {data, error} = await supabase
        .from("volunteer")
        .select("*")
        .eq("email", email)
        .single();

    if(error){
        return {success: false, error: error, data: null};
    }
    return {success: true, error: null, data: data};
}

export async function updateVolunteer(email, column, newValue){
    const {data, error} = await supabase
        .from("volunteer")
        .update({[column]: newValue})
        .eq("email", email)
    if(error){
        return {success: false, error: error, data: null};
    }
    console.log(data);
    return {success: true, error: null, data: data};
}

// Renove volunteer from database

export async function removeVolunteer(email){
    const {data, error} = await supabase
        .from("volunteer")
        .delete()
        .eq('email', email)
    if(error){
        return {success: false, error: error, data: null};
    }
    return {success: true, error: null, data: data};
}




