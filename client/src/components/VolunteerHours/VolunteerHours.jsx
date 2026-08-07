import "../../styles/VolunteerHours.css";
import { retrieveVolunteerHours } from "../../services/volunteerHours";
import{useState, useEffect} from 'react';


function VolunteerHours(){
    const [volunteers, setVolunteers] = useState([]);

    async function getHours(){
            const {data,error} = await retrieveVolunteerHours();
            if(error){
                return;
            }
            setVolunteers(data);
    }

    useEffect(() => {
        getHours();
    },[])

    function getInitials(volunteer) {
        const first = volunteer.first_name;
        return `${first.charAt(0)}${volunteer.last_name.charAt(0)}`.toUpperCase();
    }
  

    function formatData(data = []) {
        if (!Array.isArray(data) || data.length === 0) {
            return "";
        }
        return data
            .map(item => item.charAt(0).toUpperCase() + item.slice(1))
            .join(", ");
    }
      

      return (
          <div className="volunteer-dashboard">
            <div className="volunteer-header">
              <div>
                <h2 className="dashboard-title">
                  Volunteer Hours
                </h2>
                <p className="dashboard-subtitle">
                  {
                    `Assort hours`
                  }
                </p>
            </div>
          </div>

          <div className="search-toolbar">
                
            </div>



    <div className="volunteer-grid">
      {volunteers.length > 0 ? (
        volunteers.map((volunteer) => (

          <div
            className="volunteer-card"
            key={volunteer.email}
          >

            {/* Left Side of Card */}
            <div className="volunteer-main">

              <div className="avatar-circle">
                {getInitials(volunteer)}
              </div>

              <div className="volunteer-info">
                <h3>
                  {volunteer.first_name} {volunteer.last_name}
                </h3>

                <p>
                  {volunteer.hours}
                </p>

              </div>

            </div>

            {/* Right Side */}

            <div className="volunteer-details">

              <div className="badge-section">
                <div className="badge-container">

                </div>
              </div>
            </div>
               <button className = "edit-hours" >:::</button>

          </div>

        ))

      ) : (

        <div className="empty-state">

          <h3>No volunteers found</h3>

          <p>
            Try adjusting your search or reset the filters.
          </p>

        </div>

      )}

    </div>
  </div>
);
}

export default VolunteerHours;




