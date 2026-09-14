import { useAuth } from "../../context/AuthContext";
<<<<<<< HEAD
import { useActionState, useState, useEffect, useMemo } from "react"; 

function Header(){
    return (
        <p>header from header file</p>
    )
}


export default Header;
=======
import "./Header.css";


function Header() {
  return (
    <header className="header">
      {/* Logged-in user */}
      <div className="logged-in-user">
        Logged in as: <strong>{user?.name || "User"}</strong>
      </div>

      {/* Website name */}
      <div className="site-name">
        Girls Who Math
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
>>>>>>> 710bdd8 (feat: add Header component and integrate it into Dashboard)
