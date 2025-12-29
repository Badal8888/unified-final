import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaSearch, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isMobileAboutDropdownOpen, setIsMobileAboutDropdownOpen] = useState(false);
  const [isTechnologyDropdownOpen, setIsTechnologyDropdownOpen] = useState(false);
  const [isMobileTechnologyDropdownOpen, setIsMobileTechnologyDropdownOpen] = useState(false);
  const [isMaterialsDropdownOpen, setIsMaterialsDropdownOpen] = useState(false);
  const [isMobileMaterialsDropdownOpen, setIsMobileMaterialsDropdownOpen] = useState(false);

  const lastScrollY = useRef(0);
  const heroHeight = useRef(0);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Get hero section height
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroHeight.current = heroSection.offsetHeight;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if we've scrolled at all
      setIsScrolled(currentScrollY > 50);
      
      // Hide/show navbar based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down - hide navbar
        setIsNavbarVisible(false);
      } else {
        // Scrolling up - show navbar
        setIsNavbarVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAboutDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile dropdown when mobile menu closes
  useEffect(() => {
    if (!isMobileMenuOpen) {
      setIsMobileAboutDropdownOpen(false);
      setIsMobileTechnologyDropdownOpen(false);
    }
  }, [isMobileMenuOpen]);
  

  const aboutDropdownItems = [
    { name: 'WHO WE ARE', sectionId: 'who-we-are' },
    { name: 'OUR JOURNEY', sectionId: 'our-journey' },
    { name: 'PROJECT REACH & PORTFOLIO DISTRIBUTION', sectionId: 'project-reach-portfolio' },
    { name: 'LEADERSHIP', sectionId: 'leadership' }
  ];

  const technologyDropdownItems = [
    { name: 'OVERVIEW', sectionId: 'overview' },
    { name: 'PRESTRESSED SYSTEMS', sectionId: 'prestressed-systems' },
    { name: 'POST-TENSIONED SYSTEMS', sectionId: 'post-tensioned-systems' },
    { name: 'BONDED-TENSIONED SYSTEMS', sectionId: 'bonded-tensioned-systems' },
    { name: 'UNBONDED-TENSIONED SYSTEMS', sectionId: 'unbonded-tensioned-systems' },
    { name: 'STRUCTURAL GEOMETRY', sectionId: 'structural-geometry' },
    { name: 'FAQ', sectionId: 'faq' },
  ];
  const materialsDropdownItems = [
    { name: 'PT CABLES', sectionId: 'pt-cables' },
    { name: 'ANCHOR PLATES', sectionId: 'anchor-plates' },
    { name: 'WEDGES', sectionId: 'wedges' },
  ];


  const handleDropdownItemClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    setIsMobileAboutDropdownOpen(false);
    setIsTechnologyDropdownOpen(false);
    setIsMaterialsDropdownOpen(false);  
    
    // Special handling for "our-journey" - navigate to separate route
    if (sectionId === 'our-journey') {
      navigate('/our-journey');
      return;
    }
    
    // Navigate to about-us page with hash for other sections
    const currentPath = window.location.pathname;
    if (currentPath === '/about-us') {
      // If already on about-us, just update hash
      window.location.hash = sectionId;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to about-us, then set hash after navigation
      navigate('/about-us');
      // Use setTimeout to ensure navigation completes before setting hash
      setTimeout(() => {
        window.location.hash = sectionId;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    }
  };

  const handleSectionNavigate = (basePath, sectionId) => {
    setIsMobileMenuOpen(false);
    setIsMobileAboutDropdownOpen(false);
    setIsMobileTechnologyDropdownOpen(false);
    setIsMobileMaterialsDropdownOpen(false);
    setIsAboutDropdownOpen(false);
    setIsTechnologyDropdownOpen(false);
    setIsMaterialsDropdownOpen(false);
  
    const currentPath = window.location.pathname;
  
    if (sectionId === 'our-journey') {
      navigate('/our-journey');
      return;
    }
  
    if (currentPath === basePath) {
      window.location.hash = sectionId;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(basePath);
      setTimeout(() => {
        window.location.hash = sectionId;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    }
  };
  

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/about-us', hasDropdown: true, type: 'about' },
    { name: 'TECHNOLOGY', path: '/technology', hasDropdown: true, type: 'technology' },
    { name: 'MATERIALS', path: '/materials', hasDropdown: true, type: 'materials' },
    { name: 'EXECUTION PROCESS', path: '/execution-process' },
    { name: 'OUR PROJECTS', path: '/our-projects' },
    { name: 'CAREER', path: '/career' }
  ];

  return (
    <>
    {/* Spacer to reserve space for fixed navbar */}
    <div className="navbar-spacer" />
    <header className={`navbar-container ${!isNavbarVisible && isScrolled ? 'navbar-hidden' : ''} ${isScrolled ? 'navbar-scrolled' : ''}`}>
      {/* Top Bar */}
      <div className="top-bar">
        {/* Social Icons */}
        <div className="social-icons">
          <a href="#" className="social-icon" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#" className="social-icon" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" className="social-icon" aria-label="Twitter">
            <FaXTwitter />
          </a>
          <a href="#" className="social-icon" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
        </div>

        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src="/assets/Unified New Logo.png" alt="Unified Post Tensioning Systems LLP" className="logo-img" />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-btn" aria-label="Search">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation Menu */}
      <nav className={`nav-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
      <ul className="nav-links">
  {navLinks.map((link) => (
    <li
      key={link.name}
      className={link.hasDropdown ? 'nav-item-with-dropdown' : ''}
      ref={link.hasDropdown ? dropdownRef : null}
    >
      {link.hasDropdown ? (
        <>
          <NavLink
            to={link.path}
            className={({ isActive }) =>
              `nav-link nav-link-with-dropdown ${isActive ? 'active' : ''}`
            }
            onMouseEnter={() => {
              if (link.type === 'about') setIsAboutDropdownOpen(true);
              if (link.type === 'technology') setIsTechnologyDropdownOpen(true);
              if (link.type === 'materials') setIsMaterialsDropdownOpen(true);
            }}
            onMouseLeave={() => {
              if (link.type === 'about') setIsAboutDropdownOpen(false);
              if (link.type === 'technology') setIsTechnologyDropdownOpen(false);
              if (link.type === 'materials') setIsMaterialsDropdownOpen(false);
            }}
            onClick={(e) => {
              if (window.innerWidth <= 992) {
                e.preventDefault();
                if (link.type === 'about') {
                  setIsMobileAboutDropdownOpen(!isMobileAboutDropdownOpen);
                }
                if (link.type === 'technology') {
                  setIsMobileTechnologyDropdownOpen(!isMobileTechnologyDropdownOpen);
                }
                if (link.type === 'materials') {
                  setIsMobileMaterialsDropdownOpen(!isMobileMaterialsDropdownOpen);
                }
              }
            }}
          >
            {link.name}
            <FaChevronDown
              className={`dropdown-icon ${
                (link.type === 'about' &&
                  (isAboutDropdownOpen || isMobileAboutDropdownOpen)) ||
                (link.type === 'technology' &&
                  (isTechnologyDropdownOpen || isMobileTechnologyDropdownOpen))
                  ? 'open'
                  : ''
              }`}
            />
          </NavLink>

          <ul
            className={`dropdown-menu ${
              link.type === 'about' &&
              (isAboutDropdownOpen || isMobileAboutDropdownOpen)
                ? 'open'
                : ''
            } ${
              link.type === 'technology' &&
              (isTechnologyDropdownOpen || isMobileTechnologyDropdownOpen)
                ? 'open'
                : ''
            } ${
              link.type === 'materials' &&
              (isMaterialsDropdownOpen || isMobileMaterialsDropdownOpen)
                ? 'open'
                : ''}`}
            onMouseEnter={() => {
              if (link.type === 'about') setIsAboutDropdownOpen(true);
              if (link.type === 'technology') setIsTechnologyDropdownOpen(true);
              if (link.type === 'materials') setIsMaterialsDropdownOpen(true);
            }}
            onMouseLeave={() => {
              if (link.type === 'about') setIsAboutDropdownOpen(false);
              if (link.type === 'technology') setIsTechnologyDropdownOpen(false);
              if (link.type === 'materials') setIsMaterialsDropdownOpen(false);
            }}
          >
            {(link.type === 'about'
              ? aboutDropdownItems
              : link.type === 'technology'
              ? technologyDropdownItems
              : link.type === 'materials'
              ? materialsDropdownItems
              : []
            ).map((item) => (
              <li key={item.name}>
                <button
                  className="dropdown-link"
                  onClick={() =>
                    handleSectionNavigate(link.path, item.sectionId)
                  }
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <NavLink
          to={link.path}
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          end={link.path === '/'}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {link.name}
        </NavLink>
      )}
    </li>
  ))}
</ul>

        <Link 
          to="/contact-us" 
          className="contact-btn"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          CONTACT US
        </Link>
      </nav>
    </header>
    </>
  );
};

export default Navbar;
