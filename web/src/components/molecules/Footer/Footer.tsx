import React from "react";
import Typography from "../../../components/atoms/Typography/index"; // Import Typography component
import "./Footer.scss"; // Import SCSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left Side: Quick Links */}
        <div className="footer-section quick-links">
          <Typography variant="h3" className={["bold", "text-dark"]}>
            Quick Links
          </Typography>
          <ul>
            <li>
              <Typography variant="span" className={["md", "text-dark"]}>
                <a href="/">Home</a>
              </Typography>
            </li>
            <li>
              <Typography variant="span" className={["md", "text-dark"]}>
                <a href="/movies">Movies</a>
              </Typography>
            </li>
            <li>
              <Typography variant="span" className={["md", "text-dark"]}>
                <a href="/about">About Us</a>
              </Typography>
            </li>
            <li>
              <Typography variant="span" className={["md", "text-dark"]}>
                <a href="/contact">Contact</a>
              </Typography>
            </li>
          </ul>
        </div>

        {/* Middle: MovieApp Title */}
        <div className="footer-section movie-app-title">
          <Typography variant="h1" className={["xxl", "bold", "text-primary"]}>
            MovieApp
          </Typography>
        </div>

        {/* Right Side: Follow Us on Social Media */}
        <div className="footer-section social-media">
          <Typography variant="h3" className={["bold", "text-dark"]}>
            Follow Us
          </Typography>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className="footer-bottom">
        <Typography
          variant="p"
          className={["md", "text-center", "text-secondary"]}
        >
          Design and Developed by movieapp 2025.
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
