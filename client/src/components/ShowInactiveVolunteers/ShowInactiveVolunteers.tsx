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
    const [completed, setCompleted] = useState(false);

    const [errors, setErrors] = useState({
      fetchVolunteers: { hasError: false, message: "" },
      searchToken: { hasError: false, message: "" },
      makeEmails:{ hasError: false, message: "" },
      makeDrafts: { hasError: false, message: "" }
    });

    const [loading, setLoading] = useState({
      fetchVolunteers: true,
      searchToken: true,
      makeEmails: false,
      makeDrafts: false
    });

    const checkErrorMessage = (error) => {
     if (error?.message) return error.message;
     if (typeof error === "string" && error.trim()) return error;
     return "An unexpected error occurred.";
   }

  const runAsync = async (key, asyncFunction, errorPrefix) => {
    setErrors(prev => ({
      ...prev,
      [key]: { hasError: false, message: "" }
    }));

    setLoading(prev => ({
      ...prev,
      [key]: true
    }));

    try {
      const result = await asyncFunction();
      return { success: true, data: result };

    } catch (error) {
      setErrors(prev => ({
        ...prev,
        [key]: {
          hasError: true,
          message: `${errorPrefix}: ${checkErrorMessage(error)}`
        }
      }));

    return { success: false, data: null };
} finally {
    setLoading(prev => ({
      ...prev,
      [key]: false
    }));
  }
 };

const userIsLoggedIn = async () => {
  const result = await runAsync(
    "searchToken",
    () => googleTokenExist(session?.user?.id),
    "Failed to check login status"
  );

  if (result.success) {
    setSignedIn(result.data);
  }
};


const handleDraftEmail = async () => {
  const emailResult = await runAsync(
    "makeEmails",
    () => generateEmailToInactiveVolunteers(inactiveVolunteers[0]),
    "Failed to make emails"
  );

  if (!emailResult.success) return;


  const draftResult = await runAsync(
    "makeDrafts",
    () => draftUsingEmailAPI(session?.user?.id, emailResult.data),
    "Failed to make drafts"
  );

  if (draftResult.success) {
    setGeneratedEmails(draftResult.data);
    setCompleted(true)
  }
};

const getButtonText = () => {
  if (completed) {
    return <DisplayInactiveVolunteers volunteers={generatedEmails} />;
  }
  if(completed) return "Emails in draft!";
  if (loading.makeEmails) return "Making emails...";
  if (loading.fetchVolunteers) return "Loading inactive volunteers";
  if (errors.fetchVolunteers.hasError) return `${errors.fetchVolunteers.message}`;
  if (loading.makeDrafts) {return "Drafting Emails..." };

  return "Reach Out";
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


  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchVolunteers = async () => {
      const result = await runAsync(
        "fetchVolunteers",
        () => getInactiveVolunteers(),
        "Failed to load inactive volunteers"
      );

      if (result.success) {
        setInactiveVolunteers(result.data);
      }
    };

    fetchVolunteers();
  }, [session?.user?.id]);


  return (
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
        <span>Reach out to encourage them to get involved again.</span>
      </div>

      {inactiveVolunteers.length === 0 ? (
        <div className="inactive-empty-state">
          <p>All volunteers are currently active.</p>
        </div>
      ) : signedIn ? (
        <button
          onClick={handleDraftEmail}
          type="button"
          className="show-inactive-submit-btn"
          disabled={loading.makeEmails || loading.makeDrafts || completed}
        >
          {getButtonText()}
        </button>
      ) : (
        <button
          onClick={handleEmailSignIn}
          type="button"
          className="show-inactive-submit-btn"
        >
          Sign in to Gmail
        </button>
      )}

      {errors.makeEmails.hasError && (
        <p>{errors.makeEmails.message}</p>
      )}

      {errors.makeDrafts.hasError && (
        <p>{errors.makeDrafts.message}</p>
      )}

    </div>
  </div>
);
}
export default ShowInactiveVolunteers;