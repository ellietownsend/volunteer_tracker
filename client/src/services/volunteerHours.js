import supabase from '../../../server/supabase-client';
export async function retrieveVolunteerHours(){
    
      const {data, error} = await supabase
        .from("hours")
        .select("*")
        .order('hours', {ascending: false })
      if(error){
        return {data: null, error: error.message};
      }
      return {data, error: null};
  }