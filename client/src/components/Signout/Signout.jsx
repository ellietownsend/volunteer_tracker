import { useAuth } from "../../context/AuthContext";
import { removeRefreshToken } from "../../services/signout";

function Signout(){
    const {signOutUser, session} = useAuth();
    console.log("calling refreh token");
    const {success, error} = async () => await removeRefreshToken(session?.user?.id);
    console.log(success, error);
    return(
        <button onClick = {signOutUser}>SignOut</button>
    );
}

export default Signout;