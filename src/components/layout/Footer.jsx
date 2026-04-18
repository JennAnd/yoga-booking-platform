/**
 * Footer component for the application.
 */

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__content">
          <div className="site-footer__brand">
            <p className="site-footer__title">Still Studio</p>
            <p className="site-footer__text">
              A calm space for heated and non-heated yoga, breathwork, and
              restorative classes.
            </p>
          </div>

          <div className="site-footer__links">
            <a href="#">Instagram</a>
            <a href="#">Schedule</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
