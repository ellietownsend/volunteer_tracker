import supabase from "../../supabase-client";
export async function fetchVolunteers() {
    try {
        const { data, error } = await supabase.from("volunteer").select("*");
        if (error) {
            console.error("Supabase Error: ", error.message);
            return [];
        }
        return data;
    } catch (error) {
        console.error("Unexpected Error: ", error.message);
        return [];
    }
}

export async function createShoutout(email, message) {
    const { data, error } = await supabase
        .from("shoutouts")
        .insert({
            email,
            message,
        })
        .select();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}