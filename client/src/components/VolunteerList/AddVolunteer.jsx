import { useState, useActionState } from "react";
import { classes, roles, isEqual, personalInformation, normalizePersonalInformation } from "../../../../shared/utils/lib";
import ShowSuccess from "./ShowSuccess";
import "../../styles/VolunteerTable.css";
import { addVolunteer } from "../../services/volunteerList";


export function AddVolunteer({onClose}){
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  /* Form submission logic */
  const [error, submitAction, isPending] = useActionState(
      async (prevSubmission, newVolunteer) => {
        const volunteer = {
          email: newVolunteer.get('email'),
          first_name: newVolunteer.get('first_name'), 
          last_name: newVolunteer.get('last_name'),
          birthdate: newVolunteer.get('birthdate'),
          role: newVolunteer.getAll('role'),
          subject: newVolunteer.getAll('subject'),
        };

        /* send volunteer information to supabase */
        const {success, error} = await addVolunteer(volunteer); 
          if(!success){
            return error;
          }
          onClose();
          setSuccessMessage("Volunteer add");
        return null;
        }
    ,[])


    return(
     <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <div>
                <h1>Sign up a new volunteer</h1>
                <p>
                    Fill out the information below to add a new volunteer to the system.
                </p>
            </div>

            <button
                type="button"
                className="modal-close"
                onClick={onClose}
            >
                X
            </button>

    </div>

    <form action={submitAction}>

      <h2 className="section-title">Personal Information</h2>

      <div className="form-grid">
         {personalInformation.map((item) => (
            <div className="field" key = {item}>
              <label htmlFor = {item}> {normalizePersonalInformation(item)} </label>
                  <input
                      type="text"
                      required
                      name={item}
                      id={item}
                  />
          </div>
          ))}
      </div>

      <h2 className="section-title subjects">
        Subjects
      </h2>

      <div className="subject-group">
         {classes.map((className) => (
            <label key={className} className="choice-card">
                <input
                type="checkbox"
                name="subject"
                value = {className}
                />
                <span>{className}</span>
            </label>
            ))}
      </div>

      <h2 className="section-title roles">
        Roles:
      </h2>

      <div className="role-group">
        {roles.map((role) => (
            <label key={role} className="choice-card">
                <input 
                type="checkbox" 
                name="role" 
                value = {role}
                />
            <span>{role}</span>
            </label>
            ))}
        </div>

      <div className="modal-actions">
      <button
          type="submit"
          className="submit-btn"
      >
          Add Volunteer
      </button>
   </div>

  {error && <p>{error}</p>}

  {successMessage && (
      <ShowSuccess
          whatSucceeded="Volunteer added"
          onClose={onClose}
      />
  )}
  </form>

  </div>
</div>
);
}