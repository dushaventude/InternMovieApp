import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left Side: Quick Links */}
        <div className="footer-section quick-links">
          <h3 className="lg bold text-dark">Quick Links</h3>
          <ul>
            {["Home", "Movies", "About Us", "Contact"].map((link) => (
              <li key={link}>
                <span className="sm text-dark">
                  <a href={`/${link.toLowerCase().replace(" ", "-")}`}>
                    {link}
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Middle: MovieApp Title */}
        <div className="footer-section movie-app-title">
          <h1 className="xxl bold text-primary">MovieApp</h1>
        </div>

        {/* Right Side: Follow Us on Social Media */}
        <div className="footer-section social-media">
          <h3 className="lg bold text-dark">Follow Us</h3>
          <div className="social-icons">
            {["facebook", "twitter", "instagram", "youtube"].map((platform) => (
              <a
                key={platform}
                href={`https://${platform}.com`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={`fab fa-${platform}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className="footer-bottom">
        <p className="sm text-center text-secondary">
          Design and Developed by movieapp {new Date().getFullYear()}.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
