import { useAuth } from "../context/AuthContext";

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
        <p> Dashboard </p>
        </>
    );
}

export default Dashboard