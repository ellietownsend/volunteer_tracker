import { getInactiveVolunteers } from "../../services/showInactiveVolunteers"
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
                            <span>
                            Look in your email drafts to offically send email. 
                            </span>
                     </div>

                </div>
            </div>
            );
    }

function ShowInactiveVolunteers(){
    const [inactiveVolunteers, setInactiveVolunteers] = useState([]);
    const [sendEmail, setSendEmail] = useState(false);
    const [generatedEmails, setGeneratedEmails] = useState([]);

    async function sendEmailToInactiveVolunteers(){
        try {
          const response = await fetch("http://localhost:3001/api/createmail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(inactiveVolunteers),
          });

          if(!response.ok){
            throw new Error("Request failed");
          }

          const forattedResponse = await response.json();

          setGeneratedEmails(forattedResponse.data.emails);

          setSendEmail(true);

        } catch (error) {
          console.error("API error:", error);
        }
    }

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
            <span>
              ⚠️  Reach out to encourage them to get involved again.
            </span>
          </div>
          {inactiveVolunteers.length > 0 
              ? <button
              onClick={sendEmailToInactiveVolunteers}
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