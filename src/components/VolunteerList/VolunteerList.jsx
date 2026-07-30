
import {useState, useEffect, useActionState} from "react";
import "../../styles/VolunteerTable.css";
import { retrieveVolunteers, addVolunteer, retrieveVolunteer } from "../../services/volunteerList";
import { AddVolunteer } from "./AddVolunteer";
import { filter } from "framer-motion/client";
import EditVolunteerInfo from "./EditVolunteerInfo";



function VolunteerList(){
    const [volunteers, setVolunteers] = useState([]);
    const [showNewVolunteerForm, setShowNewVolunteerForm] = useState(false);
    const [showEditVolunteerFrom, setShowEditVolunteerFrom] = useState(false);


    useEffect(() => {
      async function callRetrieveVolunteers() {
      const retrievedVolunteers = await retrieveVolunteers();

      setVolunteers(retrievedVolunteers);
      }

      callRetrieveVolunteers();
    }, [volunteers]);
   


    /* Search Form */
    const [search, setSearch] = useState("");
    const [searchMethod, setSearchMethod] = useState("Role");

    /*search bar */
    function handleSearch(e){
        setSearch(e.target.value);
    }

    /*search method */
    function handleSearchMethod(e){
        console.log(e.target.value);
        setSearchMethod(e.target.value);
    }
    
    function filterVolunteers(){
      const normalizedSearch = search?.toLowerCase();
      const filteredVolunteers = volunteers.filter((volunteer)=>{
        switch(searchMethod) {
          case "First Name":
                return volunteer.first_name?.toLowerCase().includes(normalizedSearch);
          case "Last Name":
                return volunteer.last_name?.toLowerCase().includes(normalizedSearch);
          case "Subject":
                return volunteer.subject.some(subject =>
                  subject.toLowerCase().includes(normalizedSearch)
                );
          case "Role":
                return volunteer.role.some(role =>
                  role.toLowerCase().includes(normalizedSearch)
                );
          default:
            return true;
        }
      });
      return filteredVolunteers;
    }

    const filteredVolunteers = filterVolunteers();
      /* Functions to display data properly on cards */

      function getInitials(volunteer) {
        const first = volunteer.first_name;
        return `${first.charAt(0)}${volunteer.last_name.charAt(0)}`.toUpperCase();
      }
  

      function formatData(data = []) {
        if (!Array.isArray(data) || data.length === 0) {
          return "";
        }

        return data
          .map(item => item.charAt(0).toUpperCase() + item.slice(1))
          .join(", ");
      }

      /* Functions to Edit Volunteer */
      const [volunteerInfo, setVolunteerInfo] = useState({})

      async function handleRetrieveVolunteer(email){ //{success: true, error: null, data: data};
        const {success, error, data} = await retrieveVolunteer(email);
          if(!success){
            console.log(error);
            return;
          }
          if(success){
            setVolunteerInfo(data);
            setShowEditVolunteerFrom(true);
            return;
          }
        }
      

      return (
          <div className="volunteer-dashboard">
            <div className="volunteer-header">
              <div>
                <h2 className="dashboard-title">
                  Volunteer Information
                </h2>
                <p className="dashboard-subtitle">
                  {
                    `Showing ${filteredVolunteers.length} volunteer${filteredVolunteers.length > 1 && `s`} of ${volunteers.length}`
                  }
                </p>
            </div>
          </div>

          <div className="search-toolbar">
            <label>
              Search by: 
              <select
                name="searchMethod"
                onChange = {handleSearchMethod}
                value = {searchMethod}
              >
                <option value="Role">Role</option>
                <option value="First Name">First Name</option>
                <option value="Last Name">Last Name</option>
                <option value="Subject">Subject</option>
              </select>

        <input
          type="text"
          onChange={handleSearch}
          value = {search}
          placeholder="Search volunteers..."
        />
        </label>
         <button
        className="add-btn"
        onClick={() => setShowNewVolunteerForm(true)}
      >
        + Add Volunteer
      </button>
    </div>



    <div className="volunteer-grid">
      {filteredVolunteers.length > 0 ? (
        filteredVolunteers.map((volunteer) => (

          <div
            className="volunteer-card"
            key={volunteer.email}
          >

            {/* Left Side of Card */}
            <div className="volunteer-main">

              <div className="avatar-circle">
                {getInitials(volunteer)}
              </div>

              <div className="volunteer-info">
                <h3>
                  {volunteer.first_name} {volunteer.last_name}
                </h3>

                <p>
                  {formatData(volunteer.role)}
                </p>

              </div>

            </div>

            {/* Right Side */}

            <div className="volunteer-details">

              <div className="badge-section">
                <div className="badge-container">

                 {volunteer.subject.map((subject) => (
                    <span
                      key={subject}
                      className={`subject-badge-${subject.replace(/[\s/-]/g, '').toLowerCase()} badge`} 
                    >
                      {subject}
                    </span>
                ))}
                </div>
              </div>
            </div>
               <button className = "edit-cards" onClick = {() => {handleRetrieveVolunteer(volunteer.email)}}>:::</button>

          </div>

        ))

      ) : (

        <div className="empty-state">

          <h3>No volunteers found</h3>

          <p>
            Try adjusting your search or reset the filters.
          </p>

        </div>

      )}

    </div>

    {showNewVolunteerForm && <AddVolunteer onClose = {() => setShowNewVolunteerForm(false)}/>}
    {showEditVolunteerFrom && <EditVolunteerInfo currVolunteerInfo = {volunteerInfo} closeModal = {() => {setShowEditVolunteerFrom(false)}}/>}

  </div>
);
}

export default VolunteerList;