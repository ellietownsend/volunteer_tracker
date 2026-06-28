import supabase from "../../supabase-client";
import {useState, useEffect} from "react";
import "../styles/VolunteerTable.css";

/*Display the list of volunteers*/

function VolunteerList(){
    const [volunteers, setVolunteers] = useState([]);
    console.log(volunteers);

    useEffect(() => {
        retrieveVolunteers();
    }, []);

    async function retrieveVolunteers(){
        const {data, error} = await supabase.from("volunteer").select("*");

        if(error){
            console.error(error);
            return;
        }

        console.log(volunteers);
        setVolunteers(data);
    }

      return (
         <div className="card">
      {/* Header */}
      <div className="card-header">
        <h2 className="title">
          Volunteers{" "}
          <span className="subtitle">
            ({volunteers?.length || 0} total)
          </span>
        </h2>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        {volunteers?.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
            </thead>

            <tbody>
              {volunteers.map((v) => (
                <tr key={v.email}>
                  <td>{v.firstname}</td>
                  <td>{v.lastname}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty">No volunteers found</div>
        )}
      </div>
    </div>
  );
}

export default VolunteerList;