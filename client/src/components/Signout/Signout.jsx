import { useAuth } from "../../context/AuthContext";
import { removeRefreshToken } from "../../services/signout";

function Signout(){
    const {signOutUser, session} = useAuth();
    removeRefreshToken(session?.user?.id);
    return(
        <button onClick = {signOutUser}>SignOut</button>
    );
}

export default Signout;