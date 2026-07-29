import VolunteerList from "../components/VolunteerList/VolunteerList.jsx";
import { useAuth } from "../context/AuthContext";
import ShowInactiveVolunteers from "../components/ShowInactiveVolunteers/ShowInactiveVolunteers.jsx";

function SignOut(){
    const {signOutUser} = useAuth();

    return(
        <button onClick = {signOutUser}>SignOut</button>
    );
}

function Dashboard(){
    return (
        <>
        <SignOut />
        <VolunteerList />
        <ShowInactiveVolunteers />

        <p> Dashboard </p>
        </>
    );
}

export default Dashboard