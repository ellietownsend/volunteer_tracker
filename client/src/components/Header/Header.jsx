import { useAuth } from "../../context/AuthContext";
<<<<<<< HEAD
=======
import { nameOfOrganization } from "../../../../shared/utils/lib";

>>>>>>> Header
import "./Header.css";


function Header() {
<<<<<<< HEAD
  return (
    <header className="header">
      {/* Logged-in user */}
      <div className="logged-in-user">
        Logged in as: <strong>{user?.name || "User"}</strong>
      </div>

      {/* Website name */}
      <div className="site-name">
        Girls Who Math
=======
    const {session} = useAuth();
  return (
    <header className="header">
      <div className="brand">
        <div className="site-name">{nameOfOrganization}</div>

        <div className="logged-in-user">
          Logged in with: <strong>{session?.user?.email || "User"}</strong>
        </div>
>>>>>>> Header
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
