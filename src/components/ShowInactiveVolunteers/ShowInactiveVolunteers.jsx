import { getInactiveVolunteers } from "../../services/showInactiveVolunteers"
import { FaCircleInfo } from "react-icons/fa6";
import { useEffect, useState } from "react";
import "../../styles/ShowInactiveVolunteers.css";


function DisplayInactiveVolunteers({ volunteers }){
    console.log(volunteers);
        return  ( 
            <div className="inactive-volunteers-page">
                <div className="inactive-volunteers-card">

                    <div className="inactive-icon">
                        🤝
                    </div>

                    <h2>Emails drafted to:</h2>

                   <ul className="inactive-volunteers-list">
                        {volunteers.map(volunteer => (
                            <li key={volunteer.email}>
                                {volunteer.email}
                            </li>
                        ))}
                    </ul>

                     <div className="inactive-info">
                        <FaCircleInfo className="info-icon" />
                            <span>
                            Look in your drafts email to offically send email. 
                            </span>
                     </div>

                </div>
            </div>
            );
    }

function ShowInactiveVolunteers(){
    const [inactiveVolunteers, setInactiveVolunteers] = useState([]);
    const [sendEmail, setSendEmail] = useState(false);

    function sendEmailToInactiveVolunteers(){
        setSendEmail(true);
    }


     useEffect(() => {
        const fetchInactiveVolunteers = async () => {
            const fetchedInactiveVolunteers = await getInactiveVolunteers();
            setInactiveVolunteers(fetchedInactiveVolunteers);
        }
        fetchInactiveVolunteers();
    },[])

  return (
  <>
    {sendEmail ? (
      <DisplayInactiveVolunteers volunteers={inactiveVolunteers} />
    ) : (
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

          <button
            onClick={sendEmailToInactiveVolunteers}
            type="button"
            className="submit-btn"
          >
            Reach Out
          </button>
        </div>
      </div>
    )}
  </>
);
}
export default ShowInactiveVolunteers;