import { useState, useActionState, useEffect } from "react";

export function AddVolunteer({onClose}){
  const [error, submitAction, isPending] = useActionState(
      async (prevSubmission, newVolunteer) => {
        const volunteer = {
          email: newVolunteer.get('email'),
          firstName: newVolunteer.get('firstName'), 
          lastName: newVolunteer.get('lastName'),
          preferredName: newVolunteer.get('preferredName'),
          lastVolunteerDate: newVolunteer.get('lastVolunteerDate'),
          birthdate: newVolunteer.get('birthdate'),
          role: newVolunteer.getAll('role'),
          subject: newVolunteer.getAll('subject'),
          hoursContributed: newVolunteer.get('hoursContributed'),
        };

        try{
          const {success, error} = await addVolunteer(volunteer);
          if(error){
            console.log(error)
          }
          console.log("entered");
        }catch(error){
          console.log(error)
        }
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

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            name="email"
            id="email"
          />
        </div>

        <div className="field">
          <label htmlFor="birthdate">Birthdate</label>
          <input
            type="date"
            required
            name="birthdate"
            id="birthdate"
          />
        </div>

        <div className="field">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            required
            name="firstName"
            id="firstName"
          />
        </div>

        <div className="field">
          <label htmlFor="preferredName">
            Preferred Name
            <span>Optional</span>
          </label>

          <input
            type="text"
            name="preferredName"
            id="preferredName"
          />
        </div>

        <div className="field">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            required
            name="lastName"
            id="lastName"
          />
        </div>

        <div className="field">
          <label htmlFor="lastVolunteerDate">
            Last Volunteer Date
            <span>Optional</span>
          </label>

          <input
            type="date"
            name="lastVolunteerDate"
            id="lastVolunteerDate"
          />
        </div>

        <div className="field">
          <label htmlFor="hoursContributed">
            Hours Contributed
            <span>Defaults to 0</span>
          </label>

          <input
            type="number"
            name="hoursContributed"
            id="hoursContributed"
          />
        </div>

      </div>

      <h2 className="section-title subjects">
        Subjects
      </h2>

      <div className="subject-group">

      <label className="choice-card">
    <input type="checkbox" name="subject" value="Math" />
    <span>Math</span>
</label>
        <label className="choice-card">
  <input type="checkbox" name="subject" value="Computer Science" />
  <span>Computer Science</span>
</label>

<label className="choice-card">
  <input type="checkbox" name="subject" value="AMC 8" />
  <span>AMC 8</span>
</label>

<label className="choice-card">
  <input type="checkbox" name="subject" value="AMC 10" />
  <span>AMC 10</span>
</label>

<label className="choice-card">
  <input type="checkbox" name="subject" value="Java" />
  <span>Java</span>
</label>

<label className="choice-card">
  <input type="checkbox" name="subject" value="Python" />
  <span>Python</span>
</label>

<label className="choice-card">
  <input type="checkbox" name="subject" value="Algebra 1" />
  <span>Algebra 1</span>
</label>

<label className="choice-card">
  <input type="checkbox" name="subject" value="Geometry" />
  <span>Geometry</span>
</label>

<label className="choice-card">
  <input
    type="checkbox"
    name="subject"
    value="Algebra 2/ Pre-Calculus"
  />
  <span>Algebra 2 / Pre-Calculus</span>
</label>

<label className="choice-card">
  <input type="checkbox" name="subject" value="Chemistry" />
  <span>Chemistry</span>
</label>

<label className="choice-card">
  <input
    type="checkbox"
    name="subject"
    value="Introduction to Biology"
  />
  <span>Introduction to Biology</span>
</label>

<label className="choice-card">
  <input type="checkbox" name="subject" value="Physics" />
  <span>Physics</span>
</label>
      </div>


      <h2 className="section-title roles">
        Volunteer Roles
      </h2>

      <div className="role-group">

      <label className="choice-card">
  <input type="checkbox" name="role" value="tutor" />
  <span>Tutor</span>
</label>

<label className="choice-card">
  <input type="checkbox" name="role" value="curriculum" />
  <span>Curriculum</span>
</label>

<label className="choice-card">
  <input type="checkbox" name="role" value="outreach" />
  <span>Outreach</span>
</label>

<label className="choice-card">
  <input type="checkbox" name="role" value="matching" />
  <span>Student Matching</span>
</label>

<label className="choice-card">
  <input type="checkbox" name="role" value="operations" />
  <span>Program Operations</span>
</label>
      </div>

      <div className="modal-actions">
    <button
        type="submit"
        className="submit-btn"
    >
        Add Volunteer
    </button>
</div>

    </form>

  </div>
</div>
    
  
);

}