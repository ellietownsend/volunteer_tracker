import VolunteerList from "../components/VolunteerList/VolunteerList.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import ShowInactiveVolunteers from "../components/ShowInactiveVolunteers/ShowInactiveVolunteers.jsx";
import "../styles/Dashboard.css";
import StudentFeedBackForm from "../components/StudentFeedbackForm/StudentFeedbackForm.jsx";
import VolunteerHours from "../components/VolunteerHours/VolunteerHours.jsx";


function SignOut(){
    const {signOutUser} = useAuth();

    return(
        <button onClick = {signOutUser}>SignOut</button>
    );
}

function Dashboard(){
    return (
        <>
            <header>
                header
            </header>

            <div className="page">
                <main>
                    <VolunteerList />
                    <VolunteerHours />
                </main>

                <aside>
                    <ShowInactiveVolunteers />
                    <StudentFeedBackForm />

                </aside>
            </div>
            <SignOut />
        
        </>
    
    
    );
}

export default Dashboard