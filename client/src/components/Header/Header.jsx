import { useAuth } from "../../context/AuthContext";
import { nameOfOrganization } from "../../../../shared/utils/lib";
import { DemoNotice } from "./Demo";
import "./Header.css";


function Header() {
  const {session} = useAuth();
  return (
    <>
    <DemoNotice />
     <header className="header">
      {/* Logged-in user */}
      <div className="logged-in-user">
        Logged in with: <strong>{session?.user?.email || "User"}</strong>
      </div>

      {/* Website name */}
      <div className="site-name">
        {nameOfOrganization}
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

    </>
   
  );
}

export default Header;
