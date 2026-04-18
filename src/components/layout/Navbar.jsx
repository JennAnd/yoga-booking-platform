/**
 * Main navigation component.
 * Displays the brand, primary navigation links, and auth actions.
 */

import { NavLink } from "react-router-dom";

function Navbar() {
  const getNavLinkClassName = ({ isActive }) =>
    isActive ? "navbar__link navbar__link--active" : "navbar__link";

  const isLoggedIn = false;

  return (
    <header className="site-header">
      <div className="container">
        <nav className="navbar" aria-label="Main navigation">
          <div className="navbar__left">
            <NavLink to="/" className="navbar__brand">
              Still Studio
            </NavLink>
          </div>

          <div className="navbar__center">
            <NavLink to="/" className={getNavLinkClassName}>
              Home
            </NavLink>
            <NavLink to="/classes" className={getNavLinkClassName}>
              Classes
            </NavLink>
          </div>
          <div className="navbar__right">
            {isLoggedIn ? (
              <>
                <NavLink to="/profile" className={getNavLinkClassName}>
                  Profile
                </NavLink>
                <button type="button" className="navbar__auth-button">
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={getNavLinkClassName}>
                  Login
                </NavLink>
                <NavLink to="/register" className="navbar__cta">
                  Join now
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
