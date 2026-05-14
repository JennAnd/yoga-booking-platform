/**
 * Footer component for the application.
 */

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__content">
          <div className="site-footer__brand">
            <p className="site-footer__title">Still Studio</p>
            <p className="site-footer__text">
              Yoga, breathwork, and restorative practices in a calm studio
              setting.
            </p>
          </div>

          <nav className="site-footer__links" aria-label="Footer navigation">
            <Link to="/">
              Home <span aria-hidden="true">›</span>
            </Link>
            <Link to="/classes">
              Classes <span aria-hidden="true">›</span>
            </Link>
            <Link to="/schedule">
              Schedule <span aria-hidden="true">›</span>
            </Link>
            <Link to="/memberships">
              Memberships <span aria-hidden="true">›</span>
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
