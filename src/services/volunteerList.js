import supabase from "../../supabase-client";

export async function addVolunteer(volunteer){

    const {
        email,
        firstName,
        lastName,
        preferredName,
        lastVolunteerDate,
        birthdate,
        subject,
        role,
        hoursContributed,
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
                    last_volunteer_date: lastVolunteerDate,
                    birthdate,
                    subject,
                    role,
                    hours_contributed: hoursContributed,
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



