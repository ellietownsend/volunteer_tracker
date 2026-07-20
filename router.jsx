import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./src/routes/Dashboard";
import SignInForm from "./src/components/SignInForm/SignInForm";
import RootRedirect from "./src/routes/Rootdirectory";
import VolunteerList from "./src/components/VolunteerList"
const routes = [
    {
        path: ('/sign-in'),
        element: <SignInForm />
    },
    {

        path: ("/dashboard"),
        element: <> 
            <RootRedirect>
                <Dashboard />
            </RootRedirect>
            </>
    }
]
const router = createBrowserRouter(routes)

export default router;