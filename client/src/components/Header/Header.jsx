import { useAuth } from "../../context/AuthContext";
import { nameOfOrganization, logo } from "../../../../shared/utils/lib";

import "./Header.css";


function Header() {
    const {session} = useAuth();
return (
    <header className="header">

        {logo && <img src={logo} alt="Organization Logo" className="logo" />}

        <div className="brand">
            <div className="site-name">{nameOfOrganization}</div>

            <div className="logged-in-user">
            Logged in with: <strong>{session?.user?.email || "User"}</strong>
            </div>
        </div>

      {/* Navigation tabs */}
      <nav className="nav-tabs">
        <a href="/shoutout-form">Shoutout Form</a>
        <a href="/upload-image">Upload Image</a>
        <a href="/volunteer-list">Volunteer List</a>
        <a href="/inactive-volunteers">Inactive Volunteers</a>
        <a href="/volunteer-hours">Volunteer Hours</a>
      </nav>
    </header>
  );
}

export default Header;
