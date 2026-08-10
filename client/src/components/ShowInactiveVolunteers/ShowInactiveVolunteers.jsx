import { getInactiveVolunteers } from "../../services/showInactiveVolunteers"
import { useEffect, useState } from "react";
import "../../styles/ShowInactiveVolunteers.css";
import { checkGoogleToken, sendEmailToInactiveVolunteers } from "../../services/showInactiveVolunteers";
import { FaCircleInfo } from 'react-icons/fa6';
import { useAuth } from "../../context/AuthContext";


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
                            <span>
                            Look in your email drafts to offically send email. 
                            </span>
                     </div>

                </div>
            </div>
            );
    }

function ShowInactiveVolunteers(){
    const {session} = useAuth();
    const [inactiveVolunteers, setInactiveVolunteers] = useState([]);
    const [sendEmail, setSendEmail] = useState(false);
    const [generatedEmails, setGeneratedEmails] = useState([]);

    const handleSendEmail = async () => {
      if(await checkGoogleToken(session?.user?.id)){
        const emails = await sendEmailToInactiveVolunteers(inactiveVolunteers[0]);
        setGeneratedEmails(emails);
        setSendEmail(true);
      }
    };


    useEffect(() => {
      console.log("generatedEmails changed:", generatedEmails);
    }, [generatedEmails]);


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

          <h2>Inactive Volunteers</h2>

          <div className="inactive-count">
            {inactiveVolunteers.length}
          </div>

          <p className="inactive-description">
            Volunteers who have not contributed in the past 30 days.
          </p>

          <div className="inactive-info">
            <FaCircleInfo className="warning-icon" />
            <span>
                Reach out to encourage them to get involved again.
            </span>
          </div>
          {inactiveVolunteers.length > 0 
              ? <button
              onClick={handleSendEmail}
              type="button"
              className="show-inactive-submit-btn"
              >
                Reach Out
              </button> 
              : 
              <div className="inactive-empty-state">
                  <p>All volunteers are currently active.</p>
              </div>
          
          }
          
        </div>
      </div>
    )}
  </>
);
}
export default ShowInactiveVolunteers;