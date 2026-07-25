import supabase from "../../supabase-client";

export async function addVolunteer(volunteer){


    const {
        email,
        firstName,
        lastName,
        preferredName,
        birthdate,
        subject,
        role,
    } = volunteer;

    try{
        const {data, error} = await supabase
            .from('volunteer')
            .insert(
                {
                    email,
                    first_name: firstName,
                    last_name: lastName,
                    preferred_name: preferredName,
                    birthdate,
                    subject,
                    role,
                }
            )
        if(error){
            return {success: false, error: error.message};
        }
        return {success: true, error: null};
    }catch(error){
         return {success: false, error: error.message};

    }
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
    console.log(column);
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



