import VolunteerList from "../components/VolunteerList/VolunteerList.jsx";
import { useAuth } from "../context/AuthContext";
import ShowInactiveVolunteers from "../components/ShowInactiveVolunteers/ShowInactiveVolunteers.jsx";
import "../styles/Dashboard.css";
import StudentFeedBackForm from "../components/StudentFeedbackForm/StudentFeedbackForm.jsx";


function SignOut(){
    const {signOutUser} = useAuth();

    return(
        <button onClick = {signOutUser}>SignOut</button>
    );
}

function Dashboard(){
    return (
       <main>
            <div className="volunteer-list">
                <VolunteerList />
            </div>

            <div className="inactive-volunteers">
                <ShowInactiveVolunteers />
                <StudentFeedBackForm />
            </div>
        </main>
    );
}

export default Dashboard