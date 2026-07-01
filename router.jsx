import { createBrowserRouter } from "react-router-dom";
import Login from "./src/components/LoginPage";
import VolunteerList from "./src/components/VolunteerList";
import VolunteerHoursChart from "./src/components/VolunteerHoursChart";

const routes = [
    {
        path: ('/login'),
        element: <Login />
    },
    {
        path: ("/dashboard"),
        element: <> <VolunteerList /> <VolunteerHoursChart /> </>
    }
]
const router = createBrowserRouter(routes)

export default router;