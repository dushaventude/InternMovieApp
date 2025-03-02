import "./Footer.scss";
// import logo from "../../../assets/main_logo-removebg.png";
import logo from "../../../assets/WhiteLogo.png";
import { Link } from "react-router-dom";
import {
  FaSquareFacebook,
  FaSquareInstagram,
  FaSquareXTwitter,
  FaSquareYoutube,
} from "react-icons/fa6";

const Footer = () => {
  const links = [
    { name: "Home", path: "" },
    { name: "Movies", path: "/movies" },
    { name: "About Us", path: "" },
    { name: "Contact", path: "" },
  ];
  const sociallinks = [
    {
      name: "X",
      icon: <FaSquareXTwitter size={32} />,
      link: "https://www.x.com",
    },
    {
      name: "Instagram",
      icon: <FaSquareInstagram size={32} />,
      link: "https://www.instagram.com",
    },
    {
      name: "Facebook",
      icon: <FaSquareFacebook size={32} />,
      link: "https://www.facebook.com",
    },
    {
      name: "Youtube",
      icon: <FaSquareYoutube size={32} />,
      link: "https://www.youtube.com",
    },
  ];
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section site-logo">
          <img src={logo} />
        </div>
        <div className="footer-section">
          <h3 className="footer-header">Quick Links</h3>
          <ul className="quick-links-list">
            {links.map((link, i) => (
              <Link to={`${link.path}`} key={i} className="quick-link">
                <li>{link.name}</li>
              </Link>
            ))}
          </ul>
        </div>

        {/* Right Side: Follow Us on Social Media */}
        <div className="footer-section">
          <h3 className="footer-header">Follow Us on</h3>
          <div className="social-icons">
            {sociallinks.map((sociallink) => (
              <Link
                to={sociallink.link}
                className="social-link"
                target="_blank"
              >
                {sociallink.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className="footer-bottom">
        <p className="">
          Design and Developed by moviehub {new Date().getFullYear()}.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
