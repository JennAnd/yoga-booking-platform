/**
 * Main navigation component.
 * Displays the site logo and primary navigation links.
 */

import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <nav>
        <NavLink to="/">Yoga Booking Platform</NavLink>
        <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/classes">Classes</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
