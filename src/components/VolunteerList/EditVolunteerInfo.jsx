import { useState, useActionState } from "react";
import { updateVolunteer, removeVolunteer } from "../../services/volunteerList";
import { classes, roles, isEqual, personalInformation, normalizePersonalInformation } from "../../utils/lib";
import ShowSuccess from "./ShowSuccess";


function EditVolunteerInfo({currVolunteerInfo, closeModal}){ 
    const [updatedSucessfully, setUpdatedSucessfully] = useState(null);

    const {
        email,
        first_name,
        last_name,
        birthdate,
        role,
        subject,
        } = currVolunteerInfo;



    const [error, submitupdatedVolunteerInfo, isPending] = useActionState((
        async (prevSubmission, updatedVolunteerInfo) => {
            if(updatedVolunteerInfo.get('remove-volunteer-btn')){
                const {success, error, data} = removeVolunteer(updatedVolunteerInfo.get('email'));
                if(!success){
                    return error;
                }
                return null;
            }



            const volunteer = {
            email: updatedVolunteerInfo.get('email'),
            first_name: updatedVolunteerInfo.get('first_name'), 
            last_name: updatedVolunteerInfo.get('last_name'),
            birthdate: updatedVolunteerInfo.get('birthdate'),
            role: updatedVolunteerInfo.getAll('role'),
            subject: updatedVolunteerInfo.getAll('subject'),
            };
            for (const value of Object.keys(volunteer)) {
                if (!isEqual(volunteer[value], currVolunteerInfo[value])) {
                    const { success, error, data } = await updateVolunteer(
                        currVolunteerInfo.email,
                        value,
                        volunteer[value]
                    );

                    if (!success) {
                        setUpdatedSucessfully(false);
                        return error;
                    }
                    setUpdatedSucessfully(true);
                    setTimeout(() => {
                        closeModal();
                    }, 1500);
                    return null;
                    }
            }
    }), null)

    return(
          <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                <div>
                    <h1>Change {currVolunteerInfo.first_name}'s info:</h1>
                    <p>
                        Change any box's information. If the box is not changed, that informatin will remain the same. 
                    </p>
                </div>
                <button
                    type="button"
                    className="modal-close"
                    onClick={closeModal}
                >
                    X
                </button>
            </div>

            <form action={submitupdatedVolunteerInfo}>
                <h2 className="section-title">Personal Information</h2>
                    <div className="form-grid">
                        {personalInformation.map((item) => (
                            <div className="field" key = {item}>
                                <label> {normalizePersonalInformation(item)} </label>
                                    <input
                                        type={item}
                                        required
                                        name={item}
                                        id={item}
                                        defaultValue = {currVolunteerInfo[item]}
                                    />
                            </div>
                        ))}
                    </div>

                <h2 className="section-title subjects">
                    Volunteer currenlty helps with the subjects: 
                </h2>
                <div className="subject-group">
                {classes.map((className) => (
                    <label key={className} className="choice-card">
                        <input
                        type="checkbox"
                        name="subject"
                        value = {className}
                        defaultChecked={currVolunteerInfo.subject?.includes(className)}
                        />
                        <span>{className}</span>
                    </label>
                ))}
                </div>

      <h2 className="section-title roles">
        Volunteer currenlty has the roles:
      </h2>

      <div className="role-group">
        {roles.map((role) => (
            <label key={role} className="choice-card">
                <input 
                type="checkbox" 
                name="role" 
                value = {role}
                defaultChecked={currVolunteerInfo.role?.includes(role)}
                />
            <span>{role}</span>
            </label>
            ))}
        </div>

      <div className="modal-actions">
        <div className="remove-volunteer-container">
            <input
                id="remove-volunteer-btn"
                name="remove-volunteer-btn"
                className="remove-volunteer-checkbox"
                type="checkbox"
            />

            <div className="remove-volunteer-text">
                <label
                    htmlFor="remove-volunteer-btn"
                    className="remove-volunteer-label"
                >
                    Remove Volunteer
                </label>

                <span className="remove-warning">
                    Warning: This action cannot be undone.
                </span>
                </div>
            </div>

            <button
                type="submit"
                className="submit-btn"
            >
                Update
            </button>
        </div>

    </form>
    {updatedSucessfully ?<ShowSuccess whatSucceeded = "volunteer_update" onClose = {closeModal}/> : <>{error}</>}

  </div>
</div>

    
    );
}
export default EditVolunteerInfo;