import { createBrowserRouter } from "react-router-dom";
import Login from "./src/components/LoginPage";
import VolunteerList from "./src/components/VolunteerList";
import VolunteerHoursChart from "./src/components/VolunteerHoursChart";
import ImageUploader from "./src/components/ImageUploader";

const routes = [
    {
        path: ('/login'),
        element: <Login />
    },
    {
        path: ("/dashboard"),
        element: <> <VolunteerList /> <VolunteerHoursChart /> <ImageUploader /> </>
    }
]
const router = createBrowserRouter(routes)

export default router;