import { createBrowserRouter } from "react-router-dom";
import Login from "./src/components/LoginPage";
import VolunteerList from "./src/components/VolunteerList";
import VolunteerHoursChart from "./src/components/VolunteerHoursChart/VolunteerHoursChart.jsx";
import ImageUploader from "./src/components/ImageUploader/ImageUploader.jsx";
import ShoutoutForm from "./src/components/ShoutoutForm/ShoutoutForm.jsx";
import ShowInactiveVolunteers from "./src/components/ShowInactiveVolunteers/ShowInactiveVolunteers.jsx";
import SignInForm from "./src/components/SignInForm/SignInForm.jsx";

const routes = [
    {
        path: ('/login'),
        element: <Login />
    },
    {
        path: ("/dashboard"),
        element: <> <VolunteerList /> <VolunteerHoursChart /> <ImageUploader /> <ShoutoutForm /> <ShowInactiveVolunteers /> <SignInForm /></>
    }
]
const router = createBrowserRouter(routes)

export default router;