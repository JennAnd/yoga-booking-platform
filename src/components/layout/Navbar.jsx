/**
 * Main navigation component.
 * Displays the brand, primary navigation links, and auth actions.
 */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getNavLinkClassName = ({ isActive }) =>
    isActive ? "navbar__link navbar__link--active" : "navbar__link";

  const isLoggedIn = false;

  const toggleMenu = () => {
    setIsMenuOpen((currentState) => !currentState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container">
        <nav className="navbar" aria-label="Main navigation">
          <div className="navbar__top-row">
            <div className="navbar__left">
              <NavLink to="/" className="navbar__brand" onClick={closeMenu}>
                Still Studio
              </NavLink>
            </div>

            <button
              type="button"
              className="navbar__menu-toggle"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <div
            className={`navbar__menu ${isMenuOpen ? "navbar__menu--open" : ""}`}
          >
            <div className="navbar__center">
              <NavLink
                to="/"
                className={getNavLinkClassName}
                onClick={closeMenu}
              >
                Home
              </NavLink>
              <NavLink
                to="/classes"
                className={getNavLinkClassName}
                onClick={closeMenu}
              >
                Classes
              </NavLink>
            </div>

            <div className="navbar__right">
              {isLoggedIn ? (
                <>
                  <NavLink
                    to="/profile"
                    className={getNavLinkClassName}
                    onClick={closeMenu}
                  >
                    Profile
                  </NavLink>
                  <button type="button" className="navbar__auth-button">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className={getNavLinkClassName}
                    onClick={closeMenu}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="navbar__cta"
                    onClick={closeMenu}
                  >
                    Join now
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
