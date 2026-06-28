import { createBrowserRouter } from "react-router-dom";
import Login from "./src/components/LoginPage";
import VolunteerList from "./src/components/VolunteerList";

const routes = [
    {
        path: ('/login'),
        element: <Login />
    },
    {
        path: ("/dashboard"),
        element: <VolunteerList />
    }
]
const router = createBrowserRouter(routes)

export default router;