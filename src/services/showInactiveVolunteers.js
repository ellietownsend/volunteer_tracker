import supabase from "../../supabase-client";

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


export async function checkGoogleToken(){
    console.log("Checking Google token...");
    const response = await fetch("/api/auth/google/status", {
        credentials: "include",
    });
    console.log(response);
    const data = await response.json();
    console.log("Data from checkGoogleToken:", data);
    if(!data.connected){
        console.log("no token found, redirecting to Google OAuth...");
        window.location.href = "/auth/google";
    }else{
        return true;
    }
}


 export async function sendEmailToInactiveVolunteers(inactiveVolunteers){
        try {
          const response = await fetch("http://localhost:3001/api/createmail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(inactiveVolunteers),
          });

          if(!response.ok){
            throw new Error("Request failed");
          }

          const forattedResponse = await response.json();

          return forattedResponse.data.emails;

        } catch (error) {
          console.error("API error:", error);
        }
}


