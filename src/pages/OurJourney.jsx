import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const OurJourney = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('our-journey');
  const location = useLocation();

  // Handle hash routing - scroll to section when hash is present
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1); // Remove the #
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(sectionId);
        }
      }, 100);
    } else {
      // Default to our-journey section
      setActiveSection('our-journey');
    }
  }, [location.hash]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['who-we-are', 'our-journey', 'project-reach-portfolio', 'leadership', 'certification', 'events'];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    // If section is not on this page, navigate to about-us with hash
    if (sectionId !== 'our-journey') {
      navigate(`/about-us#${sectionId}`);
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      // Update URL hash without triggering navigation
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  };

  return (
    <div className="our-journey-page" style={{ overflowX: 'hidden', width: '100%' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '50vh',
        maxHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }}
        >
          <source src="/assets/Our Journey.mp4" type="video/mp4" />
        </video>

        {/* Overlay Layer */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 149, 170, 0.6)',
          zIndex: 0.5
        }}></div>

        {/* Main Heading */}
        <h1 style={{
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          fontWeight: '900',
          color: '#ffffff',
          textAlign: 'center',
          margin: '0 auto',
          zIndex: 1,
          position: 'relative',
          textShadow: '0 4px 20px rgba(0,0,0,0.5)',
          letterSpacing: '2px',
          fontFamily: 'Anton, sans-serif',
          fontStyle: 'normal',
          paddingTop: '120px'
        }}>
          OUR JOURNEY
        </h1>

        {/* Sub-Navigation */}
        <div style={{
          marginTop: 'auto',
          marginBottom: '0',
          zIndex: 1,
          position: 'relative',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px 15px 0 0',
          padding: '15px 30px',
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <button 
            onClick={() => scrollToSection('who-we-are')}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === 'who-we-are' ? '#0095AA' : '#000000',
              fontSize: '1.2rem',
              fontWeight: activeSection === 'who-we-are' ? '700' : '600',
              cursor: 'pointer',
              padding: '5px 10px',
              fontFamily: 'sans-serif',
              transition: 'all 0.3s ease'
            }}
          >
            WHO WE ARE
          </button>
          <span style={{ color: '#0095AA', fontSize: '1.2rem' }}>-</span>
          <button 
            onClick={() => scrollToSection('our-journey')}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === 'our-journey' ? '#0095AA' : '#000000',
              fontSize: '1.2rem',
              fontWeight: activeSection === 'our-journey' ? '700' : '600',
              cursor: 'pointer',
              padding: '5px 10px',
              fontFamily: 'sans-serif',
              transition: 'all 0.3s ease'
            }}
          >
            OUR JOURNEY
          </button>
          <span style={{ color: '#0095AA', fontSize: '1.2rem' }}>-</span>
          <button 
            onClick={() => scrollToSection('project-reach-portfolio')}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === 'project-reach-portfolio' ? '#0095AA' : '#000000',
              fontSize: '1.2rem',
              fontWeight: activeSection === 'project-reach-portfolio' ? '700' : '600',
              cursor: 'pointer',
              padding: '5px 10px',
              fontFamily: 'sans-serif',
              transition: 'all 0.3s ease'
            }}
          >
            PROJECT REACH
          </button>
          <span style={{ color: '#0095AA', fontSize: '1.2rem' }}>-</span>
          <button 
            onClick={() => scrollToSection('leadership')}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === 'leadership' ? '#0095AA' : '#000000',
              fontSize: '1.2rem',
              fontWeight: activeSection === 'leadership' ? '700' : '600',
              cursor: 'pointer',
              padding: '5px 10px',
              fontFamily: 'sans-serif',
              transition: 'all 0.3s ease'
            }}
          >
            LEADERSHIP
          </button>
          <span style={{ color: '#0095AA', fontSize: '1.2rem' }}>-</span>
          <button 
            onClick={() => scrollToSection('certification')}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === 'certification' ? '#0095AA' : '#000000',
              fontSize: '1.2rem',
              fontWeight: activeSection === 'certification' ? '700' : '600',
              cursor: 'pointer',
              padding: '5px 10px',
              fontFamily: 'sans-serif',
              transition: 'all 0.3s ease'
            }}
          >
            CERTIFICATION
          </button>
          <span style={{ color: '#0095AA', fontSize: '1.2rem' }}>-</span>
          <button 
            onClick={() => scrollToSection('events')}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === 'events' ? '#0095AA' : '#000000',
              fontSize: '1.2rem',
              fontWeight: activeSection === 'events' ? '700' : '600',
              cursor: 'pointer',
              padding: '5px 10px',
              fontFamily: 'sans-serif',
              transition: 'all 0.3s ease'
            }}
          >
            EVENTS
          </button>
        </div>
      </section>

      {/* News Ticker - Same as Home Page */}
      <div className="ticker-wrapper" style={{
        position: 'relative',
        width: '100%',
        background: '#0095AA',
        overflow: 'hidden',
        zIndex: 10
      }}>
        <div className="ticker" style={{
          display: 'flex',
          width: '100%',
          overflow: 'hidden'
        }}>
          <div className="ticker-content" style={{
            display: 'flex',
            animation: 'tickerScroll 25s linear infinite',
            whiteSpace: 'nowrap'
          }}>
            <span className="ticker-item" style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '18px 60px',
              fontSize: '25px',
              fontWeight: '600',
              color: '#ffffff',
              letterSpacing: '0.5px'
            }}>★ Quality Matters, Over Quantity ★</span>
            <span className="ticker-item" style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '18px 60px',
              fontSize: '25px',
              fontWeight: '600',
              color: '#ffffff',
              letterSpacing: '0.5px'
            }}>★ Post-tensioning you can trust ★</span>
            <span className="ticker-item" style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '18px 60px',
              fontSize: '25px',
              fontWeight: '600',
              color: '#ffffff',
              letterSpacing: '0.5px'
            }}>★ Delivering structural efficiency every time ★</span>
            <span className="ticker-item" style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '18px 60px',
              fontSize: '25px',
              fontWeight: '600',
              color: '#ffffff',
              letterSpacing: '0.5px'
            }}>★ Engineering excellence, project after project ★</span>
            <span className="ticker-item" style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '18px 60px',
              fontSize: '25px',
              fontWeight: '600',
              color: '#ffffff',
              letterSpacing: '0.5px'
            }}>★ Built on engineering, delivered with certainty ★</span>
          </div>
        </div>
      </div>

      {/* Add CSS for ticker animation */}
      <style>{`
        @keyframes tickerScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      {/* OUR JOURNEY Section */}
      <section id="our-journey" style={{
        position: 'relative',
        padding: '80px 40px 100px 40px',
        minHeight: '60vh',
        overflow: 'hidden',
        background: '#ffffff'
      }}>
        {/* Background Image with Opacity */}
        <div style={{
          position: 'absolute',
          top: '100px',
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("/assets/our journey bg.jpeg")',
          backgroundPosition: 'left top',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% auto',
          opacity: 0.1,
          zIndex: 0,
          pointerEvents: 'none'
        }}></div>
        {/* OUR JOURNEY Heading */}
        <h2 style={{
          fontSize: 'clamp(2.5rem, 7vw, 5rem)',
          fontWeight: '900',
          color: '#1a2a5e',
          fontFamily: 'Anton, sans-serif',
          margin: '0 auto 60px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: '1400px',
          padding: '0 40px'
        }}>
          OUR JOURNEY
        </h2>

        {/* Company Establishment Block - Separate Div */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1400px',
          margin: '0 auto 60px',
          textAlign: 'center',
          padding: '0 40px'
        }}>
          <p style={{
            fontSize: '1.8rem',
            lineHeight: '1.4',
            color: '#1a2a5e',
            margin: '0 0 5px 0',
            fontWeight: '900',
            letterSpacing: '0.5px',
            fontFamily: "'DM Sans', sans-serif",
            fontStyle: 'normal'
          }}>
            Established in 2018,
          </p>
          <p style={{
            fontSize: '2rem',
            color: '#0095AA',
            margin: '0 0 5px 0',
            fontWeight: '700',
            letterSpacing: '1px',
            fontFamily: "'DM Sans', sans-serif"
          }}>
            Unified Post-Tensioning Systems LLP
          </p>
          <p style={{
            fontSize: '1.8rem',
            color: '#1a2a5e',
            fontWeight: '900',
            letterSpacing: '0.5px',
            fontFamily: "'DM Sans', sans-serif",
            fontStyle: 'normal'
          }}>
            was founded on a clear principle
          </p>
          <p style={{
            fontSize: '1.8rem',
            color: '#1a2a5e',
            margin: '0',
            fontWeight: '900',
            fontStyle: 'italic',
            letterSpacing: '0.8px',
            fontFamily: "'DM Sans', sans-serif",
            display: 'inline-block',
            borderRadius: '8px'
          }}>
            "Quality matters more than quantity"
          </p>
        </div>
        
        {/* Image-Text Layout - Separate Div */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          gap: '60px',
          alignItems: 'flex-start'
        }}>
          {/* Left Side - Text Content */}
          <div style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Paragraph 1 */}
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#333',
              margin: 0,
              textAlign: 'justify',
              fontWeight: '500',
              textIndent: '50px',
              paddingLeft: 0
            }}>
              As India's construction sector rapidly expanded, projects demanded longer spans, slimmer slabs, faster cycles, and tighter cost control. Post-tensioning was becoming essential but execution standards across the industry were inconsistent, often driven by shortcuts rather than engineering discipline.
            </p>
            
            {/* Highlight Bar 1 */}
            <div style={{
              background: '#1a2a5e',
              color: '#ffffff',
              padding: '15px 25px',
              textAlign: 'center',
              fontWeight: '900',
              fontSize: '1.5rem',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              margin: '20px 0'
            }}>
              UNIFIED WAS CREATED TO CLOSE THIS GAP
            </div>
            
            {/* Paragraph 2 */}
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#333',
              margin: 0,
              textAlign: 'justify',
              fontWeight: '500',
              textIndent: '50px',
              paddingLeft: 0
            }}>
              From the beginning, the company focused on premium bonded and unbonded post-tensioning systems, supported by structured planning, material traceability, trained execution teams, and strict compliance with engineering intent.
            </p>
            
            {/* Paragraph 3 */}
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#333',
              margin: '20px 0',
              textAlign: 'justify',
              fontWeight: '500',
              textIndent: '50px',
              paddingLeft: 0
            }}>
              Rather than treating PT as an isolated site task, Unified embedded a process-led methodology understanding structural intent, controlling tendon layouts and sequencing, executing with precision, and documenting every stressing operation against defined standards.
            </p>
          </div>

          {/* Right Side - Video */}
          <div style={{
            flex: '1',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
            maxHeight: '600px'
          }}>
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            >
              <source src="/assets/Our Journey Video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Today Unified Box - Separate Section */}
        {/* Today Unified Box - Compact Version */}
<div style={{
  position: 'relative',
  zIndex: 1,
  maxWidth: '1200px',
  margin: '0 0 0 auto',
  display: 'flex',
  gap: '40px',
  alignItems: 'flex-start'
}}>
  {/* Left Side - Empty */}
  <div style={{ flex: '1' }}></div>

  {/* Right Side - Teal Box */}
  <div style={{
    flex: '1',
    background: '#0095AA',
    borderRadius: '12px',
    padding: '28px 32px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.12)'
  }}>
    {/* Main Text */}
    <p style={{
      fontSize: '1rem',
      color: '#ffffff',
      lineHeight: '1.6',
      marginBottom: '18px'
    }}>
      Today, Unified stands as a trusted PT partner across multiple regions,
      delivering systems aligned with modern engineering requirements and the
      evolving expectations of India's construction industry.
    </p>

    {/* Explore Our Projects Heading */}
    <h3 style={{
      fontSize: '0.8rem',
      fontWeight: '700',
      color: '#ffffff',
      margin: '18px 0 14px 0',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      textAlign: 'center'
    }}>
      EXPLORE OUR PROJECTS
    </h3>

    {/* Visit Projects Button */}
    <div style={{ textAlign: 'center' }}>
      <button
        onClick={() => navigate('/our-projects')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          background: '#ffffff',
          color: '#0095AA',
          padding: '12px 24px',
          borderRadius: '50px',
          border: 'none',
          fontSize: '16px',
          fontWeight: '700',
          fontFamily: "'DM Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          cursor: 'pointer',
          transition: 'all 0.25s ease',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.14)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        }}
      >
        <span>Visit Projects</span>
        <div style={{
          width: '22px',
          height: '22px',
          background: '#0095AA',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
    </div>
  </div>
</div>

      </section>
    </div>
  )
}

export default OurJourney
