import { useState, useActionState } from "react";

export function AddVolunteer(){
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
      <h1>Sign up a new volunteer</h1>
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
            id="preferred"
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

        <label><input type="checkbox" name="subject" value="Math" />Math</label>
        <label><input type="checkbox" name="subject" value="Computer Science" />Computer Science</label>
        <label><input type="checkbox" name="subject" value="AMC 8" />AMC 8</label>
        <label><input type="checkbox" name="subject" value="AMC 10" />AMC 10</label>
        <label><input type="checkbox" name="subject" value="Java" />Java</label>
        <label><input type="checkbox" name="subject" value="Python" />Python</label>
        <label><input type="checkbox" name="subject" value="Algebra 1" />Algebra 1</label>
        <label><input type="checkbox" name="subject" value="Geometry" />Geometry</label>
        <label><input type="checkbox" name="subject" value="Algebra 2/ Pre-Calculus" />Algebra 2 / Pre-Calculus</label>
        <label><input type="checkbox" name="subject" value="Chemistry" />Chemistry</label>
        <label><input type="checkbox" name="subject" value="Introduction to Biology" />Introduction to Biology</label>
        <label><input type="checkbox" name="subject" value="Physics" />Physics</label>

      </div>


      <h2 className="section-title roles">
        Volunteer Roles
      </h2>

      <div className="role">

        <label><input type="checkbox" name="role" value="tutor" />Tutor</label>
        <label><input type="checkbox" name="role" value="curriculum" />Curriculum</label>
        <label><input type="checkbox" name="role" value="outreach" />Outreach</label>
        <label><input type="checkbox" name="role" value="matching" />Student Matching</label>
        <label><input type="checkbox" name="role" value="operations" />Program Operations</label>

      </div>

      <button type="submit">
        Add Volunteer
      </button>

    </form>

  </div>
</div>
);

}