import supabase from '../../supabase-client.js';

export async function getInactiveVolunteers(){
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    try{
        const {data, error } = await supabase
        .from('hours')
        .select(`
            email, 
            first_name, 
            last_name, 
            hours, 
            last_volunteered,
            volunteer (
                subject,
                role
            )`
        )
        .lt('last_volunteered', thirtyDaysAgo.toISOString());

        if (error){
            console.error("Supabase Error: ", error.message);
            return [];
        }
        
        return formatData(data);

    }catch(error){
        console.error(error?.message);
    }
}

 function formatData(data){
    const formattedData = data.map(({ volunteer, ...rest }) => ({
        ...rest,
        role: volunteer?.role ?? [],
        subject: volunteer?.subject ?? []
    }));

    return formattedData;
    }


export async function googleTokenExist(uuid) {

    const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/google/status?uuid=${uuid}`,
        {
        credentials: "include",
        }
    );
    const data = await response.json();
    return data.connected;
}

export async function redirectToGoogleAuth(uuid){
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/api/auth/google?uuid=${uuid}`;
}



 export async function generateEmailToInactiveVolunteers(inactiveVolunteers){
    console.log("getting to generateEmailToInactiveVolunteers in js");
        try {
            const API_URL = import.meta.env.VITE_SERVER_URL;

            const response = await fetch(`${API_URL}/api/generateEmails`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(inactiveVolunteers),
          });

          if(!response.ok){
            throw new Error("Request to generate emails for volunteers failed");
          }

          const formattedResponse = await response.json();

          return formattedResponse.data.emails;

        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
}

export async function draftUsingEmailAPI(uuid, generatedEmails){
    console.log("Reaching out to google to make draft")
    try{
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/draftEmails`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({uuid, generatedEmails}),
        })

        if(!response.ok){
            throw new Error("Unable to draft emails to email API for draft generation");
        }

        const draftedEmails = await response.json();

        return draftedEmails;

    }catch(error){
        console.error("API error:", error);
        throw error;
    }
}



