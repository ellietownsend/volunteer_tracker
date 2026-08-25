import { getInactiveVolunteers } from "../../services/showInactiveVolunteers"
import { useEffect, useState } from "react";
import "../../styles/ShowInactiveVolunteers.css";
import { googleTokenExist, generateEmailToInactiveVolunteers, draftUsingEmailAPI, redirectToGoogleAuth } from "../../services/showInactiveVolunteers";
import { FaCircleInfo } from 'react-icons/fa6';
import { useAuth } from "../../context/AuthContext";
import DisplayInactiveVolunteers from "./DisplayInActiveVolunteers";


function ShowInactiveVolunteers(){
    const {session} = useAuth();
    const [inactiveVolunteers, setInactiveVolunteers] = useState([]);
    const [draftEmail, setDraftEmail] = useState(false);
    const [generatedEmails, setGeneratedEmails] = useState([]);
    const [signedIn, setSignedIn] = useState(false);

    const userIsLoggedIn = async () => {
      const authenticated = await googleTokenExist(
        session?.user?.id
      );
      setSignedIn(authenticated);
    };

    useEffect(() => {
      if (!session?.user?.id) 
        return;

      userIsLoggedIn();
    }, [session?.user?.id]);

    const handleEmailSignIn = async () => {
      if (signedIn) {
        return;
      }
      redirectToGoogleAuth(session?.user?.id);
    }

    const handleDraftEmail = async () => {
      try {
        const generatedEmails =
          await generateEmailToInactiveVolunteers(inactiveVolunteers[0]);

        const draftedEmails =
          await draftUsingEmailAPI(session?.user?.id, generatedEmails);

        setGeneratedEmails(draftedEmails);
        setDraftEmail(true);
      } catch (error) {
        console.error("Email process failed:", error);
      }
    };


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
          {inactiveVolunteers.length === 0 
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
              onClick={handleEmailSignIn}
              type="button"
              className="show-inactive-submit-btn"
            >
                Sign in to Gmail
            </button> 
          )
          
            
              
          
          }
          
        </div>
      </div>
    )}
  </>
);
}
export default ShowInactiveVolunteers;