import VolunteerList from "../components/VolunteerList/VolunteerList.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import ShowInactiveVolunteers from "../components/ShowInactiveVolunteers/ShowInactiveVolunteers.jsx";
import "../styles/Dashboard.css";
import StudentFeedBackForm from "../components/StudentFeedbackForm/StudentFeedbackForm.jsx";
import VolunteerHours from "../components/VolunteerHours/VolunteerHours.jsx";
import Signout from "../components/Signout/Signout.jsx";
import Header from "../components/Header/Header.jsx";

function Dashboard(){
    return (
        <>
            <Header />
            
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
            <Signout />
        
        </>
    
    
    );
}

export default Dashboard