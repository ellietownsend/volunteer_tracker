import { useAuth } from "../context/AuthContext";
import { Navigate } from 'react-router-dom';

const RootRedirect = ({children}) => {
    const { session } = useAuth();
    console.log(session);

    if(session === undefined){
        return <div>Loading...</div>
    }
    return session ? children : <Navigate to = "/sign-in" />;
}

export default RootRedirect;

