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
    const [generatedEmails, setGeneratedEmails] = useState([]);
    const [signedIn, setSignedIn] = useState(false);

    type Error = {
      fetchVolunteers: {hasError: boolean, message: string},
      searchToken: { hasError: boolean, message: string },
      makeEmails:{ hasError: boolean, message: string },
      makeDrafts: {hasError: boolean, message: string}
    }

     const [errors, setErrors] = useState<Error>({
      fetchVolunteers: { hasError: false, message: "" },
      searchToken: { hasError: false, message: "" },
      makeEmails:{ hasError: false, message: "" },
      makeDrafts: { hasError: false, message: "" }
    });

    const checkErrorMessage = (error) => {
     if (error?.message) return error.message;
     if (typeof error === "string" && error.trim()) return error;
     return "An unexpected error occurred.";
   }


    const userIsLoggedIn = async () => {
      try{
        const authenticated = await googleTokenExist(session?.user?.id);
        setSignedIn(authenticated);
      }
      catch(error){
        setErrors(prev => ({
          ...prev, 
          searchToken: {hasError: true, message: `Failed to check log in status: ${checkErrorMessage(error)}`}
        }))
      }
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
      }
      catch(error){
        setErrors(prev => ({
          ...prev,
          makeEmails: {hasError: true, message:  `Failed to make emails: ${checkErrorMessage(error)}`}
        }))
      }
      try{
        const draftedEmails = await draftUsingEmailAPI(session?.user?.id, generatedEmails);
        setGeneratedEmails(draftedEmails);
      }
      catch(error){
        setErrors(prev => ({
         ...prev,
         makeDrafts:{hasError: true, message: `Failed to make drafts: ${checkErrorMessage(error)}`}
       }))
      }
    };



     useEffect(() => {
        const fetchInactiveVolunteers = async () => {
          try{
            const fetchedInactiveVolunteers = await getInactiveVolunteers();
            setInactiveVolunteers(fetchedInactiveVolunteers);
          }
          catch(error){
            setErrors(prev =>({
              ...prev,
              fetchVolunteers: {hasError: true, message: `Error loading inactive volunteers: ${checkErrorMessage(error)}`}
            }))
          }
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
          )}
          
        </div>
      </div>
    )}
  </>
);
}
export default ShowInactiveVolunteers;