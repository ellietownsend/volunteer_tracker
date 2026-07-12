import { getInactiveVolunteers } from "../../services/showInactiveVolunteers"
import { FaCircleInfo } from "react-icons/fa6";
import { useEffect, useState } from "react";
import "../../styles/ShowInactiveVolunteers.css";

function ShowInactiveVolunteers(){
    const [inactiveVolunteers, setInactiveVolunteers] = useState([]);
    const [sendEmail, setSendEmail] = useState(false);

    function sendEmailToInactiveVolunteers(){
        setSendEmail(true);
        for(const volunteer of inactiveVolunteers){
            console.log(volunteer.email);
        }
        return
    }

     useEffect(() => {
        const fetchInactiveVolunteers = async () => {
            const fetchedInactiveVolunteers = await getInactiveVolunteers();
            setInactiveVolunteers(fetchedInactiveVolunteers);
        }
        fetchInactiveVolunteers();
    },[])

   return (
    <div className="inactive-volunteers-page">
        <div className="inactive-volunteers-card">

            <div className="inactive-icon">
                👥
            </div>

            <h2>Inactive Volunteers</h2>

            <div className="inactive-count">
                {inactiveVolunteers.length}
            </div>

            <p className="inactive-description">
                Volunteers who have not contributed in the past 30 days.
            </p>

            <div className="inactive-info">
                <FaCircleInfo className="info-icon" />
                <span>
                    Reach out to encourage them to get involved again.
                </span>
            </div>

           

            {sendEmail ? <p>User wants to reach out</p> :  
                <button
                    onClick = {sendEmailToInactiveVolunteers}
                    type="button"
                    className="submit-btn"
                >
                    Reach Out
                </button>
                }

        </div>
    </div>
);
}
export default ShowInactiveVolunteers;