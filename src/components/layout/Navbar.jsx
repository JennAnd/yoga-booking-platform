/**
 * Main navigation component.
 * Displays the site logo and primary navigation links.
 */

import { NavLink } from "react-router-dom";

function Navbar() {
  const getNavLinkClassName = ({ isActive }) =>
    isActive ? "navbar__link navbar__link--active" : "navbar__link";

  return (
    <header className="site-header">
      <div className="container">
        <nav className="navbar">
          <NavLink to="/" className="navbar__brand">
            Yoga Booking Platform
          </NavLink>

          <div className="navbar__links">
            <NavLink to="/" className={getNavLinkClassName}>
              Home
            </NavLink>
            <NavLink to="/classes" className={getNavLinkClassName}>
              Classes
            </NavLink>
            <NavLink to="/login" className={getNavLinkClassName}>
              Login
            </NavLink>
            <NavLink to="/register" className={getNavLinkClassName}>
              Register
            </NavLink>
            <NavLink to="/profile" className={getNavLinkClassName}>
              Profile
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
