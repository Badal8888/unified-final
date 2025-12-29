import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Technology', path: '/technology' },
    { name: 'Our Projects', path: '/our-projects' },
    { name: 'Career', path: '/career' },
    { name: 'Contact Us', path: '/contact-us' }
  ];

  const services = [
    'Bonded Post-Tensioning',
    'Unbonded Post-Tensioning',
    'Structural Engineering',
    'Project Consultation',
    'Technical Support'
  ];

  return (
    <footer className="footer">
      {/* Main Footer */}
      <div className="footer-main">
        <div className="footer-container">
          {/* Company Info */}
          <div className="footer-column footer-about">
            <div className="footer-logo">
              <img src="/assets/Unified New Logo.png" alt="Unified" />
            </div>
            <p className="footer-description">
              India's trusted authority in Bonded & Unbonded Post-Tensioning Systems. 
              Engineering high-performance structural solutions that deliver efficiency, 
              speed, and reliability.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <FaXTwitter />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-column">
            <h4 className="footer-title">Our Services</h4>
            <ul className="footer-links">
              {services.map((service, index) => (
                <li key={index}>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-column">
            <h4 className="footer-title">Contact Us</h4>
            <div className="footer-contact">
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <p>Mumbai, Maharashtra, India</p>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <p>+91 98765 43210</p>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <p>info@unifiedpt.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-container">
          <p className="copyright">
            © {currentYear} Unified Post Tensioning Systems LLP. All Rights Reserved.
          </p>
          <div className="footer-bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="divider">|</span>
            <Link to="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;








