import { getInactiveVolunteers } from "../../services/showInactiveVolunteers"
import { useEffect, useState } from "react";
import "../../styles/ShowInactiveVolunteers.css";
import { checkGoogleToken, generateEmailToInactiveVolunteers, draftUsingEmailAPI } from "../../services/showInactiveVolunteers";
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
    const [draftEmail, setDraftEmail] = useState(false);
    const [generatedEmails, setGeneratedEmails] = useState([]);
    const [signedIn, setSignedIn] = useState(false);

    const handleDraftEmail = async () => {
      if (!(await checkGoogleToken(session?.user?.id))) {
        return;
      }
      setSignedIn(true);
      try {
        const generatedEmails =
          await generateEmailToInactiveVolunteers(inactiveVolunteers[0]);

        console.log("Emails generated:", generatedEmails);

        const draftedEmails =
          await draftUsingEmailAPI(session?.user?.id, generatedEmails);

        console.log("Emails drafted:", draftedEmails);

        setGeneratedEmails(draftedEmails);
        setDraftEmail(true);
      } catch (error) {
        console.error("Email process failed:", error);
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
    {draftEmail ? (
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
          inactiveVolunteers.length === 0 
          ?
            <div className="inactive-empty-state">
                    <p>All volunteers are currently active.</p>
                </div>
          : (signedIn ? 
            <button
              onClick={handleDraftEmail}
              type="button"
              className="show-inactive-submit-btn"
            >
                Reach Out
            </button> 
            :
             <button
              onClick={handleDraftEmail}
              type="button"
              className="show-inactive-submit-btn"
            >
                Sign in to Gmail
            </button> 
          )
          
        </div>
      </div>
    )}
  </>
);
}
export default ShowInactiveVolunteers;