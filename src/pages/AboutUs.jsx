import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const AboutUs = () => {
  const navigate = useNavigate();
  // States for Interactive Map
  const [activeCity, setActiveCity] = useState(null);
  const [activeSection, setActiveSection] = useState('project-reach-portfolio');
  const [currentHash, setCurrentHash] = useState('');
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef({});

  const cities = [
    {
      id: 'delhi',
      name: 'New Delhi',
      lat: 28.6139,
      lng: 77.2090,
      type: 'capital',
      description: 'The capital of India, a sprawling metropolitan area in the north. A historic city featuring iconic landmarks like the Red Fort, India Gate, and Qutub Minar, blending ancient history with modern governance.',
      image: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'mumbai',
      name: 'Mumbai',
      lat: 19.0760,
      lng: 72.8777,
      type: 'finance',
      description: 'The financial powerhouse and home of Bollywood. Mumbai is a city of dreams, known for its vibrant street life, Marine Drive, and the historic Gateway of India overlooking the Arabian Sea.',
      image: 'https://images.unsplash.com/photo-1562337590-8957b1efac63?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'bengaluru',
      name: 'Bengaluru',
      lat: 12.9716,
      lng: 77.5946,
      type: 'tech',
      description: 'Known as the Silicon Valley of India, Bengaluru is famous for its pleasant climate, lush green parks, and thriving tech scene. A hub for innovation and cosmopolitan culture.',
      image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'hyderabad',
      name: 'Hyderabad',
      lat: 17.3850,
      lng: 78.4867,
      type: 'tech',
      description: 'The City of Pearls, known for its rich history, biryani, and growing IT sector. Home to historic monuments like Charminar and modern tech parks.',
      image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'chennai',
      name: 'Chennai',
      lat: 13.0827,
      lng: 80.2707,
      type: 'culture',
      description: 'The cultural capital of South India, known for its classical music, temples, and beautiful Marina Beach. A major economic and educational hub.',
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'kolkata',
      name: 'Kolkata',
      lat: 22.5726,
      lng: 88.3639,
      type: 'culture',
      description: 'The City of Joy, known for its intellectual heritage, colonial architecture, and vibrant arts scene. Home to the iconic Howrah Bridge and Victoria Memorial.',
      image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'pune',
      name: 'Pune',
      lat: 18.5204,
      lng: 73.8567,
      type: 'tech',
      description: 'The Oxford of the East, known for its educational institutions, pleasant weather, and growing IT industry. A perfect blend of tradition and modernity.',
      image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'ahmedabad',
      name: 'Ahmedabad',
      lat: 23.0225,
      lng: 72.5714,
      type: 'business',
      description: 'The Manchester of India, known for its textile industry, business acumen, and rich cultural heritage. Home to the Sabarmati Ashram.',
      image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'jaipur',
      name: 'Jaipur',
      lat: 26.9124,
      lng: 75.7873,
      type: 'culture',
      description: 'The Pink City, known for its stunning palaces, forts, and vibrant markets. A major tourist destination showcasing Rajasthan\'s royal heritage.',
      image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'surat',
      name: 'Surat',
      lat: 21.1702,
      lng: 72.8311,
      type: 'business',
      description: 'The Diamond City of India, known for its diamond cutting and polishing industry, textile manufacturing, and rapid urban development.',
      image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const handleCityClick = (city) => {
    setActiveCity(city);
    if (mapInstance.current) {
      mapInstance.current.flyTo([city.lat, city.lng], 7, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  };

  const closePanel = () => {
    setActiveCity(null);
    if (mapInstance.current) {
      mapInstance.current.flyTo([22.9734, 78.6569], 5, {
        duration: 1.5
      });
    }
  };

  useEffect(() => {
    // Function to initialize map
    const initializeMap = () => {
      if (mapRef.current && !mapInstance.current) {
        console.log('Initializing Map...', mapRef.current);
        
        // Add Custom Styles for Map
        if (!document.getElementById('map-custom-styles')) {
          const style = document.createElement('style');
          style.id = 'map-custom-styles';
          style.innerHTML = `
            .custom-marker { background: none; border: none; }
            .marker-wrapper { 
              display: flex; 
              flex-direction: column; 
              align-items: center; 
              justify-content: center; 
              width: 30px; 
              height: 30px; 
              animation: float 3s ease-in-out infinite;
              filter: drop-shadow(0 4px 10px rgba(0,0,0,0.2));
            }
            .marker-pin { 
              width: 16px; 
              height: 16px; 
              background: #0095AA; 
              border: 3px solid white; 
              border-radius: 50%; 
              box-shadow: 0 0 0 6px rgba(0, 149, 170, 0.4); 
              transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); 
              cursor: pointer; 
              position: relative; 
              z-index: 2; 
            }
            .type-capital { --marker-color: #ef4444; --marker-glow: rgba(239, 68, 68, 0.3); }
            .type-finance { --marker-color: #f59e0b; --marker-glow: rgba(245, 158, 11, 0.3); }
            .type-tech { --marker-color: #3b82f6; --marker-glow: rgba(59, 130, 246, 0.3); }
            .type-culture { --marker-color: #a855f7; --marker-glow: rgba(168, 85, 247, 0.3); }
            .type-business { --marker-color: #10b981; --marker-glow: rgba(16, 185, 129, 0.3); }
            .marker-pin::after { 
              content: ''; 
              position: absolute; 
              top: 50%; 
              left: 50%; 
              width: 100%; 
              height: 100%; 
              background: #0095AA; 
              border-radius: 50%; 
              transform: translate(-50%, -50%); 
              animation: radar-pulse 2s infinite; 
              z-index: -1; 
              opacity: 0.5; 
            }
            @keyframes radar-pulse { 0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; } 100% { transform: translate(-50%, -50%) scale(4); opacity: 0; } }
            @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-5px); } 100% { transform: translateY(0px); } }
            .marker-label { 
              position: absolute; 
              bottom: 30px; 
              background: #1e293b; 
              color: white; 
              padding: 6px 12px; 
              border-radius: 8px; 
              font-size: 11px; 
              font-weight: 700; 
              white-space: nowrap; 
              box-shadow: 0 10px 20px rgba(0,0,0,0.2); 
              opacity: 0; 
              transform: translateY(10px) scale(0.9); 
              transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); 
              pointer-events: none; 
            }
            .marker-wrapper:hover .marker-label { opacity: 1; transform: translateY(0) scale(1); }
            .marker-wrapper:hover .marker-pin { transform: scale(1.3); background: #fff; border-color: #0095AA; }
            .marker-pin.active { background: #fff; border-color: #0095AA; transform: scale(1.3); }
            .leaflet-container { background: #cbd5e1 !important; outline: 0; }
          `;
          document.head.appendChild(style);
        }

        // Initialize Map
        mapInstance.current = L.map(mapRef.current, {
          zoomControl: false,
          attributionControl: false,
          scrollWheelZoom: false
        }).setView([22.9734, 78.6569], 5);

        // Standard OSM Tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19
        }).addTo(mapInstance.current);

        // Force resize check
        mapInstance.current.invalidateSize();

        cities.forEach(city => {
          const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `
              <div class="marker-wrapper type-${city.type}">
                <div class="marker-label">${city.name}</div>
                <div class="marker-pin" id="pin-${city.id}"></div>
              </div>
            `,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          });

          const marker = L.marker([city.lat, city.lng], { icon: customIcon }).addTo(mapInstance.current);
          markersRef.current[city.id] = marker;

          marker.on('click', () => {
            handleCityClick(city);
          });
        });
      }
    };

    // Small delay to ensure DOM and dimensions are ready
    const timer = setTimeout(() => {
      initializeMap();
    }, 500);

    // Also try to initialize when section becomes visible
    const section = document.getElementById('project-reach-portfolio');
    if (section) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !mapInstance.current) {
            setTimeout(() => {
              initializeMap();
            }, 300);
          }
        });
      }, { threshold: 0.1 });

      observer.observe(section);

      return () => {
        if (timer) clearTimeout(timer);
        observer.disconnect();
        if (mapInstance.current) {
          mapInstance.current.remove();
          mapInstance.current = null;
        }
      };
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // Handle hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentHash(hash);
      if (hash) {
        setActiveSection(hash);
        // Scroll to section after a short delay to ensure DOM is ready
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        // No hash - show all sections
        setActiveSection('project-reach-portfolio');
      }
    };

    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    // Special handling for "our-journey" - navigate to separate route
    if (sectionId === 'our-journey') {
      navigate('/our-journey');
      return;
    }
    
    // Update URL hash instead of navigating
    window.location.hash = sectionId;
    setActiveSection(sectionId);
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to check if section should be visible
  const isSectionVisible = (sectionId) => {
    // If no hash, show all sections
    if (!currentHash) return true;
    // If hash exists, show only that section
    return currentHash === sectionId;
  };


  // Track active section on scroll (only when showing all sections)
  useEffect(() => {
    // Only track scroll if no hash is set (showing all sections)
    if (currentHash) return;

    const handleScroll = () => {
      const sections = ['who-we-are', 'our-journey', 'project-reach-portfolio', 'vision-values-mission', 'leadership'];
      const scrollPosition = window.scrollY + 200; // Offset for better detection

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.style.display !== 'none') {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentHash]);

  return (
    <div className="about-us-page" style={{ overflowX: 'hidden', width: '100%' }}>
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
          key={currentHash === 'leadership' ? 'leadership-video' : currentHash === 'certification' ? 'certification-video' : 'aboutus-video'}
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
          <source src={
            currentHash === 'leadership' ? "/assets/leadership-bg.mp4" :
            currentHash === 'certification' ? "/assets/certification-bg.mp4" :
            "/assets/aboutusbgvideo.mp4"
          } type="video/mp4" />
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
          paddingTop: '60px'
        }}>
          {currentHash === 'leadership' ? 'LEADERSHIP' :
           currentHash === 'certification' ? 'CERTIFICATION' :
           'ABOUT US'}
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
          </div>
        </div>
      </div>

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

      {/* WHO WE ARE Section */}
<section
  id="who-we-are"
  style={{
    position: 'relative',
    padding: '60px 40px 100px 40px',
    minHeight: '60vh',
    overflow: 'hidden',
    display: isSectionVisible('who-we-are') ? 'block' : 'none'
  }}
>
  {/* Background Image */}
  <img
    src="/assets/Who we are bg.jpeg"
    alt="Who We Are Background"
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: 0
    }}
  />

  {/* Overlay */}
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(255,255,255,0.7)',
      zIndex: 0.5
    }}
  />

  {/* WHO WE ARE Heading */}
  <h2
    style={{
      fontSize: 'clamp(2.5rem, 7vw, 5rem)',
      fontWeight: '900',
      color: '#1a2a5e',
      fontFamily: 'Anton, sans-serif',
      margin: '0 auto 60px',
      textAlign: 'center',
      position: 'relative',
      zIndex: 1
    }}
  >
    WHO WE ARE
  </h2>

  {/* Content */}
  <div
    style={{
      position: 'relative',
      zIndex: 1,
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'flex',
      gap: '50px',
      alignItems: 'center'
    }}
  >
    {/* Video */}
    <div
      style={{
        flex: '0.8',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
      }}
    >
      <video autoPlay loop muted playsInline style={{ width: '100%' }}>
        <source src="/assets/whowearevideo.mp4" type="video/mp4" />
      </video>
    </div>

    {/* Right Side - Text Content */}
    <div style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#333',
              margin: 0,
              textAlign: 'justify',
              fontWeight: '500'
            }}>
              Unified Post-Tensioning Systems LLP is a specialised engineering firm delivering bonded and unbonded post-tensioning solutions for modern construction across India.
            </p>
            
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#333',
              margin: 0,
              textAlign: 'justify',
              fontWeight: '500'
            }}>
              We operate with a disciplined, process-driven approach that integrates design, detailing, material control, and site execution into a single, accountable system. Our focus is on engineering clarity, execution accuracy, and long-term structural performance not shortcuts or site-level improvisation.
            </p>
            
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#333',
              margin: 0,
              textAlign: 'justify',
              fontWeight: '500'
            }}>
              Unified is built on dependability, consistency, and cost efficiency. Our systems enable longer spans, optimised slab behaviour, reduced structural weight, and predictable construction outcomes without compromising safety or quality.
            </p>
            
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#333',
              margin: 0,
              textAlign: 'justify',
              fontWeight: '500'
            }}>
              We do not treat post-tensioning as a routine site activity. We treat it as a critical structural system that demands planning, traceability, and technical accountability at every stage of the project lifecycle.
            </p>
          </div>
        </div>




</section>
{/* VISION / VALUES / MISSION — PART OF WHO WE ARE */}
<section
  style={{
    padding: '100px 40px 0',
    position: 'relative'
  }}
>
  <div
    style={{
      maxWidth: '1400px',
      margin: '0 auto'
    }}
  >
   
    {/* SVG */}
    <div style={{ marginTop: '-80px', textAlign: 'center' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1366 1072.41"
        style={{ width: '100%', maxWidth: '1200px', height: 'auto' }}
      >
        <defs>
          <style>
            {`
              .cls-1 {
        letter-spacing: .03em;
      }

      .cls-2 {
        letter-spacing: .03em;
      }

      .cls-3 {
        letter-spacing: 0em;
      }

      .cls-4 {
        letter-spacing: 0em;
      }

      .cls-5 {
        fill: #f4f4f4;
      }

      .cls-5, .cls-6, .cls-7 {
        fill-rule: evenodd;
      }

      .cls-8 {
        letter-spacing: .01em;
      }

      .cls-9 {
        letter-spacing: 0em;
      }

      .cls-10 {
        letter-spacing: .02em;
      }

      .cls-11 {
        letter-spacing: .01em;
      }

      .cls-12 {
        letter-spacing: .02em;
      }

      .cls-13 {
        letter-spacing: 0em;
      }

      .cls-14 {
        letter-spacing: 0em;
      }

      .cls-15 {
        letter-spacing: 0em;
      }

      .cls-16 {
        letter-spacing: 0em;
      }

      .cls-17 {
        letter-spacing: .02em;
      }

      .cls-18 {
        letter-spacing: .02em;
      }

      .cls-19 {
        letter-spacing: .02em;
      }

      .cls-20 {
        fill: #898989;
      }

      .cls-21 {
        letter-spacing: 0em;
      }

      .cls-22 {
        letter-spacing: .01em;
      }

      .cls-23 {
        letter-spacing: -.08em;
      }

      .cls-6 {
        fill: #f2f2f2;
      }

      .cls-24 {
        letter-spacing: 0em;
      }

      .cls-25 {
        letter-spacing: -.01em;
      }

      .cls-26 {
        letter-spacing: 0em;
      }

      .cls-27 {
        letter-spacing: 0em;
      }

      .cls-28 {
        letter-spacing: .02em;
      }

      .cls-29 {
        filter: url(#drop-shadow-2);
      }

      .cls-30 {
        letter-spacing: -.01em;
      }

      .cls-31 {
        letter-spacing: 0em;
      }

      .cls-32 {
        letter-spacing: .01em;
      }

      .cls-33 {
        letter-spacing: -.02em;
      }

      .cls-34 {
        letter-spacing: 0em;
      }

      .cls-35 {
        letter-spacing: -.01em;
      }

      .cls-36 {
        letter-spacing: 0em;
      }

      .cls-37 {
        letter-spacing: -.01em;
      }

      .cls-38 {
        letter-spacing: 0em;
      }

      .cls-39 {
        letter-spacing: 0em;
      }

      .cls-40 {
        letter-spacing: .03em;
      }

      .cls-41 {
        letter-spacing: 0em;
      }

      .cls-42 {
        letter-spacing: .01em;
      }

      .cls-43 {
        letter-spacing: .01em;
      }

      .cls-44 {
        letter-spacing: .02em;
      }

      .cls-45 {
        letter-spacing: .03em;
      }

      .cls-46 {
        letter-spacing: 0em;
      }

      .cls-47 {
        letter-spacing: 0em;
      }

      .cls-48, .cls-49 {
        fill: #009cb5;
      }

      .cls-48, .cls-50 {
        font-family: AcuminConcept-WideBold, 'Acumin Variable Concept';
        font-size: 36px;
        font-variation-settings: 'wght' 700, 'wdth' 115, 'slnt' 0;
        font-weight: 700;
      }

      .cls-51 {
        stroke-dasharray: 4.71 4.71;
      }

      .cls-51, .cls-52, .cls-53, .cls-54, .cls-55 {
        fill: none;
        stroke: #231f20;
        stroke-miterlimit: 10;
        stroke-width: 2px;
      }

      .cls-56 {
        letter-spacing: 0em;
      }

      .cls-57 {
        letter-spacing: 0em;
      }

      .cls-58 {
        font-family: AcuminConcept-Black, 'Acumin Variable Concept';
        font-size: 20px;
        font-variation-settings: 'wght' 800, 'wdth' 100, 'slnt' 0;
      }

      .cls-58, .cls-59, .cls-50 {
        fill: #2b387a;
      }

      .cls-58, .cls-60, .cls-61 {
        font-weight: 800;
      }

      .cls-62 {
        letter-spacing: 0em;
      }

      .cls-63 {
        letter-spacing: 0em;
      }

      .cls-64 {
        letter-spacing: .01em;
      }

      .cls-65 {
        opacity: .3;
      }

      .cls-66 {
        letter-spacing: .01em;
      }

      .cls-67 {
        letter-spacing: 0em;
      }

      .cls-68 {
        letter-spacing: .02em;
      }

      .cls-69 {
        letter-spacing: .01em;
      }

      .cls-70 {
        letter-spacing: 0em;
      }

      .cls-71 {
        letter-spacing: 0em;
      }

      .cls-72 {
        letter-spacing: 0em;
      }

      .cls-73 {
        letter-spacing: -.01em;
      }

      .cls-52 {
        stroke-dasharray: 4.86 4.86;
      }

      .cls-74 {
        letter-spacing: 0em;
      }

      .cls-75 {
        letter-spacing: 0em;
      }

      .cls-76, .cls-7, .cls-60 {
        fill: #fff;
      }

      .cls-77 {
        letter-spacing: 0em;
      }

      .cls-78 {
        letter-spacing: 0em;
      }

      .cls-79 {
        letter-spacing: -.04em;
      }

      .cls-80 {
        letter-spacing: -.02em;
      }

      .cls-53 {
        stroke-dasharray: 4.98 4.98;
      }

      .cls-81 {
        letter-spacing: 0em;
      }

      .cls-82 {
        letter-spacing: -.12em;
      }

      .cls-83 {
        letter-spacing: 0em;
      }

      .cls-84 {
        letter-spacing: 0em;
      }

      .cls-85 {
        letter-spacing: 0em;
      }

      .cls-86 {
        letter-spacing: 0em;
      }

      .cls-87 {
        letter-spacing: 0em;
      }

      .cls-88 {
        letter-spacing: 0em;
      }

      .cls-89 {
        letter-spacing: 0em;
      }

      .cls-90 {
        letter-spacing: .02em;
      }

      .cls-91 {
        letter-spacing: 0em;
      }

      .cls-92 {
        letter-spacing: -.07em;
      }

      .cls-93 {
        letter-spacing: .01em;
      }

      .cls-94 {
        letter-spacing: 0em;
      }

      .cls-95 {
        letter-spacing: 0em;
      }

      .cls-96 {
        letter-spacing: 0em;
      }

      .cls-97 {
        letter-spacing: 0em;
      }

      .cls-98 {
        letter-spacing: .02em;
      }

      .cls-99 {
        letter-spacing: .01em;
      }

      .cls-100 {
        letter-spacing: 0em;
      }

      .cls-101 {
        letter-spacing: 0em;
      }

      .cls-102 {
        letter-spacing: .01em;
      }

      .cls-103 {
        letter-spacing: 0em;
      }

      .cls-104 {
        letter-spacing: -.01em;
      }

      .cls-105 {
        letter-spacing: 0em;
      }

      .cls-106 {
        font-family: AcuminConcept-Regular, 'Acumin Variable Concept';
        font-size: 19.69px;
        font-variation-settings: 'wght' 400, 'wdth' 100, 'slnt' 0;
      }

      .cls-106, .cls-107, .cls-108, .cls-61 {
        fill: #231f20;
      }

      .cls-109 {
        letter-spacing: 0em;
      }

      .cls-110 {
        letter-spacing: .03em;
      }

      .cls-111 {
        letter-spacing: -.1em;
      }

      .cls-112 {
        filter: url(#drop-shadow-1);
      }

      .cls-113 {
        letter-spacing: 0em;
      }

      .cls-114 {
        letter-spacing: -.06em;
      }

      .cls-115 {
        letter-spacing: .01em;
      }

      .cls-116 {
        letter-spacing: -.09em;
      }

      .cls-117 {
        letter-spacing: 0em;
      }

      .cls-118 {
        letter-spacing: 0em;
      }

      .cls-119 {
        letter-spacing: .01em;
      }

      .cls-120 {
        letter-spacing: 0em;
      }

      .cls-121 {
        letter-spacing: .02em;
      }

      .cls-122 {
        letter-spacing: .01em;
      }

      .cls-123 {
        letter-spacing: 0em;
      }

      .cls-124 {
        fill: #b9b3b5;
      }

      .cls-125 {
        letter-spacing: 0em;
      }

      .cls-126 {
        letter-spacing: 0em;
      }

      .cls-127 {
        letter-spacing: 0em;
      }

      .cls-128 {
        letter-spacing: .03em;
      }

      .cls-129 {
        letter-spacing: 0em;
      }

      .cls-130 {
        letter-spacing: 0em;
      }

      .cls-131 {
        letter-spacing: 0em;
      }

      .cls-132 {
        letter-spacing: 0em;
      }

      .cls-133 {
        letter-spacing: -.02em;
      }

      .cls-134 {
        letter-spacing: 0em;
      }

      .cls-60, .cls-61 {
        font-family: AcuminConcept-WideBlack, 'Acumin Variable Concept';
        font-size: 41.35px;
        font-variation-settings: 'wght' 800, 'wdth' 115, 'slnt' 0;
      }

      .cls-135 {
        letter-spacing: 0em;
      }

      .cls-136 {
        letter-spacing: 0em;
      }

      .cls-137 {
        letter-spacing: .01em;
      }

      .cls-138 {
        letter-spacing: -.01em;
      }

      .cls-139 {
        letter-spacing: 0em;
      }

      .cls-140 {
        letter-spacing: .01em;
      }

      .cls-141 {
        letter-spacing: .01em;
      }

      .cls-142 {
        letter-spacing: 0em;
      }

      .cls-143 {
        letter-spacing: 0em;
      }

      .cls-144 {
        letter-spacing: .01em;
      }

      .cls-145 {
        letter-spacing: 0em;
      }

      .cls-146 {
        letter-spacing: -.07em;
      }

      .cls-147 {
        letter-spacing: 0em;
      }

      .cls-148 {
        letter-spacing: 0em;
      }

      .cls-149 {
        letter-spacing: 0em;
      }

      .cls-150 {
        letter-spacing: -.01em;
      }

      .cls-151 {
        letter-spacing: 0em;
      }

      .cls-152 {
        letter-spacing: 0em;
      }

      .cls-153 {
        letter-spacing: .05em;
      }

      .cls-154 {
        letter-spacing: .02em;
      }

      .cls-155 {
        letter-spacing: -.02em;
      }

      .cls-156 {
        letter-spacing: 0em;
      }

      .cls-157 {
        letter-spacing: .02em;
      }

      .cls-158 {
        letter-spacing: -.01em;
      }

      .cls-159 {
        letter-spacing: .02em;
      }

      .cls-160 {
        letter-spacing: .02em;
      }

      .cls-161 {
        letter-spacing: 0em;
      }

      .cls-162 {
        letter-spacing: 0em;
      }

      .cls-163 {
        letter-spacing: 0em;
      }

      .cls-164 {
        letter-spacing: 0em;
      }

      .cls-165 {
        letter-spacing: 0em;
      }

      .cls-166 {
        letter-spacing: .02em;
      }

      .cls-167 {
        letter-spacing: .02em;
      }

      .cls-168 {
        letter-spacing: 0em;
      }

      .cls-169 {
        letter-spacing: .03em;
      }

      .cls-170 {
        letter-spacing: 0em;
      }

      .cls-171 {
        letter-spacing: -.01em;
      }

      .cls-172 {
        letter-spacing: 0em;
      }

      .cls-173 {
        letter-spacing: -.04em;
      }

      .cls-174 {
        letter-spacing: 0em;
      }

      .cls-175 {
        letter-spacing: 0em;
      }

      .cls-176 {
        letter-spacing: .02em;
      }

      .cls-177 {
        letter-spacing: -.01em;
      }

      .cls-178 {
        letter-spacing: -.01em;
      }

      .cls-179 {
        letter-spacing: 0em;
      }

      .cls-108 {
        font-family: AcuminVariableConcept, 'Acumin Variable Concept';
        font-size: 14.04px;
        font-variation-settings: 'wght' 194, 'wdth' 100, 'slnt' 0;
      }

      .cls-180 {
        letter-spacing: .03em;
      }

      .cls-181 {
        letter-spacing: .02em;
      }

      .cls-182 {
        letter-spacing: 0em;
      }

      .cls-183 {
        letter-spacing: 0em;
      }

      .cls-184 {
        letter-spacing: 0em;
      }

      .cls-185 {
        letter-spacing: .02em;
      }

      .cls-186 {
        letter-spacing: 0em;
      }

      .cls-187 {
        letter-spacing: -.01em;
      }

      .cls-188 {
        letter-spacing: 0em;
      }

      .cls-189 {
        letter-spacing: .01em;
      }

      .cls-190 {
        letter-spacing: 0em;
      }

      .cls-191 {
        letter-spacing: .12em;
      }

      .cls-192 {
        letter-spacing: -.07em;
      }

      .cls-193 {
        letter-spacing: 0em;
      }

      .cls-194 {
        letter-spacing: 0em;
      }

      .cls-195 {
        filter: url(#drop-shadow-3);
      }

      .cls-196 {
        letter-spacing: .05em;
      }

      .cls-197 {
        letter-spacing: -.01em;
      }

      .cls-198 {
        letter-spacing: 0em;
      }

      .cls-199 {
        letter-spacing: 0em;
      }

      .cls-200 {
        letter-spacing: 0em;
      }

      .cls-201 {
        letter-spacing: 0em;
      }

      .cls-202 {
        letter-spacing: 0em;
      }

      .cls-203 {
        letter-spacing: 0em;
      }

      .cls-204 {
        letter-spacing: .02em;
      }

      .cls-205 {
        letter-spacing: 0em;
      }

      .cls-206 {
        letter-spacing: 0em;
      }

      .cls-207 {
        letter-spacing: 0em;
      }

      .cls-208 {
        letter-spacing: .01em;
      }

      .cls-209 {
        letter-spacing: 0em;
      }

      .cls-210 {
        letter-spacing: .01em;
      }

      .cls-211 {
        letter-spacing: 0em;
      }

      .cls-212 {
        letter-spacing: 0em;
      }

      .cls-213 {
        letter-spacing: .03em;
      }

      .cls-214 {
        fill: #eaecec;
      }

      .cls-215 {
        letter-spacing: .02em;
      }

      .cls-216 {
        letter-spacing: .02em;
      }

      .cls-217 {
        letter-spacing: 0em;
      }

      .cls-218 {
        letter-spacing: .01em;
      }

      .cls-219 {
        letter-spacing: 0em;
      }

      .cls-220 {
        letter-spacing: 0em;
      }

      .cls-221 {
        letter-spacing: 0em;
      }

      .cls-222 {
        letter-spacing: 0em;
      }

      .cls-223 {
        letter-spacing: 0em;
      }

      .cls-224 {
        letter-spacing: 0em;
      }

      .cls-225 {
        letter-spacing: 0em;
      }

      .cls-226 {
        letter-spacing: 0em;
      }

      .cls-227 {
        letter-spacing: -.04em;
      }

      .cls-228 {
        letter-spacing: 0em;
      }

      .cls-55 {
        stroke-dasharray: 4.79 4.79;
      }

      .cls-229 {
        letter-spacing: 0em;
      }

      .cls-230 {
        letter-spacing: -.06em;
      }

      .cls-231 {
        letter-spacing: .02em;
      }

      .cls-232 {
        letter-spacing: 0em;
      }

      .cls-233 {
        letter-spacing: 0em;
      }

      .cls-234 {
        letter-spacing: -.02em;
      }

      .cls-235 {
        letter-spacing: 0em;
      }

      .cls-236 {
        opacity: .5;
      }

      .cls-237 {
        letter-spacing: 0em;
      }

      .cls-238 {
        letter-spacing: 0em;
      }

      .cls-239 {
        letter-spacing: 0em;
      }

      .cls-240 {
        letter-spacing: .01em;
      }

      .cls-241 {
        letter-spacing: 0em;
      }

      .cls-242 {
        letter-spacing: 0em;
      }

      .cls-243 {
        letter-spacing: 0em;
      }

      .cls-244 {
        letter-spacing: .01em;
      }

      .cls-245 {
        letter-spacing: 0em;
      }

      .cls-246 {
        letter-spacing: 0em;
      }

      .cls-247 {
        letter-spacing: 0em;
      }

      .cls-248 {
        letter-spacing: 0em;
      }

      .cls-249 {
        letter-spacing: .02em;
      }
            `}
          </style>
          <filter id="drop-shadow-1" x="645.39" y="114.11" width="71" height="67" filterUnits="userSpaceOnUse">
      <feOffset dx="2" dy="2"/>
      <feGaussianBlur result="blur" stdDeviation="2"/>
      <feFlood flood-color="#000" flood-opacity=".75"/>
      <feComposite in2="blur" operator="in"/>
      <feComposite in="SourceGraphic"/>
    </filter>
    <filter id="drop-shadow-2" x="1071.39" y="111.11" width="70" height="69" filterUnits="userSpaceOnUse">
      <feOffset dx="2" dy="2"/>
      <feGaussianBlur result="blur-2" stdDeviation="2"/>
      <feFlood flood-color="#000" flood-opacity=".75"/>
      <feComposite in2="blur-2" operator="in"/>
      <feComposite in="SourceGraphic"/>
    </filter>
    <filter id="drop-shadow-3" x="226.39" y="113.11" width="68" height="69" filterUnits="userSpaceOnUse">
      <feOffset dx="2" dy="2"/>
      <feGaussianBlur result="blur-3" stdDeviation="2"/>
      <feFlood flood-color="#000" flood-opacity=".75"/>
      <feComposite in2="blur-3" operator="in"/>
      <feComposite in="SourceGraphic"/>
    </filter>
    <image id="image" width="83" height="83" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFMAAABUCAYAAAD+twu4AAAACXBIWXMAABBNAAAQTQFnjAHgAAAFN0lEQVR4nO2c63LrIAyEFbc97/++bZLzo9FE3ayEuNjxbWcYO6kv8HVBgINFTp06depUVpd3ZwDUmp/70Fw06vPN978k9j1FAN8C9x0wL8EWv8P9O9m/wz5qMbBLwUQ4mYTnqRBilNh5s2lumAhlkiesydkyqFYeuNsj3c2WgZ0N6pwwLQwLLEpZmLplEG8icjX7CNZeY6jmgIltoIX18UiT2UYwPTFX6vYabPUYe51hGg3TgmAQMWUcmQlAnjOvJk2P7cUcj9fs0sh+ZgTx85EQoufGmq6RB/UK6Qc+2ybAXqdZI5xpAViIn/IXom57IeJ9RZ7VfZInTM0HOvPnca516e2x3wW0F6YNMJo+SYqqNV6rNy93ef5jFbDeW6Hqva/m/G6H9sBEkArs63Fd3VqQPU7M5MV+Vreq+7D7NYnItzmnOzC1wmQgLcAIpD1/DqHbFSi259jr+JFOoD3OZCA1WZBaCJFlJ1ZKoy6BfZEnUP0HVAH9aMzkRf5GagSJwUbPe4c8eJlBQZVqnYnVBUF+CQ80a5DNx4f4IFmXK6UaZ1qQ6Mh/8urINYFUsaqv+93j9xZnYj/SVm2v27Mm2XxpWUT48LQKcBYmVm+M3mut2p6wyov4MO0oKVSmmlunRQFnKyBVXj5L86KusjCtIz2Qtu+2FXn93sxk84tKMKOgg1WcZWoL8vLM5kFDTeVDKFCM2lGmtiJbRm9iJlTJmdEop+pGKxczRBTZqSJn4tRa039rg0KHpvvNpa4RVnFvUncPYvOyWO7QnZ4zLSh24T1BRDUbqBSAGNAtdc5rxUxkZ7/CMpfaTGw/psI5e5FnotA8GWfOOUO+ZnkTyq5DWQBiE6l7DjwoDESeoV6UreZHgOgJgYYHRkJ3HkmshjZFc+/kozkTy91czdnFjqIL7KcCcHY4yW6yd3lldYGeziwrVcVF8lNwme8OrwzMVaxk2IJKMNmP8EWOBThd1ggmewh/VIjsWdALixpnHknVIEV8mE1P53Yo1sy5HDLOPDrUdNmzbWbVLxt2Imai8OEam4LD9oKtpdFj9tzftACRAVXJmbgk5AjuRCcykBRqCaZ3wRMoUSYA2Yvp+pm9Q2Ugm2GyhhcXIu0RJCszGshVqzP37E7PlcUyZyc6cPncHt3JHFlV3tofu0Y/RNhyN8lGabvW8lv+rrkMgWZ+n2n3LdTUQ6YNybqSgbz5p/4qu9qCgdyLO7GNtCA1Da3m+NlzKDt+zWLR+9skBVl0pUj9OiDdlp4lbwGobSexetsqng62NdUcP5egbgGo7fJplbZVvGr43LJ2UsWeXHrbNUnhZEBWdQFbYTJYXjBaE1APpK3a1dVbVQszAhN1k9YAlAUbG7FZO1ml1iXSme/Y394FNQKJrmweKve0mZpJto2q+JJAMWJnQDYPlXthakbtFvdFlv/dEnvkEgWbbpAiY2AKZAAz42XMfj8CLN4z68ZhU4ujYKoQKAOczWwEmF3Dmx1HiFHU7poFGwkTYbE3Btq/i8SFyDhaP7PXl3nR2qvW3dOJo94Fd5dfJ+n7g0ReC6hvv8KX6+EYX8RvW1nzYd3IgOKry9jDwSHzsnMEAexv4uKk7FsKvfyxpgTfAYePHEqvgByiuSIqDjVx2o6BzE7pZRzJHjlEzc0Qzd3nYzNNCBaXhrA17BfhfVoGE9vq2SGqlupAl6bvvNVf2WqO0DDZ82bT0sM75rjSPpPX5WLwZoeoeucEBIvY2RGSF9W9YxbRGmZzRPx8RNU8+/0p0Fr+6adOnTp1apD+A63DuynAjN7NAAAAAElFTkSuQmCC"/>
    <image id="image-2" width="244" height="265" xlink:href="data:image/png;base64,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"/>
    <image id="image-3" width="83" height="83" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAACXBIWXMAABBNAAAQTQFnjAHgAAAFOElEQVR4nO2c63LrIAyEZTc97/++bZL+ONFE3a6EMPjunWFwUl/g64IwDha5dOnSpUtTNaxdANDU8jy7lqJBt5WvPyS2PUUQVwO8BtAhyPE73H6S7SdsoxaFuxRQBJRJeJwKQUaJHTer5gaKYEZ5AxudnIG18uA9XulpcgZ3VrBzArVALLQoZYFqzkA+RORuthGuPUd3zQEU+0QL7OOVRpNHQD0xd2p+D3Ldx56nq3oDtTAYSEwZZ2aCkufQu0njKx/M/njOZvUch0Ygb6+EID1X1gybPLB3SN/w2XYH9jxN6uFQC8GCvMlvkJq3gsTriryb/ihvoFoOdOj361jr1sdruxlqK1AbdDTdSIqaOJ6rtSxPef9zFbJeW8Hqte/m+C5ObQGKMBXa5+u8mluYLY7MlMV+VteqC3FoNorIlzmmS7CaCpTBtBAjmPb4OYSuV6jYv+No5Fs6QG1xKIOpycLUiogsOxlTujsT2BZ5Q9V/QjXUj4kFHeR3BEeYGID0uDXkAczcOFSr1qHYdBDmp/DgswXZcnyID5MNx9KqcaiFic78J3+duSWYKtYN6HaX+/0pDsVxpm3m3pBoS7Ll0rqI8FvZashZoNjUMapvtZl7wuYv4gO1d1NFZZq8dVwUhPYCU+WVszSvGioL1DrTg2nHdnuRNy7OTFhTlYBGgQibOyvYHuSVmc2jFjWWd6FQMZpHBduLbB29yZyiSg6N7oaqL7ZhMVNEEd9V5FCclpv8X9uZ0KlV4+rSsAmbuzcxfASxeV2sd9GlnkMtLHbyI4FENZmoFJQY1D0N4GvFjGRnzYp1LvWh2J+MhWOOIs9IRQNlHDrnTPuW5U1Kh05lQYlNxh45GKEwOHmmoso2+TOA9IRQiztHQpeeSaylTo7y3gnO5lCsd1OTZyc8iwbYTgfl7K0nu9DR5dU1hHo5tKx0cxfJT99lvrskOaCbWWGxB5WAsoUBIueCXFXXCCh70H9WkOzZEmVR49AzaRJMER/o5Kd+BxPr8kIOGYeeHWxV3bN9aPUvKA4gZqTiAzs2fYf9B1vro/sceTxqISIDVyWH4nKVM7gUHclgumBLQL2TXlAdZYKSPaGu7zk6WAazCSjrjHGx1BFhsjqjiUJNdeiRXeq5M1Xn7OQILvU7okuZM6vrW/uD2+jHDnseQtnobdeGfsnvNaJFqJnfh9ptCzb94Gonsu5kMB/+oW9lV4EwmEdxKfaZFqam7k0eP3tOZftvWSyqf5mkMFPuFKlfp6R56Vn1HqDafhObum3uVQG4psnj5xLYPUC1w0Ft3ra5V99qT1nrqWJPRL18S1JAGZjVw8OpQBkwL0BtCaoH0zbzSU1dVQs0ghMNobYAlQUgG8lZv1mtqcu7M9+xv60FNoKJ7my6rW7pQ7WgLI+a+5JQMZJnYDbdVrcC1cLaHLdFlv+dFHt8EwWgLjBF+gAVKAQWyCuc/b4HXLxm1pVdpyV7AVUhVAY5W+AIMjuHN8uOIKNo3jx71hMoAmNvSrR/F4krknG2fmavavOiuNfEu0xF9nr33VP+O0rfjyTyt5L6li98oSDOCYj4fS3rSqwrGVR8TRt74NhtXneOwIDjUVxAlX07o1c+1q3gO+/w8UXp9ZfdNFekxdtSnPJjMLPTgRlnsscXUdfTTXOPCdkMFcLFZStsDf4gfMzLgGLfvQhI1VKD7NLUn7dKLdvkERwme9ysWvpWkDmvtM3kDccYwEVAqtactGCRPHsn5UV7b5/FtIVZIBG/HFGTz35/iWgr//hLly5dujSjfgAkLLspqkqQ5AAAAABJRU5ErkJggg=="/>
  </defs>

  <g>
    <rect class="cls-214" width="1361.78" height="149.29"/>
    <rect class="cls-124" x="466.55" width="428.68" height="149.29"/>
  </g>
  <g>
    <text class="cls-60" transform="translate(582.03 76.4)"><tspan class="cls-146" x="0" y="0">V</tspan><tspan class="cls-100" x="31.22" y="0">A</tspan><tspan class="cls-37" x="65.67" y="0">L</tspan><tspan x="94.08" y="0">U</tspan><tspan class="cls-17" x="129.39" y="0">E</tspan><tspan class="cls-248" x="161.48" y="0">S</tspan></text>
    <g>
      <g>
        <circle class="cls-49" cx="678.67" cy="145.29" r="42.7"/>
        <g class="cls-112">
          <path class="cls-76" d="M670.01,149.36h17.45c-2.9,7.65-5.76,15.2-8.72,23.01-2.96-7.79-5.83-15.36-8.73-23.01Z"/>
          <path class="cls-76" d="M676.06,135.26c-.85,1.14-1.63,2.2-2.41,3.25-1.89,2.52-3.78,5.05-5.69,7.56-.21.28-.58.62-.88.62-3.65.04-7.3.03-11.12.03.24-.36.37-.6.53-.81,2.56-3.37,5.1-6.75,7.69-10.09.25-.32.73-.64,1.11-.64,3.41-.05,6.82-.03,10.23-.02.13,0,.26.05.55.11Z"/>
          <path class="cls-76" d="M681.44,135.16c1.53,0,2.92,0,4.31,0,2.08,0,4.17-.03,6.25.02.4,0,.95.2,1.18.5,2.72,3.52,5.39,7.08,8.07,10.62.06.08.08.18.17.43-1.24,0-2.41,0-3.58,0-2.37,0-4.74.02-7.11-.02-.37,0-.87-.19-1.08-.46-2.65-3.48-5.26-6.99-7.88-10.5-.1-.13-.16-.29-.33-.59Z"/>
          <path class="cls-76" d="M674.61,169.56c-6.08-6.68-12.15-13.35-18.35-20.15.39-.05.61-.1.84-.1,3.09,0,6.18,0,9.27-.01.55,0,.9.07,1.13.69,2.36,6.31,4.76,12.59,7.15,18.89.07.18.08.39.12.59-.05.03-.1.06-.16.09Z"/>
          <path class="cls-76" d="M682.56,169.61c1.22-3.24,2.44-6.48,3.67-9.72,1.22-3.22,2.45-6.42,3.64-9.65.24-.65.52-.96,1.29-.95,3.26.05,6.52.02,10.1.02-6.29,6.93-12.4,13.65-18.51,20.37-.07-.02-.13-.05-.2-.07Z"/>
          <path class="cls-76" d="M678.74,136.02c2.69,3.6,5.27,7.04,7.95,10.61h-15.88c2.65-3.54,5.25-7.02,7.93-10.61Z"/>
          <path class="cls-76" d="M680.24,124.52c0,1.51.02,3.01,0,4.52-.02,1.08-.63,1.73-1.51,1.72-.88-.01-1.5-.69-1.51-1.75-.02-3.01-.02-6.03,0-9.04,0-1.14.64-1.79,1.59-1.75.9.03,1.41.65,1.43,1.78.02,1.51,0,3.01,0,4.52Z"/>
          <path class="cls-76" d="M668.2,129.71c-.3.29-.66.84-1.16,1.07-.7.33-1.43,0-1.7-.7-.97-2.49-1.89-5.01-2.74-7.54-.25-.76.22-1.43,1-1.66.87-.26,1.57.07,1.9.94.86,2.31,1.7,4.62,2.54,6.93.07.2.08.42.16.95Z"/>
          <path class="cls-76" d="M695,121.99c-.09.44-.1.59-.15.72-.87,2.42-1.72,4.84-2.64,7.24-.3.8-1.01,1.12-1.85.84-.84-.28-1.24-.97-.96-1.77.85-2.5,1.76-4.98,2.71-7.44.28-.72,1.04-.99,1.71-.69.51.23.86.79,1.17,1.1Z"/>
          <path class="cls-76" d="M657.35,136.37c-.32.44-.55,1.06-.94,1.2-.49.18-1.29.18-1.67-.12-1.56-1.2-3.03-2.52-4.49-3.84-.67-.61-.75-1.42-.13-2.11.61-.69,1.41-.73,2.12-.13,1.49,1.24,2.95,2.5,4.39,3.8.29.26.43.7.73,1.21Z"/>
          <path class="cls-76" d="M706.45,130.86c.36.3.94.55,1.09.96.17.46.14,1.27-.15,1.56-1.52,1.47-3.13,2.85-4.77,4.18-.63.51-1.42.35-1.94-.26-.56-.65-.56-1.46.07-2.04,1.5-1.38,3.07-2.7,4.64-4.01.23-.19.59-.23,1.06-.4Z"/>
        </g>
      </g>
      <text class="cls-106" transform="translate(550.16 219.25)"><tspan class="cls-77" x="0" y="0">T</tspan><tspan class="cls-42" x="11.11" y="0">h</tspan><tspan class="cls-148" x="22.45" y="0">e</tspan><tspan x="32.67" y="0"> </tspan><tspan class="cls-101" x="37.65" y="0">f</tspan><tspan class="cls-42" x="43.35" y="0">oll</tspan><tspan class="cls-3" x="64.11" y="0">o</tspan><tspan class="cls-77" x="75.04" y="0">w</tspan><tspan class="cls-42" x="90.26" y="0">in</tspan><tspan x="106.48" y="0">g </tspan><tspan class="cls-64" x="122.62" y="0">p</tspan><tspan class="cls-198" x="134.05" y="0">r</tspan><tspan class="cls-42" x="141.04" y="0">in</tspan><tspan class="cls-249" x="157.25" y="0">c</tspan><tspan class="cls-42" x="167.57" y="0">ipl</tspan><tspan class="cls-249" x="188.73" y="0">e</tspan><tspan x="199.38" y="0">s </tspan><tspan class="cls-42" x="213.68" y="0">d</tspan><tspan class="cls-142" x="225.12" y="0">r</tspan><tspan class="cls-66" x="232.11" y="0">i</tspan><tspan class="cls-94" x="237.06" y="0">v</tspan><tspan class="cls-120" x="246.71" y="0">e</tspan><tspan x="256.93" y="0"> </tspan><tspan class="cls-42" x="10.93" y="23.63">ou</tspan><tspan x="33.13" y="23.63">r </tspan><tspan class="cls-90" x="45.04" y="23.63">c</tspan><tspan class="cls-42" x="55.31" y="23.63">omm</tspan><tspan class="cls-90" x="100.05" y="23.63">i</tspan><tspan class="cls-206" x="105.02" y="23.63">t</tspan><tspan class="cls-42" x="111.34" y="23.63">m</tspan><tspan class="cls-208" x="128.2" y="23.63">e</tspan><tspan class="cls-84" x="138.71" y="23.63">n</tspan><tspan x="149.94" y="23.63">t </tspan><tspan class="cls-198" x="161.2" y="23.63">t</tspan><tspan x="167.55" y="23.63">o </tspan><tspan class="cls-42" x="183.36" y="23.63">qual</tspan><tspan class="cls-159" x="221.43" y="23.63">i</tspan><tspan class="cls-169" x="226.39" y="23.63">t</tspan><tspan class="cls-173" x="233.35" y="23.63">y</tspan><tspan x="241.96" y="23.63">, </tspan><tspan class="cls-206" x="3.07" y="47.26">r</tspan><tspan class="cls-249" x="10.04" y="47.26">e</tspan><tspan class="cls-3" x="20.7" y="47.26">s</tspan><tspan class="cls-231" x="30.11" y="47.26">p</tspan><tspan class="cls-64" x="41.66" y="47.26">o</tspan><tspan class="cls-211" x="52.69" y="47.26">n</tspan><tspan class="cls-42" x="63.93" y="47.26">si</tspan><tspan class="cls-119" x="78.31" y="47.26">b</tspan><tspan class="cls-42" x="89.81" y="47.26">il</tspan><tspan class="cls-90" x="99.55" y="47.26">i</tspan><tspan class="cls-45" x="104.51" y="47.26">t</tspan><tspan class="cls-227" x="111.46" y="47.26">y</tspan><tspan x="120.07" y="47.26">, </tspan><tspan class="cls-64" x="129.17" y="47.26">an</tspan><tspan x="151.13" y="47.26">d </tspan><tspan class="cls-42" x="167.35" y="47.26">long</tspan><tspan class="cls-84" x="205.96" y="47.26">-</tspan><tspan class="cls-198" x="213.48" y="47.26">t</tspan><tspan class="cls-189" x="219.83" y="47.26">e</tspan><tspan class="cls-72" x="230.34" y="47.26">rm </tspan><tspan class="cls-244" x="79.49" y="70.89">e</tspan><tspan class="cls-149" x="90.07" y="70.89">x</tspan><tspan class="cls-90" x="99.01" y="70.89">c</tspan><tspan class="cls-119" x="109.27" y="70.89">e</tspan><tspan class="cls-64" x="119.83" y="70.89">ll</tspan><tspan class="cls-99" x="129.56" y="70.89">e</tspan><tspan class="cls-42" x="140.08" y="70.89">n</tspan><tspan class="cls-159" x="151.42" y="70.89">c</tspan><tspan class="cls-213" x="161.68" y="70.89">e</tspan><tspan x="172.59" y="70.89">:</tspan></text>
    </g>
  </g>

  <g>
    <g>
      <text class="cls-61" transform="translate(997.51 76.4)"><tspan x="0" y="0">M</tspan><tspan class="cls-179" x="43.38" y="0">I</tspan><tspan class="cls-19" x="59.75" y="0">S</tspan><tspan class="cls-151" x="92.42" y="0">S</tspan><tspan class="cls-81" x="124.18" y="0">I</tspan><tspan x="140.68" y="0">ON</tspan></text>
      <text class="cls-106" transform="translate(984.28 219.25)"><tspan class="cls-111" x="0" y="0">T</tspan><tspan x="9.02" y="0">o </tspan><tspan class="cls-26" x="24.83" y="0">c</tspan><tspan x="34.89" y="0">o</tspan><tspan class="cls-172" x="45.72" y="0">n</tspan><tspan class="cls-120" x="56.77" y="0">s</tspan><tspan class="cls-241" x="66" y="0">t</tspan><tspan x="72.25" y="0">a</tspan><tspan class="cls-223" x="82.66" y="0">n</tspan><tspan class="cls-120" x="93.69" y="0">t</tspan><tspan class="cls-235" x="99.89" y="0">l</tspan><tspan x="104.72" y="0">y d</tspan><tspan class="cls-127" x="130.42" y="0">e</tspan><tspan x="140.77" y="0">l</tspan><tspan class="cls-86" x="145.44" y="0">i</tspan><tspan class="cls-135" x="150.19" y="0">v</tspan><tspan class="cls-226" x="159.64" y="0">e</tspan><tspan x="169.96" y="0">r </tspan><tspan class="cls-86" x="181.87" y="0">e</tspan><tspan class="cls-212" x="192.25" y="0">x</tspan><tspan class="cls-16" x="200.99" y="0">c</tspan><tspan class="cls-127" x="211.05" y="0">e</tspan><tspan x="221.41" y="0">l</tspan><tspan class="cls-226" x="226.08" y="0">e</tspan><tspan class="cls-223" x="236.39" y="0">n</tspan><tspan x="247.42" y="0">t </tspan><tspan class="cls-221" x="-38.69" y="23.63">v</tspan><tspan class="cls-42" x="-29.2" y="23.63">al</tspan><tspan class="cls-189" x="-13.72" y="23.63">u</tspan><tspan class="cls-1" x="-2.53" y="23.63">e</tspan><tspan class="cls-42" x="8.36" y="23.63">-</tspan><tspan class="cls-164" x="16" y="23.63">b</tspan><tspan class="cls-198" x="27.43" y="23.63">a</tspan><tspan class="cls-189" x="37.91" y="23.63">s</tspan><tspan class="cls-181" x="47.44" y="23.63">e</tspan><tspan class="cls-164" x="58.06" y="23.63">d</tspan><tspan x="69.48" y="23.63">, </tspan><tspan class="cls-42" x="78.58" y="23.63">inn</tspan><tspan class="cls-189" x="106.13" y="23.63">o</tspan><tspan class="cls-221" x="117.18" y="23.63">v</tspan><tspan class="cls-198" x="126.67" y="23.63">a</tspan><tspan class="cls-94" x="137.15" y="23.63">t</tspan><tspan class="cls-66" x="143.56" y="23.63">i</tspan><tspan class="cls-94" x="148.5" y="23.63">v</tspan><tspan class="cls-120" x="158.15" y="23.63">e</tspan><tspan x="168.37" y="23.63"> </tspan><tspan class="cls-189" x="173.35" y="23.63">s</tspan><tspan class="cls-42" x="182.88" y="23.63">ol</tspan><tspan class="cls-216" x="198.78" y="23.63">u</tspan><tspan class="cls-101" x="210.16" y="23.63">t</tspan><tspan class="cls-42" x="216.57" y="23.63">io</tspan><tspan class="cls-152" x="232.46" y="23.63">n</tspan><tspan class="cls-247" x="243.71" y="23.63">s </tspan><tspan class="cls-94" x="258" y="23.63">t</tspan><tspan class="cls-84" x="264.41" y="23.63">h</tspan><tspan class="cls-198" x="275.63" y="23.63">a</tspan><tspan class="cls-68" x="286.11" y="23.63">t</tspan><tspan x="292.79" y="23.63"> </tspan><tspan class="cls-42" x="-37.63" y="47.26">a</tspan><tspan class="cls-206" x="-27.01" y="47.26">r</tspan><tspan class="cls-120" x="-20.04" y="47.26">e</tspan><tspan x="-9.82" y="47.26" xml:space="preserve"> s</tspan><tspan class="cls-42" x="4.48" y="47.26">u</tspan><tspan class="cls-103" x="15.65" y="47.26">r</tspan><tspan class="cls-135" x="22.62" y="47.26">e</tspan><tspan x="32.84" y="47.26"> </tspan><tspan class="cls-198" x="37.82" y="47.26">t</tspan><tspan x="44.16" y="47.26">o </tspan><tspan class="cls-8" x="59.97" y="47.26">e</tspan><tspan class="cls-42" x="70.53" y="47.26">l</tspan><tspan class="cls-216" x="75.4" y="47.26">e</tspan><tspan class="cls-147" x="86.11" y="47.26">v</tspan><tspan class="cls-198" x="95.61" y="47.26">at</tspan><tspan class="cls-120" x="112.43" y="47.26">e</tspan><tspan x="122.65" y="47.26"> </tspan><tspan class="cls-94" x="127.63" y="47.26">t</tspan><tspan class="cls-42" x="134.03" y="47.26">h</tspan><tspan class="cls-120" x="145.38" y="47.26">e</tspan><tspan x="155.6" y="47.26"> </tspan><tspan class="cls-231" x="160.58" y="47.26">b</tspan><tspan class="cls-189" x="172.14" y="47.26">e</tspan><tspan class="cls-42" x="182.66" y="47.26">n</tspan><tspan class="cls-164" x="194" y="47.26">c</tspan><tspan class="cls-42" x="204.14" y="47.26">h</tspan><tspan class="cls-84" x="215.49" y="47.26">m</tspan><tspan class="cls-42" x="232.23" y="47.26">a</tspan><tspan class="cls-164" x="242.85" y="47.26">r</tspan><tspan class="cls-185" x="249.96" y="47.26">k</tspan><tspan x="260.34" y="47.26">s </tspan><tspan class="cls-159" x="274.63" y="47.26">o</tspan><tspan class="cls-35" x="285.76" y="47.26">f</tspan><tspan x="291.12" y="47.26"> </tspan><tspan class="cls-42" x="-40.23" y="70.89">qual</tspan><tspan class="cls-159" x="-2.16" y="70.89">i</tspan><tspan class="cls-169" x="2.81" y="70.89">t</tspan><tspan x="9.76" y="70.89">y </tspan><tspan class="cls-42" x="24.21" y="70.89">i</tspan><tspan x="29.08" y="70.89">n </tspan><tspan class="cls-159" x="45.2" y="70.89">c</tspan><tspan class="cls-42" x="55.47" y="70.89">o</tspan><tspan class="cls-152" x="66.5" y="70.89">n</tspan><tspan class="cls-94" x="77.74" y="70.89">s</tspan><tspan class="cls-103" x="87.18" y="70.89">t</tspan><tspan class="cls-142" x="93.5" y="70.89">r</tspan><tspan class="cls-189" x="100.49" y="70.89">u</tspan><tspan class="cls-204" x="111.68" y="70.89">c</tspan><tspan class="cls-101" x="122.04" y="70.89">t</tspan><tspan class="cls-42" x="128.44" y="70.89">io</tspan><tspan x="144.34" y="70.89">n </tspan><tspan class="cls-42" x="160.46" y="70.89">an</tspan><tspan x="182.42" y="70.89">d </tspan><tspan class="cls-140" x="198.65" y="70.89">e</tspan><tspan class="cls-149" x="209.23" y="70.89">x</tspan><tspan class="cls-157" x="218.17" y="70.89">c</tspan><tspan class="cls-231" x="228.43" y="70.89">ee</tspan><tspan x="249.66" y="70.89">d </tspan><tspan class="cls-94" x="265.89" y="70.89">t</tspan><tspan class="cls-42" x="272.29" y="70.89">h</tspan><tspan class="cls-120" x="283.63" y="70.89">e</tspan><tspan x="293.85" y="70.89"> </tspan><tspan class="cls-140" x="-10.04" y="94.52">e</tspan><tspan class="cls-42" x=".54" y="94.52">x</tspan><tspan class="cls-231" x="9.66" y="94.52">pe</tspan><tspan class="cls-18" x="31.81" y="94.52">c</tspan><tspan class="cls-78" x="42.17" y="94.52">t</tspan><tspan class="cls-198" x="48.61" y="94.52">a</tspan><tspan class="cls-101" x="59.09" y="94.52">t</tspan><tspan class="cls-42" x="65.49" y="94.52">io</tspan><tspan class="cls-152" x="81.39" y="94.52">n</tspan><tspan x="92.64" y="94.52">s </tspan><tspan class="cls-157" x="106.93" y="94.52">o</tspan><tspan class="cls-178" x="118.06" y="94.52">f</tspan><tspan x="123.42" y="94.52"> </tspan><tspan class="cls-42" x="128.4" y="94.52">ou</tspan><tspan x="150.59" y="94.52" xml:space="preserve">r  </tspan><tspan class="cls-211" x="167.49" y="94.52">c</tspan><tspan class="cls-198" x="177.55" y="94.52">u</tspan><tspan class="cls-101" x="188.58" y="94.52">s</tspan><tspan class="cls-142" x="198.02" y="94.52">t</tspan><tspan class="cls-42" x="204.36" y="94.52">om</tspan><tspan class="cls-189" x="232.25" y="94.52">e</tspan><tspan class="cls-8" x="242.76" y="94.52">r</tspan><tspan class="cls-176" x="249.95" y="94.52">s</tspan><tspan x="259.74" y="94.52">.</tspan></text>
      <g>
        <circle class="cls-49" cx="1104.58" cy="143.79" r="42.7"/>
        <g class="cls-29">
          <path class="cls-76" d="M1118.35,135.85c.42-.1.68-.22.95-.22,1.67-.02,3.34-.06,5.01.03.37.02.88.48,1.03.86,2.96,7.23,2.8,14.41-.69,21.4-4.85,9.71-15.56,15.38-25.96,13.89-11.39-1.63-19.95-9.73-22.03-20.85-2.69-14.36,7.84-28.39,22.35-29.85,4.42-.44,8.64.18,12.75,1.83.67.27.99.59.95,1.37-.08,1.48-.01,2.97-.03,4.45,0,.35-.09.69-.16,1.23-5.92-3.43-11.94-4.11-18.17-1.6-4.17,1.68-7.37,4.53-9.58,8.44-4.47,7.9-2.96,17.75,3.65,23.94,6.55,6.13,16.42,7.03,23.97,2.19,2.94-1.88,5.21-4.38,6.83-7.47,1.61-3.09,2.31-6.38,2.18-9.87-.13-3.48-1.22-6.66-3.05-9.77Z"/>
          <path class="cls-76" d="M1107.71,134.58c-1.48,1.46-2.87,2.85-4.3,4.19-.22.21-.66.3-.98.28-4.27-.27-7.9,2.95-8.02,7.16-.12,4.31,3.31,7.76,7.62,7.67,4.27-.09,7.49-3.7,7.23-8.06-.02-.3.05-.69.24-.89,1.37-1.45,2.79-2.86,4.2-4.29,3.03,4.13,1.53,11.82-2.99,15.83-5.12,4.55-12.92,4.47-17.95-.19-5.1-4.72-5.77-12.41-1.55-17.95,4.58-6,12.29-6.21,16.5-3.77Z"/>
          <path class="cls-76" d="M1124.06,115.71v8.56h8.86c-.27.46-.37.73-.55.91-2.54,2.55-5.07,5.1-7.65,7.61-.3.29-.83.47-1.27.49-1.56.06-3.12-.04-4.67.06-.59.04-1.3.32-1.72.73-4.36,4.29-8.68,8.63-13.01,12.95-.31.31-.62.65-.96.92-.83.67-1.92.62-2.63-.07-.74-.72-.79-1.86-.08-2.72.26-.31.56-.59.85-.88,4.33-4.32,8.65-8.66,13-12.95.58-.57.88-1.14.79-1.95-.04-.37.05-.75-.01-1.11-.57-3.08.63-5.34,3.01-7.27,1.75-1.42,3.23-3.16,4.84-4.75.27-.26.58-.48.87-.71.11.06.21.12.32.19Z"/>
        </g>
      </g>
    </g>
    <g>
      <text class="cls-61" transform="translate(172.96 76.4)"><tspan class="cls-151" x="0" y="0">V</tspan><tspan class="cls-179" x="33.78" y="0">I</tspan><tspan class="cls-151" x="50.16" y="0">S</tspan><tspan class="cls-233" x="81.92" y="0">I</tspan><tspan x="98.42" y="0">ON</tspan></text>
      <text class="cls-106" transform="translate(87.21 219.25)"><tspan class="cls-116" x="0" y="0">T</tspan><tspan x="9.17" y="0">o </tspan><tspan class="cls-69" x="24.98" y="0">be</tspan><tspan class="cls-43" x="47.06" y="0">c</tspan><tspan class="cls-62" x="57.27" y="0">om</tspan><tspan class="cls-148" x="85.06" y="0">e</tspan><tspan x="95.28" y="0"> </tspan><tspan class="cls-36" x="100.26" y="0">t</tspan><tspan class="cls-62" x="106.61" y="0">h</tspan><tspan class="cls-148" x="117.91" y="0">e</tspan><tspan x="128.12" y="0"> </tspan><tspan class="cls-62" x="133.11" y="0">m</tspan><tspan class="cls-28" x="149.92" y="0">o</tspan><tspan class="cls-123" x="161.05" y="0">s</tspan><tspan x="170.44" y="0">t </tspan><tspan class="cls-62" x="181.7" y="0">p</tspan><tspan class="cls-205" x="193.07" y="0">r</tspan><tspan class="cls-44" x="200" y="0">e</tspan><tspan class="cls-123" x="210.68" y="0">f</tspan><tspan class="cls-9" x="216.32" y="0">e</tspan><tspan class="cls-87" x="226.79" y="0">r</tspan><tspan class="cls-74" x="233.67" y="0">r</tspan><tspan class="cls-210" x="240.6" y="0">e</tspan><tspan x="251.16" y="0">d </tspan><tspan class="cls-229" x="267.39" y="0">c</tspan><tspan class="cls-62" x="277.48" y="0">h</tspan><tspan class="cls-32" x="288.78" y="0">o</tspan><tspan class="cls-62" x="299.82" y="0">i</tspan><tspan class="cls-43" x="304.63" y="0">c</tspan><tspan class="cls-148" x="314.84" y="0">e</tspan><tspan x="325.06" y="0"> </tspan><tspan class="cls-43" x="9.33" y="23.63">o</tspan><tspan class="cls-25" x="20.41" y="23.63">f</tspan><tspan x="25.76" y="23.63"> </tspan><tspan class="cls-205" x="30.75" y="23.63">r</tspan><tspan class="cls-62" x="37.67" y="23.63">ea</tspan><tspan x="58.68" y="23.63">l </tspan><tspan class="cls-28" x="68.33" y="23.63">e</tspan><tspan class="cls-123" x="78.94" y="23.63">s</tspan><tspan class="cls-175" x="88.32" y="23.63">t</tspan><tspan class="cls-31" x="94.71" y="23.63">at</tspan><tspan class="cls-148" x="111.44" y="23.63">e</tspan><tspan x="121.65" y="23.63"> </tspan><tspan class="cls-62" x="126.64" y="23.63">d</tspan><tspan class="cls-160" x="138.03" y="23.63">e</tspan><tspan class="cls-156" x="148.69" y="23.63">v</tspan><tspan class="cls-32" x="158.29" y="23.63">e</tspan><tspan class="cls-62" x="168.8" y="23.63">lo</tspan><tspan class="cls-115" x="184.6" y="23.63">p</tspan><tspan class="cls-9" x="196.09" y="23.63">e</tspan><tspan class="cls-22" x="206.56" y="23.63">r</tspan><tspan class="cls-12" x="213.7" y="23.63">s</tspan><tspan x="223.4" y="23.63">, </tspan><tspan class="cls-123" x="232.49" y="23.63">s</tspan><tspan class="cls-74" x="241.88" y="23.63">t</tspan><tspan class="cls-174" x="248.15" y="23.63">r</tspan><tspan class="cls-9" x="255.09" y="23.63">u</tspan><tspan class="cls-215" x="266.23" y="23.63">c</tspan><tspan class="cls-201" x="276.54" y="23.63">t</tspan><tspan class="cls-62" x="282.72" y="23.63">u</tspan><tspan class="cls-34" x="293.83" y="23.63">r</tspan><tspan class="cls-62" x="300.58" y="23.63">a</tspan><tspan x="311.15" y="23.63">l </tspan><tspan class="cls-43" x="-7.09" y="47.26">c</tspan><tspan class="cls-62" x="3.12" y="47.26">o</tspan><tspan class="cls-27" x="14.1" y="47.26">n</tspan><tspan class="cls-87" x="25.3" y="47.26">s</tspan><tspan class="cls-62" x="34.56" y="47.26">u</tspan><tspan class="cls-43" x="45.68" y="47.26">l</tspan><tspan class="cls-95" x="50.59" y="47.26">t</tspan><tspan class="cls-62" x="56.99" y="47.26">a</tspan><tspan class="cls-170" x="67.55" y="47.26">n</tspan><tspan class="cls-167" x="78.73" y="47.26">t</tspan><tspan x="85.34" y="47.26">s </tspan><tspan class="cls-62" x="99.63" y="47.26">an</tspan><tspan x="121.49" y="47.26">d </tspan><tspan class="cls-62" x="137.72" y="47.26">a</tspan><tspan class="cls-205" x="148.28" y="47.26">r</tspan><tspan class="cls-229" x="155.21" y="47.26">c</tspan><tspan class="cls-62" x="165.3" y="47.26">h</tspan><tspan class="cls-43" x="176.6" y="47.26">i</tspan><tspan class="cls-174" x="181.51" y="47.26">t</tspan><tspan class="cls-210" x="187.8" y="47.26">e</tspan><tspan class="cls-166" x="198.37" y="47.26">c</tspan><tspan class="cls-167" x="208.68" y="47.26">t</tspan><tspan class="cls-46" x="215.29" y="47.26">s </tspan><tspan class="cls-11" x="229.58" y="47.26">o</tspan><tspan class="cls-25" x="240.66" y="47.26">f</tspan><tspan x="246.02" y="47.26"> </tspan><tspan class="cls-194" x="251" y="47.26">I</tspan><tspan class="cls-62" x="256.35" y="47.26">nd</tspan><tspan class="cls-170" x="279.04" y="47.26">i</tspan><tspan x="283.73" y="47.26">a </tspan><tspan class="cls-62" x="299.13" y="47.26">an</tspan><tspan x="320.99" y="47.26">d </tspan><tspan class="cls-174" x="33.55" y="70.89">a</tspan><tspan class="cls-121" x="43.98" y="70.89">s</tspan><tspan class="cls-62" x="53.6" y="70.89">s</tspan><tspan class="cls-190" x="63.06" y="70.89">i</tspan><tspan class="cls-123" x="67.78" y="70.89">s</tspan><tspan x="77.17" y="70.89">t </tspan><tspan class="cls-123" x="88.43" y="70.89">t</tspan><tspan class="cls-24" x="94.78" y="70.89">h</tspan><tspan class="cls-9" x="106.08" y="70.89">e</tspan><tspan x="116.54" y="70.89">m </tspan><tspan class="cls-62" x="138.19" y="70.89">i</tspan><tspan x="143" y="70.89">n </tspan><tspan class="cls-62" x="159.13" y="70.89">c</tspan><tspan class="cls-74" x="169.24" y="70.89">r</tspan><tspan class="cls-24" x="176.17" y="70.89">e</tspan><tspan class="cls-174" x="186.61" y="70.89">a</tspan><tspan class="cls-156" x="197.04" y="70.89">t</tspan><tspan class="cls-62" x="203.39" y="70.89">in</tspan><tspan class="cls-191" x="219.5" y="70.89">g</tspan><tspan class="cls-82" x="233.03" y="70.89"> </tspan><tspan class="cls-205" x="235.65" y="70.89">r</tspan><tspan class="cls-62" x="242.57" y="70.89">ob</tspan><tspan class="cls-174" x="264.95" y="70.89">u</tspan><tspan class="cls-123" x="275.93" y="70.89">s</tspan><tspan x="285.31" y="70.89">t</tspan><tspan x="12.84" y="94.52">in</tspan><tspan class="cls-200" x="28.65" y="94.52">f</tspan><tspan class="cls-33" x="34.21" y="94.52">r</tspan><tspan class="cls-162" x="40.8" y="94.52">a</tspan><tspan class="cls-148" x="51.08" y="94.52">s</tspan><tspan class="cls-71" x="60.32" y="94.52">t</tspan><tspan class="cls-162" x="66.44" y="94.52">r</tspan><tspan class="cls-226" x="73.23" y="94.52">u</tspan><tspan class="cls-186" x="84.22" y="94.52">c</tspan><tspan class="cls-104" x="94.38" y="94.52">t</tspan><tspan x="100.41" y="94.52">u</tspan><tspan class="cls-71" x="111.37" y="94.52">r</tspan><tspan class="cls-148" x="118.15" y="94.52">e</tspan><tspan class="cls-23" x="128.37" y="94.52"> </tspan><tspan class="cls-148" x="131.77" y="94.52">f</tspan><tspan x="137.27" y="94.52">or our m</tspan><tspan class="cls-199" x="210.38" y="94.52">o</tspan><tspan x="221.33" y="94.52">d</tspan><tspan class="cls-226" x="232.57" y="94.52">e</tspan><tspan class="cls-161" x="242.89" y="94.52">r</tspan><tspan x="249.62" y="94.52">n </tspan><tspan class="cls-35" x="265.75" y="94.52">I</tspan><tspan x="270.95" y="94.52">nd</tspan><tspan class="cls-223" x="293.34" y="94.52">i</tspan><tspan x="297.89" y="94.52">a.</tspan></text>
      <g>
        <circle class="cls-49" cx="258.77" cy="145.29" r="42.7"/>
        <g class="cls-195">
          <path class="cls-76" d="M257.79,129.14c10.73.23,18.46,4.51,24.67,11.82.78.92,1.5,1.89,2.19,2.86.66.92.7,1.92.04,2.85-5.47,7.73-12.52,13.12-22.15,14.41-9.65,1.29-17.91-1.84-24.86-8.5-1.81-1.73-3.33-3.76-4.91-5.71-.83-1.03-.81-2.07-.05-3.12,4.93-6.91,11.19-11.95,19.64-13.84,2.09-.47,4.25-.61,5.42-.78ZM237.26,145.35c1.19,1.31,2.26,2.6,3.46,3.76,5.08,4.94,11.09,7.75,18.26,7.63,8.7-.15,15.32-4.33,20.59-10.96.17-.22.14-.86-.06-1.07-1.33-1.49-2.63-3.05-4.13-4.36-5.85-5.12-12.64-7.41-20.42-6.24-7.46,1.13-13.04,5.29-17.71,11.23Z"/>
          <path class="cls-76" d="M239.01,159.2c-.34.56-.52,1.07-.87,1.37-1.37,1.19-2.78,2.34-4.2,3.47-.79.63-1.68.57-2.25-.07-.57-.64-.45-1.65.32-2.31,1.39-1.17,2.76-2.37,4.23-3.43.41-.3,1.18-.35,1.69-.2.41.12.69.72,1.09,1.17Z"/>
          <path class="cls-76" d="M237.41,132.93c-.53-.24-.9-.34-1.17-.55-1.45-1.15-2.89-2.32-4.3-3.52-.71-.6-.82-1.64-.25-2.23.64-.67,1.42-.76,2.15-.18,1.48,1.17,2.98,2.34,4.35,3.63.38.35.56,1.2.43,1.72-.12.46-.79.78-1.2,1.14Z"/>
          <path class="cls-76" d="M286.22,127.53c-.35.55-.53,1.05-.88,1.36-1.34,1.17-2.73,2.29-4.12,3.4-.84.67-1.76.62-2.33-.07-.58-.7-.46-1.59.37-2.3,1.36-1.15,2.71-2.33,4.15-3.36.44-.32,1.23-.38,1.78-.24.39.1.65.74,1.03,1.21Z"/>
          <path class="cls-76" d="M279.92,157.61c.57.29.99.43,1.32.69,1.37,1.09,2.71,2.19,4.05,3.32.8.67.95,1.63.41,2.3-.56.69-1.51.76-2.33.11-1.42-1.14-2.86-2.25-4.18-3.49-.38-.36-.6-1.19-.48-1.71.1-.46.77-.8,1.21-1.22Z"/>
          <path class="cls-76" d="M247.5,163.03c1.26.03,2.04.96,1.72,1.89-.64,1.89-1.36,3.76-2.14,5.59-.32.75-1.06,1.01-1.85.72-.78-.29-1.22-.94-.95-1.73.65-1.92,1.38-3.82,2.19-5.69.18-.41.8-.63,1.02-.79Z"/>
          <path class="cls-76" d="M249.53,126.15c-.48.47-.88,1.17-1.36,1.24-.54.08-1.5-.27-1.7-.7-.85-1.8-1.51-3.69-2.17-5.57-.26-.73.05-1.49.8-1.68.54-.13,1.56,0,1.72.32.98,2.01,1.77,4.11,2.71,6.39Z"/>
          <path class="cls-76" d="M269.88,127.53c-1.26.03-2.1-.96-1.77-1.92.64-1.85,1.35-3.68,2.11-5.49.34-.82,1.1-1.08,1.92-.78.79.29,1.18.98.91,1.75-.66,1.92-1.39,3.82-2.19,5.68-.17.39-.75.59-.97.75Z"/>
          <path class="cls-76" d="M273.35,169.95c-.47.47-.85,1.07-1.39,1.31-.7.31-1.42-.05-1.72-.76-.77-1.84-1.49-3.71-2.14-5.59-.25-.73.12-1.48.85-1.66.54-.13,1.55.02,1.72.35.96,1.98,1.74,4.05,2.68,6.35Z"/>
          <path class="cls-76" d="M260.19,121.62c0,.91.02,1.82,0,2.73-.03.89-.51,1.44-1.41,1.5-.97.06-1.59-.49-1.62-1.39-.08-1.92-.07-3.85,0-5.78.04-.91.66-1.46,1.62-1.4.9.06,1.38.62,1.41,1.5.03.94,0,1.89,0,2.84Z"/>
          <path class="cls-76" d="M257.11,168.95c0-.87-.04-1.75,0-2.62.05-1.02.67-1.62,1.55-1.62.9,0,1.49.6,1.51,1.64.03,1.78.03,3.56,0,5.35-.02,1.02-.64,1.63-1.53,1.62-.87,0-1.49-.63-1.54-1.64-.04-.91,0-1.82,0-2.73h0Z"/>
          <path class="cls-76" d="M267.61,145.28c0,4.94-3.95,8.84-8.94,8.85-4.95.02-8.94-3.93-8.94-8.86,0-4.91,3.99-8.87,8.94-8.87,4.95,0,8.94,3.97,8.94,8.87ZM255.76,139.57c-1.58.02-2.85,1.3-2.84,2.86,0,1.55,1.31,2.85,2.87,2.86,1.62.01,2.91-1.31,2.87-2.94-.04-1.61-1.28-2.8-2.9-2.78Z"/>
        </g>
      </g>
    </g>
  </g>
  <g>
    <g>
      <path class="cls-5" d="M329.54,597.22c0-18.47,14.99-33.44,33.48-33.44h133.91c18.49,0,33.48,14.97,33.48,33.44v211.47c0,18.47-14.99,33.44-33.48,33.44h-133.91c-18.49,0-33.48-14.97-33.48-33.44v-211.47Z"/>
      <image class="cls-236" width="173" height="240" transform="translate(329.54 563.78) scale(1.16)" xlink:href="data:image/png;base64,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"/>
      <g>
        <g>
          <text class="cls-58" transform="translate(365.06 691.68)"><tspan x="0" y="0">INN</tspan><tspan class="cls-150" x="37.62" y="0">O</tspan><tspan class="cls-230" x="52.92" y="0">V</tspan><tspan class="cls-192" x="65.66" y="0">A</tspan><tspan class="cls-63" x="78.54" y="0">T</tspan><tspan x="90.9" y="0">ION</tspan></text>
          <text class="cls-108" transform="translate(368.98 713.85)"><tspan class="cls-79" x="0" y="0">W</tspan><tspan x="12.38" y="0">e </tspan><tspan class="cls-47" x="23.07" y="0">c</tspan><tspan class="cls-129" x="29.94" y="0">o</tspan><tspan class="cls-38" x="37.36" y="0">ns</tspan><tspan x="51.2" y="0">ta</tspan><tspan class="cls-202" x="62.38" y="0">nt</tspan><tspan class="cls-70" x="74.05" y="0">l</tspan><tspan x="77.19" y="0">y </tspan><tspan class="cls-75" x="87.23" y="0">s</tspan><tspan class="cls-132" x="93.42" y="0">t</tspan><tspan class="cls-4" x="97.35" y="0">r</tspan><tspan class="cls-47" x="101.78" y="0">i</tspan><tspan x="104.85" y="0">ve </tspan><tspan class="cls-15" x="-4.84" y="16.84">t</tspan><tspan x="-.87" y="16.84">o </tspan><tspan class="cls-183" x="10.2" y="16.84">b</tspan><tspan x="18.01" y="16.84">e mo</tspan><tspan class="cls-4" x="47.76" y="16.84">r</tspan><tspan x="52.2" y="16.84">e c</tspan><tspan class="cls-4" x="69.68" y="16.84">r</tspan><tspan x="74.12" y="16.84">e</tspan><tspan class="cls-243" x="81.16" y="16.84">a</tspan><tspan class="cls-232" x="88.22" y="16.84">t</tspan><tspan class="cls-134" x="92.28" y="16.84">i</tspan><tspan x="95.35" y="16.84">ve in </tspan><tspan x="-31.24" y="33.68">our </tspan><tspan class="cls-38" x="-8.07" y="33.68">t</tspan><tspan x="-4.06" y="33.68">hin</tspan><tspan class="cls-203" x="14.33" y="33.68">k</tspan><tspan x="21.01" y="33.68">ing and mo</tspan><tspan class="cls-4" x="88.26" y="33.68">r</tspan><tspan class="cls-129" x="92.7" y="33.68">e </tspan><tspan class="cls-122" x="103.39" y="33.68">eff</tspan><tspan x="117.85" y="33.68">i</tspan><tspan class="cls-122" x="120.85" y="33.68">c</tspan><tspan x="127.83" y="33.68">ie</tspan><tspan class="cls-38" x="137.88" y="33.68">n</tspan><tspan x="145.53" y="33.68">t </tspan><tspan x="-11.54" y="50.53">in our </tspan><tspan class="cls-88" x="25.97" y="50.53">p</tspan><tspan x="33.79" y="50.53">e</tspan><tspan class="cls-128" x="40.83" y="50.53">r</tspan><tspan class="cls-129" x="45.76" y="50.53">fo</tspan><tspan class="cls-171" x="56.71" y="50.53">r</tspan><tspan class="cls-168" x="61.1" y="50.53">m</tspan><tspan x="72.65" y="50.53">an</tspan><tspan class="cls-47" x="87.47" y="50.53">c</tspan><tspan class="cls-129" x="94.33" y="50.53">e. </tspan><tspan class="cls-38" x="107.42" y="50.53">O</tspan><tspan x="117.79" y="50.53">ur </tspan><tspan x="-24.14" y="67.37">d</tspan><tspan class="cls-113" x="-16.42" y="67.37">e</tspan><tspan class="cls-15" x="-9.26" y="67.37">t</tspan><tspan x="-5.29" y="67.37">e</tspan><tspan class="cls-171" x="1.75" y="67.37">r</tspan><tspan class="cls-129" x="6.15" y="67.37">mi</tspan><tspan class="cls-168" x="20.79" y="67.37">n</tspan><tspan class="cls-145" x="28.39" y="67.37">a</tspan><tspan class="cls-232" x="35.45" y="67.37">tion </tspan><tspan class="cls-15" x="61.28" y="67.37">t</tspan><tspan x="65.25" y="67.37">o </tspan><tspan class="cls-183" x="76.32" y="67.37">b</tspan><tspan x="84.12" y="67.37">e </tspan><tspan class="cls-38" x="94.82" y="67.37">t</tspan><tspan x="98.83" y="67.37">he </tspan><tspan class="cls-183" x="117.22" y="67.37">b</tspan><tspan class="cls-93" x="125.02" y="67.37">e</tspan><tspan class="cls-38" x="132.24" y="67.37">s</tspan><tspan class="cls-232" x="138.43" y="67.37">t </tspan><tspan x="-23.44" y="84.21">in b</tspan><tspan class="cls-168" x="-1.38" y="84.21">u</tspan><tspan x="6.08" y="84.21">sin</tspan><tspan class="cls-93" x="23.01" y="84.21">es</tspan><tspan x="36.62" y="84.21">s </tspan><tspan class="cls-67" x="46.5" y="84.21">b</tspan><tspan x="54.35" y="84.21">y </tspan><tspan class="cls-113" x="64.38" y="84.21">o</tspan><tspan x="71.92" y="84.21">ffe</tspan><tspan class="cls-4" x="86.01" y="84.21">r</tspan><tspan x="90.45" y="84.21">ing </tspan><tspan class="cls-132" x="112.45" y="84.21">w</tspan><tspan x="122.74" y="84.21">orld</tspan><tspan class="cls-113" x="-23.37" y="101.05">-</tspan><tspan x="-18.03" y="101.05">c</tspan><tspan class="cls-14" x="-11.24" y="101.05">l</tspan><tspan class="cls-145" x="-8.34" y="101.05">a</tspan><tspan class="cls-93" x="-1.28" y="101.05">s</tspan><tspan x="5.12" y="101.05">s p</tspan><tspan class="cls-4" x="22.74" y="101.05">r</tspan><tspan class="cls-183" x="27.17" y="101.05">o</tspan><tspan x="34.68" y="101.05">du</tspan><tspan class="cls-137" x="49.95" y="101.05">c</tspan><tspan class="cls-154" x="56.91" y="101.05">t</tspan><tspan x="61.21" y="101.05">s and se</tspan><tspan class="cls-2" x="110.55" y="101.05">r</tspan><tspan class="cls-13" x="115.56" y="101.05">v</tspan><tspan x="122.05" y="101.05">i</tspan><tspan class="cls-47" x="125.05" y="101.05">c</tspan><tspan class="cls-93" x="131.91" y="101.05">e</tspan><tspan x="139.13" y="101.05">s</tspan><tspan x="19.72" y="117.89"> </tspan><tspan class="cls-15" x="23.37" y="117.89">t</tspan><tspan class="cls-129" x="27.34" y="117.89">o </tspan><tspan class="cls-145" x="38.41" y="117.89">c</tspan><tspan class="cls-168" x="45.14" y="117.89">u</tspan><tspan class="cls-38" x="52.6" y="117.89">s</tspan><tspan class="cls-15" x="58.79" y="117.89">t</tspan><tspan x="62.76" y="117.89">ome</tspan><tspan class="cls-109" x="88.87" y="117.89">r</tspan><tspan class="cls-122" x="93.47" y="117.89">s</tspan><tspan x="99.89" y="117.89">.</tspan></text>
        </g>
        <g>
          <path class="cls-49" d="M423.83,657.49c-1.05,0-2.09.04-3.14,0-1.64-.07-2.72-1.08-2.84-2.7-.05-.7-.14-1.02-.99-1.07-2.24-.14-3.56-1.76-3.36-3.99.05-.5.08-.75-.55-.87-1.78-.34-2.93-1.45-3.33-3.23-.4-1.76.23-3.18,1.66-4.21.48-.35.52-.73.49-1.23-.3-5.15-1.69-9.91-4.45-14.33-3.58-5.73-3.69-11.81-.94-17.87,3.78-8.33,13.26-12.79,22.09-10.58,8.99,2.25,14.98,10.38,14.62,19.63-.14,3.53-1.24,6.7-3.12,9.62-2.62,4.07-3.86,8.52-4.06,13.32-.03.7.09,1.15.69,1.62,1.31,1.02,1.83,2.43,1.45,4.08-.4,1.71-1.45,2.85-3.21,3.21-.52.11-.81.11-.68.85.38,2.15-.9,3.77-3.12,4-.65.07-.82.23-.91.88-.25,1.84-1.41,2.83-3.27,2.89-1,.03-2.01,0-3.02,0,0,0,0,0,0,0ZM423.91,640.56c2.94,0,5.87-.03,8.81.02.79.01,1.09-.14,1.14-1.02.29-5.27,1.74-10.19,4.68-14.62.75-1.14,1.38-2.36,1.78-3.68,3.37-11.38-5.09-22.82-17.08-22.33-13.64.56-20.54,15.71-14.11,25.57,3,4.59,4.49,9.65,4.8,15.09.04.78.27,1,1.04.99,2.98-.04,5.95-.02,8.93-.02ZM423.86,642.9c-3.34,0-6.67,0-10.01,0-1.44,0-2.27.71-2.29,1.89-.02,1.2.89,2.05,2.31,2.07,1.12.02,2.25-.03,3.37-.03,5.54,0,11.09.03,16.63.02,1.33,0,2.22-.86,2.22-2.02,0-1.2-.82-1.93-2.23-1.94-3.34-.01-6.67,0-10.01,0ZM423.86,651.68c2.16,0,4.33,0,6.49,0,.92,0,1.73-.12,1.79-1.28.05-.94-.55-1.43-1.77-1.44-4.3-.01-8.59,0-12.89-.02-1.01,0-1.77.23-1.83,1.39-.05.93.54,1.34,1.84,1.34,2.12,0,4.25,0,6.37,0ZM423.96,655.3s0,0,0-.01c1.05,0,2.09.03,3.14-.01.64-.03.9-.48.88-1.08-.02-.69-.57-.43-.91-.43-2.01-.02-4.02-.03-6.03,0-.39,0-1.04-.31-1.04.55,0,.74.4.99,1.07.98.97,0,1.93,0,2.9,0Z"/>
          <path class="cls-49" d="M456.15,620.15c1.25,0,2.49,0,3.74,0,.68,0,1.21.21,1.21,1,0,.79-.47,1.17-1.23,1.17-2.49.01-4.98,0-7.47,0-.75,0-1.24-.33-1.26-1.13-.02-.88.56-1.05,1.28-1.05,1.25,0,2.49,0,3.74,0Z"/>
          <path class="cls-49" d="M391.71,620.15c1.21,0,2.41,0,3.62,0,.7,0,1.34.19,1.31,1.05-.03.79-.6,1.11-1.31,1.12-2.49.02-4.98.02-7.48,0-.7,0-1.14-.39-1.16-1.12-.02-.78.46-1.05,1.16-1.05,1.29,0,2.57,0,3.86,0Z"/>
          <path class="cls-49" d="M410.82,596.41c-.05.68-.43.97-.86,1.21-.45.25-.84.02-1.04-.32-1.39-2.34-2.76-4.7-4.09-7.08-.28-.5-.11-1.06.44-1.34.53-.27,1.06-.11,1.4.35.42.58.76,1.23,1.12,1.85.88,1.49,1.75,2.97,2.62,4.46.18.31.31.64.41.86Z"/>
          <path class="cls-49" d="M456.28,602.98c-.02.54-.32.89-.76,1.14-2.15,1.24-4.29,2.48-6.44,3.7-.59.33-1.17.32-1.56-.32-.4-.67-.05-1.19.49-1.51,2.2-1.3,4.41-2.59,6.65-3.83.71-.39,1.6.11,1.63.82Z"/>
          <path class="cls-49" d="M392.67,602.07c.32-.03.63.16.94.34,1.94,1.12,3.88,2.24,5.84,3.34.71.4,1.2.95.79,1.74-.47.9-1.2.52-1.85.14-2.05-1.18-4.09-2.36-6.14-3.54-.53-.31-.87-.74-.69-1.38.14-.5.58-.62,1.11-.64Z"/>
          <path class="cls-49" d="M424.89,588.92c0,1.24,0,2.48,0,3.72,0,.67-.22,1.24-.98,1.26-.77.02-1.18-.52-1.19-1.23-.03-2.48-.03-4.96,0-7.45,0-.72.38-1.27,1.16-1.25.84.02,1.01.64,1.01,1.35,0,1.2,0,2.4,0,3.6Z"/>
          <path class="cls-49" d="M442.99,590.03c-.07.16-.17.42-.31.66-1.19,2.05-2.4,4.09-3.6,6.13-.37.64-.81,1.21-1.62.7-.7-.44-.53-1.07-.17-1.68,1.21-2.09,2.4-4.18,3.6-6.27.31-.55.76-.87,1.39-.66.44.14.73.49.7,1.12Z"/>
          <path class="cls-49" d="M423.96,655.3c-.97,0-1.93,0-2.9,0-.67,0-1.07-.25-1.07-.98,0-.86.65-.54,1.04-.55,2.01-.03,4.02-.03,6.03,0,.33,0,.88-.25.91.43.02.6-.24,1.05-.88,1.08-1.04.04-2.09.01-3.14.01,0,0,0,0,0,.01Z"/>
          <path class="cls-49" d="M414.59,620.05c-1.37-.22-2.51-.42-3.66-.57-.77-.1-1.15-.47-1.14-1.26.02-1.33,0-2.66,0-3.98,0-.78.4-1.18,1.17-1.26.92-.1,1.84-.22,2.76-.33.61-.07.78-.32.36-.85-.6-.76-1.15-1.55-1.75-2.31-.53-.66-.47-1.22.14-1.79.97-.9,1.95-1.8,2.88-2.75.54-.55,1.04-.49,1.6-.1.98.69,1.96,1.38,3.02,2.13.41-1.14.38-2.23.5-3.28.11-.97.49-1.47,1.52-1.44,1.25.03,2.5.04,3.74,0,.91-.03,1.31.39,1.43,1.25.15,1.1.35,2.19.55,3.46,1.07-.76,1.99-1.39,2.89-2.05.69-.51,1.3-.5,1.92.14.86.9,1.77,1.76,2.64,2.65.61.63.72,1.3.1,2.03-.58.67-1.1,1.39-1.67,2.07-.43.52-.29.78.34.86.88.11,1.75.24,2.64.31.87.07,1.32.5,1.32,1.39,0,1.29,0,2.58,0,3.86,0,.78-.39,1.17-1.15,1.26-.84.1-1.67.27-2.51.36-1.08.11-1.06.52-.45,1.25.54.65.99,1.37,1.48,2.06.44.62.4,1.16-.18,1.7-.91.85-1.8,1.73-2.65,2.65-.58.63-1.14.65-1.8.17-.72-.52-1.45-1.02-2.15-1.56-.59-.46-.96-.53-1.05.39-.09.88-.29,1.74-.4,2.62-.1.79-.44,1.25-1.32,1.22-1.25-.04-2.49-.02-3.74,0-.94,0-1.4-.43-1.47-1.37-.06-.84-.19-1.68-.28-2.52-.07-.66-.3-.88-.9-.4-.75.6-1.54,1.16-2.3,1.76-.62.49-1.18.41-1.71-.13-.98-1.01-1.94-2.04-2.92-3.05-.52-.53-.3-1.02.04-1.51.67-.95,1.34-1.89,2.17-3.06ZM433.12,608.84c-.06-.12-.08-.2-.13-.25-.55-.53-1.02-1.2-1.68-1.52-.36-.18-.81.52-1.23.81-.23.16-.45.34-.67.52-.66.55-1.23.99-2.25.61-1.11-.42-1.66-.98-1.63-2.17.01-.64-.14-1.28-.23-1.91-.04-.28-.06-.52-.42-.64-1.4-.43-2.29.12-2.47,1.57-.17,1.34-.17,2.67-1.94,3.19-1.27.37-1.89-.38-2.66-.93-1.59-1.12-1.56-1.13-2.89.21-.35.35-.43.58-.09.98.58.67,1.09,1.39,1.66,2.07.38.45.36.86.18,1.43-.39,1.26-1.19,1.8-2.45,1.87-.56.03-1.11.19-1.67.26-.4.05-.52.25-.57.62-.27,1.76-.05,2.08,1.66,2.31.36.05.71.16,1.07.16.8.01,1.36.26,1.66,1.09.32.89.73,1.71-.2,2.49-.3.25-.46.67-.76.93-.99.85-.86,1.51.11,2.36.69.6,1.12.71,1.77.09.38-.36.83-.63,1.25-.94,1.57-1.15,3.26-.48,3.61,1.46.1.55.26,1.11.26,1.66,0,.9.39,1.11,1.25,1.13,1.14.03,1.87-.14,1.74-1.51-.04-.43.12-.87.17-1.31.2-1.78,2.03-2.61,3.51-1.58.36.25.71.53,1.07.79,1.34.98,1.3.95,2.43-.2.53-.54.6-.93.08-1.49-.43-.47-.78-1.02-1.15-1.54-1.07-1.48-.2-3.4,1.64-3.61.44-.05.88-.16,1.32-.14,1.15.04,1.49-.48,1.39-1.6-.07-.74-.13-1.21-1.02-1.23-.64-.01-1.27-.19-1.9-.31-1.75-.34-2.44-2.06-1.4-3.48.4-.55.81-1.1,1.22-1.65.14-.19.26-.4.37-.58Z"/>
          <path class="cls-49" d="M423.85,622.32c-3.26-.03-5.98-2.81-5.93-6.05.06-3.32,2.77-5.96,6.05-5.89,3.23.06,5.89,2.76,5.9,5.96,0,3.19-2.83,6.01-6.02,5.98ZM423.87,612.45c-2.18,0-3.88,1.7-3.87,3.89,0,2.07,1.75,3.78,3.86,3.8,2.03.01,3.87-1.83,3.83-3.84-.03-2.11-1.76-3.85-3.82-3.84Z"/>
        </g>
      </g>
    </g>
    <g>
      <g>
        <image class="cls-65" width="244" height="265" transform="translate(574.93 552.67) scale(.88 1.13)" xlink:href="data:image/png;base64,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"/>
        <path class="cls-7" d="M583.77,606.36c0-23.39,14.77-42.34,32.99-42.34h131.94c18.22,0,32.99,18.96,32.99,42.34v193.19c0,23.39-14.77,42.34-32.99,42.34h-131.94c-18.22,0-32.99-18.96-32.99-42.34v-193.19Z"/>
      </g>
      <g>
        <text class="cls-108" transform="translate(618.55 713.74)"><tspan class="cls-13" x="0" y="0">F</tspan><tspan class="cls-240" x="7.73" y="0">o</tspan><tspan class="cls-38" x="15.3" y="0">s</tspan><tspan class="cls-15" x="21.49" y="0">t</tspan><tspan x="25.46" y="0">e</tspan><tspan class="cls-4" x="32.5" y="0">r</tspan><tspan x="36.94" y="0">ing a </tspan><tspan class="cls-243" x="69.72" y="0">c</tspan><tspan x="76.45" y="0">u</tspan><tspan class="cls-237" x="84" y="0">l</tspan><tspan class="cls-197" x="87.1" y="0">t</tspan><tspan x="90.96" y="0">u</tspan><tspan class="cls-4" x="98.51" y="0">r</tspan><tspan x="102.94" y="0">e </tspan><tspan class="cls-83" x="113.64" y="0">o</tspan><tspan x="121.18" y="0">f </tspan><tspan class="cls-15" x="-3.47" y="16.84">t</tspan><tspan class="cls-129" x=".5" y="16.84">ea</tspan><tspan class="cls-30" x="14.68" y="16.84">m</tspan><tspan class="cls-89" x="26.12" y="16.84">w</tspan><tspan x="36.41" y="16.84">ork all</tspan><tspan class="cls-38" x="71.75" y="16.84">o</tspan><tspan class="cls-56" x="79.13" y="16.84">ws </tspan><tspan class="cls-168" x="99.42" y="16.84">u</tspan><tspan x="106.89" y="16.84">s </tspan><tspan class="cls-168" x="116.77" y="16.84">t</tspan><tspan x="120.74" y="16.84">o </tspan><tspan class="cls-89" x="-7.82" y="33.68">w</tspan><tspan class="cls-129" x="2.47" y="33.68">ork </tspan><tspan class="cls-15" x="24.67" y="33.68">t</tspan><tspan class="cls-203" x="28.65" y="33.68">o</tspan><tspan x="36.17" y="33.68">g</tspan><tspan class="cls-113" x="43.83" y="33.68">e</tspan><tspan class="cls-38" x="50.99" y="33.68">t</tspan><tspan x="55" y="33.68">her </tspan><tspan class="cls-168" x="77.94" y="33.68">w</tspan><tspan class="cls-237" x="88.27" y="33.68">i</tspan><tspan class="cls-38" x="91.37" y="33.68">t</tspan><tspan x="95.38" y="33.68">hin </tspan><tspan class="cls-182" x="117.41" y="33.68">t</tspan><tspan class="cls-56" x="121.43" y="33.68">he</tspan><tspan class="cls-47" x="-9.91" y="50.53">c</tspan><tspan x="-3.05" y="50.53">ompa</tspan><tspan class="cls-220" x="30.88" y="50.53">n</tspan><tspan x="38.51" y="50.53">y </tspan><tspan class="cls-145" x="48.55" y="50.53">a</tspan><tspan x="55.61" y="50.53">s </tspan><tspan class="cls-239" x="65.49" y="50.53">w</tspan><tspan class="cls-224" x="75.77" y="50.53">e</tspan><tspan x="82.88" y="50.53">ll </tspan><tspan class="cls-21" x="92.53" y="50.53">a</tspan><tspan class="cls-56" x="99.59" y="50.53">s </tspan><tspan class="cls-168" x="109.47" y="50.53">w</tspan><tspan class="cls-237" x="119.8" y="50.53">i</tspan><tspan class="cls-38" x="122.9" y="50.53">t</tspan><tspan class="cls-56" x="126.92" y="50.53">h </tspan><tspan x="-8.69" y="67.37">our </tspan><tspan class="cls-243" x="14.48" y="67.37">c</tspan><tspan class="cls-15" x="21.2" y="67.37">u</tspan><tspan class="cls-38" x="28.67" y="67.37">s</tspan><tspan class="cls-15" x="34.86" y="67.37">t</tspan><tspan x="38.83" y="67.37">ome</tspan><tspan class="cls-109" x="64.93" y="67.37">r</tspan><tspan class="cls-129" x="69.54" y="67.37">s </tspan><tspan class="cls-96" x="79.42" y="67.37">t</tspan><tspan class="cls-56" x="83.39" y="67.37">o d</tspan><tspan class="cls-224" x="102.18" y="67.37">e</tspan><tspan class="cls-97" x="109.28" y="67.37">l</tspan><tspan class="cls-134" x="112.29" y="67.37">i</tspan><tspan x="115.36" y="67.37">ver </tspan><tspan class="cls-183" x="17.38" y="84.21">b</tspan><tspan class="cls-113" x="25.18" y="84.21">e</tspan><tspan class="cls-109" x="32.34" y="84.21">t</tspan><tspan class="cls-15" x="36.45" y="84.21">t</tspan><tspan x="40.42" y="84.21">er sol</tspan><tspan class="cls-137" x="72.32" y="84.21">u</tspan><tspan class="cls-97" x="80.04" y="84.21">tio</tspan><tspan class="cls-242" x="94.52" y="84.21">n</tspan><tspan class="cls-141" x="102.17" y="84.21">s</tspan><tspan x="108.59" y="84.21">.</tspan></text>
        <text class="cls-58" transform="translate(621.8 691.68)"><tspan class="cls-63" x="0" y="0">T</tspan><tspan class="cls-10" x="12.36" y="0">E</tspan><tspan x="25.6" y="0">A</tspan><tspan class="cls-245" x="39.9" y="0">M</tspan><tspan class="cls-193" x="58.08" y="0">W</tspan><tspan x="77.28" y="0">O</tspan><tspan class="cls-139" x="92.82" y="0">R</tspan><tspan x="106.68" y="0">K</tspan></text>
      </g>
      <g>
        <path class="cls-49" d="M668.71,628.03c3.37,1.72,5.46,4.39,5.92,8.2.26,2.16-.15,4.22-1.39,6.35.04-1.58-.42-2.68-1.55-3.44-1.08-.72-2.31-1.02-3.56-1.26-.74-.3-1.6-.16-2.3-.59.02-.06.04-.13.07-.19.13-.02.26-.01.37-.06,1.87-.67,2.98-2.49,2.76-4.52-.2-1.87-1.79-3.43-3.73-3.66-1.84-.22-3.72.95-4.38,2.7-.69,1.83-.05,3.85,1.56,4.99.29.2.75.24.8.69-1.1.36-2.29-.05-3.36.44-1.14-.05-2.18.25-3.14.85-1.03.64-1.41,1.65-1.53,2.93-1.52-2.96-1.19-6.16.21-8.86,1.57-3.04,4.12-4.68,7.41-5.31,2.02-.27,3.97-.01,5.86.75Z"/>
        <path class="cls-49" d="M681.9,605.11c-.22.21-.52.07-.77.17-1.6-.08-3.17.15-4.69.61-1.6.48-2.62,1.52-2.69,3.57-.61-1.07-.8-2.01-.9-2.95-.78-7.43,5.98-13.04,13.14-10.93.21.06.43.12.64.18,4.53,2.15,6.87,5.94,6.48,10.47-.11,1.28-.54,2.46-.99,3.65-.11.14-.23.27-.47.57.06-2.67-1.56-3.72-3.67-4.29-1.25-.33-2.52-.59-3.78-.88,0-.04,0-.08,0-.12.27-.1.54-.18.8-.29,2.24-1,3.17-3.71,2-5.86-1.19-2.2-4-2.89-6.07-1.47-1.34.92-1.97,2.24-1.83,3.85.16,1.78,1.18,2.96,2.81,3.64,0,.03,0,.07-.01.1Z"/>
        <path class="cls-49" d="M667.27,646.91c-.11.41-.49.36-.78.42-1.73.36-3.44.2-5.15-.22-.51-.12-.7-.42-.66-.96.1-1.17.16-2.34.21-3.52.03-.87-.59-1.36-1.41-1.14-.59.13-.54.63-.57,1.05-.07.82-.13,1.64-.14,2.46,0,.79-.36.61-.78.33-.94-.65-.93-1.6-.84-2.61.23-2.57-.22-2.6,2.67-3.27,2.74-.32,5.46-.3,8.16.31.75.26,1.51.48,2.24.78.72.29,1.08.86,1,1.66-.05.51-.14,1.02-.08,1.52.16,1.37-.61,2.03-1.9,2.54.07-1.13.13-2.18.19-3.24.03-.6-.14-1.11-.81-1.2-.76-.1-1.11.37-1.15,1.07-.08,1.33-.14,2.67-.2,4Z"/>
        <path class="cls-49" d="M681.22,607.16c2.22.09,4.43.28,6.57.97,1.64.53,1.95.94,1.84,2.67-.02.35-.04.7-.06,1.05-.09,1.47-.3,1.74-1.86,2.3.06-.94.11-1.84.16-2.74.02-.31.02-.6-.12-.91-.22-.49-.52-.79-1.08-.69-.53.09-.69.47-.72.96-.06,1.17-.19,2.35-.19,3.52,0,.75-.32.96-.98,1.08-1.29.24-2.57.11-3.85-.02q-1.84-.6-1.72-2.56c.04-.73.08-1.46.13-2.19.05-.67-.07-1.24-.88-1.3-.87-.06-1.05.52-1.08,1.23-.05,1-.11,2-.18,3.12-1.09-.68-1.92-1.33-1.58-2.68.08-.33.05-.7.07-1.04.1-1.65.45-2.07,2.12-2.35,1.13-.18,2.27-.27,3.4-.4Z"/>
        <path class="cls-49" d="M668.9,607c-.23,1.21-.48,2.41-.69,3.62-.12.68-.44,1.17-1.18,1.05-.75-.12-.89-.7-.76-1.38.1-.53.17-1.06.25-1.59,0-.08.02-.15.03-.23-.05.03-.11.06-.16.1-1.32.89-2.39,2.03-3.37,3.28-1.57,1.74-2.71,3.74-3.66,5.86-.94,2.11-1.55,4.31-1.77,6.62-.08.78-.46,1.56-1.3,1.42-.84-.14-.78-.99-.68-1.72.78-5.61,3.05-10.52,6.93-14.65.88-.94,1.86-1.79,2.82-2.7-.61-.33-1.27-.28-1.88-.43-.6-.15-1.13-.36-1.07-1.1.05-.73.57-.92,1.2-.94,1.4.27,2.79.57,4.19.8.68.11,1.13.38,1.27,1.07-.05.31-.11.61-.16.92Z"/>
        <path class="cls-49" d="M676.28,647.48c.8.92.71,1.44-.35,1.99-.54.28-1.1.55-1.86.92,2.95.97,5.72,1.31,8.55,1.18,1.81.01,3.56-.36,5.31-.78.18-.04.37-.09.55-.14.7-.22,1.22.04,1.4.72.19.7-.29,1.03-.91,1.21-1.19.34-2.4.59-3.62.77-.18.03-.36.09-.55.13-1.98.1-3.95.18-5.93.04-1.68-.33-3.38-.55-5.24-1.17.35.75.6,1.3.87,1.84.3.6.25,1.15-.39,1.46-.63.3-1.09,0-1.39-.6-.64-1.31-1.3-2.62-1.95-3.93-.32-.65-.18-1.18.48-1.51,1.33-.67,2.67-1.33,4.01-2,.33-.17.67-.18,1.02-.11Z"/>
        <path class="cls-49" d="M683.49,627.69q-1.69-1.46-3.61-.29c-1.02.63-2.04,1.26-3.05,1.89-.67.27-1.43.95-1.98-.04-.56-1.02.4-1.36,1.06-1.76,1.56-.97,3.13-1.93,4.69-2.89.12-.03.21-.09.19-.23.15-1.01.2-2.03.18-3.05.05-.6.1-1.2.16-1.8.06-.6.32-1.06,1.01-1.02.69.04,1.01.49.98,1.15-.07,1.43-.14,2.86-.25,4.28-.04.53.12.87.55,1.19,1.49,1.11,2.93,2.29,4.42,3.4.62.46.86,1,.31,1.58-.51.54-1.07.4-1.65-.09-.96-.82-2-1.57-3-2.34Z"/>
        <path class="cls-49" d="M680.78,624.37c.02.14-.07.2-.19.23.06-.08.13-.15.19-.23Z"/>
        <path class="cls-49" d="M694.14,636.85c.32.83.95,1.38,1.69,1.83.15.09.39.15.31.4-.08.25-.32.12-.48.14-.34.05-.68.08-1.03.12-1.37,0-2.72.17-4,.69-1.41.57-2.27,1.57-2.29,3.17-.09.02-.17.03-.26.05-1.64-3.95-.85-8.18,2.44-11.34.32-.31.66-.59.99-.89,2.65-1.79,5.54-2.28,8.65-1.62,2.8.91,5.02,2.55,6.37,5.19,1.65,3.23,1.48,6.47-.21,9.68,0-2.46-1.54-3.51-3.6-4.08-1.3-.36-2.61-.66-3.92-.99.02-.06.05-.12.07-.19,1.73-.34,3.04-1.83,3.21-3.66.17-1.82-.96-3.64-2.68-4.3-1.75-.67-3.63-.15-4.77,1.32-1.14,1.38-1.27,2.87-.5,4.46Z"/>
        <path class="cls-49" d="M709.33,626.6c-.52.54-1.05,1.08-1.57,1.63-.57.6-1.12.71-1.75.06-1-1.03-2.03-2.03-3.06-3.04-.47-.47-.63-.99-.16-1.51.49-.53,1.02-.39,1.5.07.46.43.91.85,1.56,1.46-.51-4.74-2-8.81-4.74-12.4-1.05-1.53-2.34-2.83-3.74-4.03-.55-.48-.99-1-.38-1.68.57-.62,1.12-.29,1.65.16,1.88,1.58,3.45,3.45,4.88,5.43,2.38,3.75,3.89,7.81,4.29,12.37.67-.41,1.05-.95,1.5-1.41.45-.46.95-.7,1.5-.21.57.52.42,1.06-.07,1.57-.48.5-.95,1.01-1.43,1.52Z"/>
        <path class="cls-49" d="M699.21,649.38c-1.59.16-3.15.1-4.7-.35-.61-.18-.88-.43-.79-1.12.14-1.13.15-2.27.22-3.41.04-.65-.17-1.16-.88-1.22-.78-.08-1.05.43-1.08,1.12-.04.85-.13,1.71-.14,2.56,0,.76-.32.57-.7.29-1.08-.61-.99-1.59-.92-2.63.19-2.6.33-2.78,2.89-3.2.47-.08.94-.13,1.42-.2,2.62-.13,5.2.1,7.72.87,1.77.54,2.09.97,1.98,2.78-.02.29-.08.58-.04.86.18,1.37-.66,1.98-1.88,2.49.05-.93.1-1.77.15-2.61.08-1.33-.17-1.87-.91-1.84-1.19.05-1.01,1.01-1.08,1.77-.07.82-.18,1.65-.13,2.47.05.87-.3,1.28-1.13,1.37Z"/>
        <path class="cls-49" d="M664.69,635.29c-1.24-.09-2.15-1.14-2.06-2.4.09-1.24,1.15-2.16,2.39-2.07,1.24.1,2.15,1.15,2.07,2.4-.08,1.24-1.15,2.15-2.39,2.07Z"/>
        <path class="cls-49" d="M697.75,637.23c-1.25-.08-2.17-1.12-2.1-2.36.07-1.24,1.12-2.18,2.35-2.11,1.25.08,2.17,1.11,2.1,2.36-.07,1.24-1.12,2.18-2.35,2.11Z"/>
        <path class="cls-49" d="M685.56,601.09c-.04,1.2-1.14,2.21-2.34,2.16-1.21-.05-2.2-1.13-2.16-2.35.04-1.2,1.13-2.21,2.35-2.16,1.2.04,2.21,1.13,2.16,2.35Z"/>
      </g>
    </g>
    <g>
      <use class="cls-65" transform="translate(69.44 552.67) scale(.88 1.13)" xlink:href="#image-2"/>
      <path class="cls-7" d="M78.27,606.36c0-23.39,14.77-42.34,32.99-42.34h131.94c18.22,0,32.99,18.96,32.99,42.34v193.19c0,23.39-14.77,42.34-32.99,42.34H111.26c-18.22,0-32.99-18.96-32.99-42.34v-193.19Z"/>
      <g>
        <g>
          <rect class="cls-49" x="175.63" y="656.03" width="2.27" height="2.27" transform="translate(-410.36 313.07) rotate(-44.57)"/>
          <path class="cls-49" d="M181.24,651.16l-1.53,1.51,1.59,1.62,1.62-1.59-1.5-1.52c-.06,0-.12,0-.18-.01Z"/>
          <path class="cls-49" d="M170.67,652.6l1.59,1.62,1.62-1.59-.95-.97c-.46.05-.92.06-1.37.07l-.89.87Z"/>
          <polygon class="cls-49" points="187.66 660.75 187.66 660.75 187.66 660.75 187.66 660.75"/>
          <path class="cls-49" d="M164.77,652.49h0s.08.07.08.07l6.94-6.84c-.48-.63-.89-1.28-1.25-1.96l-7.29,7.18,1.52,1.54Z"/>
          <path class="cls-49" d="M172.94,651.66l.95.97,2.85-2.81c-.69-.34-1.36-.75-2.01-1.21l-3.17,3.12c.46,0,.92-.02,1.37-.07Z"/>
          <rect class="cls-49" x="176.98" y="653.79" width="4.12" height="2.27" transform="translate(-408.19 314.12) rotate(-44.58)"/>
          <path class="cls-49" d="M182.92,652.69l1.53-1.51c-1.01.11-2.02.1-3.03-.01l1.5,1.52Z"/>
          <rect class="cls-49" x="172.43" y="658.27" width="4.12" height="2.27" transform="translate(-412.69 312.29) rotate(-44.59)"/>
          <rect class="cls-49" x="167.95" y="653.72" width="4.12" height="2.27" transform="translate(-410.75 307.78) rotate(-44.58)"/>
          <path class="cls-49" d="M196.76,651.77l-3.46-3.51-2.93,2.89,3.42,3.47.07.07.07.07c.39.36.9.55,1.4.55s1.05-.2,1.45-.59c.4-.4.61-.91.62-1.44,0-.52-.18-1.04-.56-1.44l-.03-.03-.04-.03Z"/>
          <path class="cls-49" d="M180.97,663.05l-1.33-1.35-2.93,2.89,1.2,1.22.13.15.15.13c.81.68,2.01.64,2.77-.11.81-.8.82-2.09.03-2.9v-.02s-.03-.01-.03-.01Z"/>
          <path class="cls-49" d="M158.33,645.96c.19.22.37.43.58.64.15.15.31.29.46.43.06.05.11.1.16.15l.83.84,8.75-8.62,5.39-5.31h0s2.32-2.28,2.32-2.28l.09-.09c.05-.06.08-.13.11-.19.08-.06.16-.11.24-.17l.16-.06c.05-.1.1-.19.18-.27.36-.35.93-.35,1.29,0l.02.02,6.52,6.67,1.31,1.34c.36.41.89.67,1.48.68,1.11.01,2.01-.87,2.02-1.98,0-.57-.23-1.08-.6-1.44l-.05-.05-8.18-8.36h0s-.02-.02-.02-.02c-1.39-1.41-3.02-2.46-4.75-3.15-1.56-.63-3.2-.97-4.86-1.01-.58-.02-1.16,0-1.74.06-.52.05-1.04.13-1.55.24-1.01-.04-2.01-.44-2.78-1.22l-1.83-1.85-11.74,11.57,1.66,1.68,1.03,1.05c.49.72.73,1.55.72,2.39v.2c-.05.71-.01,1.42.08,2.13.28,2.04,1.09,4.02,2.44,5.72l-.02.02.25.26Z"/>
          <path class="cls-49" d="M184.19,657.22l-2.93,2.89,3.47,3.53.07.07.07.07c.38.35.85.53,1.33.55.54.02,1.09-.18,1.51-.59.42-.41.62-.96.61-1.5,0-.51-.2-1.02-.59-1.41l-.07-.07h0s0,0,0,0h0s-3.48-3.53-3.48-3.53Z"/>
          <path class="cls-49" d="M193.18,657.24l-4.44-4.5-2.93,2.89,4.45,4.52.05.06c.8.81,2.11.82,2.92.02.81-.8.82-2.11.02-2.92l-.07-.06Z"/>
        </g>
        <path class="cls-20" d="M200.61,633.98l1.68-1.66-11.57-11.74-1.85,1.83c-.78.77-1.79,1.16-2.8,1.18-.51-.12-1.03-.21-1.55-.26-.58-.06-1.16-.09-1.74-.09-2.1.02-4.2.53-6.12,1.49,1.73.69,3.36,1.74,4.75,3.15l.02.02h0s8.18,8.36,8.18,8.36l.05.05c.37.37.6.88.6,1.44-.01,1.11-.92,1.99-2.02,1.98-.59,0-1.12-.27-1.48-.68l-1.31-1.34-6.52-6.67-.02-.02c-.36-.35-.93-.35-1.29,0-.08.08-.14.17-.18.27l-.16.06c-.08.06-.16.11-.24.17-.03.06-.06.13-.11.19l-.09.09-2.32,2.29h0s-5.39,5.31-5.39,5.31l-8.75,8.62-2.94,2.9-.03.03-.03.03c-.39.4-.58.92-.58,1.44s.2,1.05.59,1.45c.4.4.91.61,1.44.62.5,0,1.01-.17,1.4-.53l.07-.07.07-.07,2.91-2.86,7.29-7.18c.36.68.77,1.33,1.25,1.96l-6.94,6.84-3.94,3.88-.07.06c-.81.8-.82,2.11-.02,2.92.8.81,2.11.82,2.92.02l.05-.06,3.95-3.89,2.93-2.89.89-.87,3.17-3.12c.64.47,1.31.87,2.01,1.21l-2.85,2.81-1.62,1.59-2.93,2.89-2.96,2.92h0s-.07.07-.07.07c-.39.39-.6.89-.61,1.4-.02.54.18,1.09.59,1.51.41.42.96.62,1.5.61.48,0,.96-.18,1.34-.52l.07-.07.07-.07,2.96-2.92,2.93-2.89,1.62-1.59,2.93-2.89,1.53-1.51c.06,0,.12,0,.18.01,1.01.11,2.02.12,3.03.01l-1.53,1.51-1.62,1.59-2.93,2.89-1.62,1.59-2.93,2.89-.78.77h-.01s-.01.03-.01.03c-.8.8-.8,2.1,0,2.9.75.76,1.95.82,2.77.15l.15-.13.13-.15.66-.65,2.93-2.89,1.62-1.59,2.93-2.89,1.62-1.59,2.93-2.89.64-.64h0s.97-.95.97-.95l2.93-2.89,1.41-1.38c.22-.18.43-.38.64-.58.21-.2.4-.41.59-.63l.25-.25-.02-.02c1.38-1.67,2.22-3.64,2.53-5.68.1-.71.15-1.42.12-2.13v-.2c-.01-.83.24-1.67.74-2.38l1.05-1.03Z"/>
      </g>
      <g>
        <text class="cls-108" transform="translate(108.86 713.16)"><tspan class="cls-79" x="0" y="0">W</tspan><tspan x="12.38" y="0">e a</tspan><tspan class="cls-4" x="30.2" y="0">r</tspan><tspan x="34.64" y="0">e </tspan><tspan class="cls-4" x="45.33" y="0">r</tspan><tspan class="cls-134" x="49.77" y="0">ec</tspan><tspan class="cls-203" x="63.75" y="0">o</tspan><tspan x="71.27" y="0">gn</tspan><tspan class="cls-113" x="86.62" y="0">i</tspan><tspan x="89.74" y="0">z</tspan><tspan class="cls-134" x="95.7" y="0">e</tspan><tspan class="cls-232" x="102.82" y="0">d and</tspan><tspan class="cls-4" x="-18.69" y="16.84">r</tspan><tspan class="cls-93" x="-14.25" y="16.84">e</tspan><tspan class="cls-14" x="-7.04" y="16.84">s</tspan><tspan class="cls-183" x="-.91" y="16.84">p</tspan><tspan class="cls-134" x="6.91" y="16.84">e</tspan><tspan class="cls-137" x="14.03" y="16.84">c</tspan><tspan class="cls-15" x="20.99" y="16.84">t</tspan><tspan class="cls-134" x="24.96" y="16.84">e</tspan><tspan x="32.08" y="16.84">d ac</tspan><tspan class="cls-4" x="57.37" y="16.84">r</tspan><tspan class="cls-70" x="61.8" y="16.84">o</tspan><tspan class="cls-137" x="69.37" y="16.84">s</tspan><tspan x="75.77" y="16.84">s </tspan><tspan class="cls-75" x="85.65" y="16.84">t</tspan><tspan x="89.66" y="16.84">he ind</tspan><tspan class="cls-15" x="126.46" y="16.84">u</tspan><tspan class="cls-38" x="133.93" y="16.84">s</tspan><tspan class="cls-132" x="140.12" y="16.84">t</tspan><tspan class="cls-40" x="144.05" y="16.84">r</tspan><tspan x="149.03" y="16.84">y</tspan><tspan x="-20.18" y="33.68">for our </tspan><tspan class="cls-137" x="22.14" y="33.68">u</tspan><tspan class="cls-132" x="29.86" y="33.68">t</tspan><tspan x="33.79" y="33.68">m</tspan><tspan class="cls-240" x="45.42" y="33.68">o</tspan><tspan class="cls-75" x="52.99" y="33.68">s</tspan><tspan x="59.18" y="33.68">t </tspan><tspan class="cls-47" x="66.88" y="33.68">c</tspan><tspan class="cls-129" x="73.75" y="33.68">omm</tspan><tspan class="cls-209" x="104.44" y="33.68">i</tspan><tspan class="cls-132" x="107.54" y="33.68">t</tspan><tspan x="111.47" y="33.68">me</tspan><tspan class="cls-202" x="130.15" y="33.68">n</tspan><tspan class="cls-232" x="137.8" y="33.68">t </tspan><tspan class="cls-15" x="145.51" y="33.68">t</tspan><tspan x="149.48" y="33.68">o</tspan><tspan x="-9.21" y="50.53">hon</tspan><tspan class="cls-93" x="13.59" y="50.53">e</tspan><tspan class="cls-38" x="20.81" y="50.53">s</tspan><tspan class="cls-110" x="27" y="50.53">t</tspan><tspan x="31.47" y="50.53">y and </tspan><tspan class="cls-89" x="67.7" y="50.53">t</tspan><tspan class="cls-80" x="71.63" y="50.53">r</tspan><tspan x="75.93" y="50.53">a</tspan><tspan class="cls-38" x="83.06" y="50.53">n</tspan><tspan class="cls-14" x="90.71" y="50.53">s</tspan><tspan x="96.85" y="50.53">pa</tspan><tspan class="cls-4" x="111.71" y="50.53">r</tspan><tspan class="cls-129" x="116.14" y="50.53">en</tspan><tspan class="cls-98" x="130.88" y="50.53">c</tspan><tspan class="cls-114" x="138" y="50.53">y</tspan><tspan class="cls-129" x="143.55" y="50.53">.</tspan></text>
        <text class="cls-58" transform="translate(120.57 691.68)"><tspan x="0" y="0">I</tspan><tspan class="cls-126" x="6.9" y="0">N</tspan><tspan class="cls-143" x="22.38" y="0">T</tspan><tspan class="cls-41" x="34.74" y="0">E</tspan><tspan x="47.68" y="0">G</tspan><tspan class="cls-139" x="63.02" y="0">R</tspan><tspan class="cls-126" x="76.88" y="0">I</tspan><tspan class="cls-196" x="83.9" y="0">T</tspan><tspan x="97.3" y="0">Y</tspan></text>
      </g>
    </g>
    <g>
      <g>
        <image class="cls-65" width="244" height="265" transform="translate(827.68 552.67) scale(.88 1.13)" xlink:href="data:image/png;base64,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"/>
        <path class="cls-7" d="M836.51,606.36c0-23.39,14.77-42.34,32.99-42.34h131.94c18.22,0,32.99,18.96,32.99,42.34v193.19c0,23.39-14.77,42.34-32.99,42.34h-131.94c-18.22,0-32.99-18.96-32.99-42.34v-193.19Z"/>
      </g>
      <g>
        <path class="cls-49" d="M966.28,645.61c-1.77,6.16-5.73,10.16-11.86,12.03-4.59,1.11-8.91.42-12.98-1.92-1.9-1.31-3.63-2.81-4.92-4.75-.15-.22-.3-.34-.61-.24-2.41.85-4.92,1.23-7.45,1.5-4.18.11-8.23-.52-12.12-2.08-3.8-1.6-7.09-3.94-9.95-6.9-.48-.59-.97-1.18-1.45-1.78-.74-.92-.95-1.95-.66-3.11.73-2.84,1.64-5.61,3.2-8.12,3.26-5.46,7.82-9.31,13.93-11.24-.04-.11-.04-.19-.07-.21-3.18-1.71-5.24-4.33-6.32-7.75-.66-2.99-.45-5.88.91-8.67,1.84-3.78,4.88-5.91,8.97-6.62,1.31-.23,2.62-.2,3.93-.04,3.13.55,5.67,2.09,7.72,4.5,2.83,3.97,3.46,8.21,1.49,12.72-1,2.31-2.65,4.08-4.8,5.4-.26.16-.52.32-.78.48-.02.02-.04.05-.09.12.55.34,1.17.47,1.77.64,3.01,1.27,5.66,3.08,8.04,5.31,1.16,1.44,1.16,1.46,2.85.93,3.37-1.06,6.74-1,10.12-.06,1.66.69,3.31,1.37,4.78,2.45,1.68,1.23,3.02,2.76,4.23,4.42,1.72,2.92,2.68,6.05,2.58,9.47-.04,1.19-.25,2.36-.47,3.53ZM949.83,626.89c-1.52-.08-2.97.27-4.4.74-5.79,1.9-10.14,7.87-9.93,13.59-.11,3.82,1.07,7.17,3.63,10.02.13.17.24.35.39.5,5.75,6.02,15.35,6.11,21.16.16,6.12-6.27,5.38-15.88-.73-21.3-2.88-2.58-6.25-3.83-10.12-3.71ZM917.88,648.69c5.56,2.12,11.18,2.17,16.85.49.7-.21.47-.52.28-.93-1.68-3.74-1.86-7.63-.75-11.5,1.04-3.62,3.27-6.51,6.35-8.71,1.27-.91,1.27-.9.04-1.96-2.19-2.27-4.76-3.93-7.76-4.9-4.42-1.61-8.83-1.45-13.08.42-7.6,3.35-11.72,9.56-13.74,17.37-.12.48.02.91.32,1.29,1.2,1.52,2.47,2.97,4.03,4.13,2.21,1.92,4.66,3.4,7.46,4.3ZM937.33,607.88c.02-5.77-4.61-10.45-10.36-10.46-5.72-.01-10.43,4.61-10.46,10.28-.03,5.86,4.61,10.54,10.47,10.54,5.71,0,10.33-4.62,10.35-10.36Z"/>
        <path class="cls-49" d="M942.81,647.49c.18-.9.34-1.8.53-2.7.08-.39-.09-.63-.35-.88-.82-.78-1.62-1.58-2.45-2.36-.83-.79-1.16-1.74-.8-2.83.35-1.06,1.15-1.61,2.26-1.76,1.09-.14,2.18-.36,3.27-.47.52-.06.82-.26,1.04-.73.47-1.03.99-2.04,1.49-3.05.49-1,1.3-1.56,2.41-1.55,1.07.02,1.85.57,2.33,1.54.48.96.99,1.91,1.41,2.89.28.66.67.99,1.39.87.17.04.34.07.51.11.14.02.27.03.41.05.75.13,1.5.26,2.26.4.98.17,1.71.68,2.05,1.63.34.97.21,1.89-.51,2.65-.81.84-1.64,1.66-2.5,2.44-.46.42-.62.83-.48,1.45.23,1.08.38,2.17.57,3.26.18,1.03-.13,1.9-.94,2.53-.85.66-1.79.75-2.76.26-1.04-.53-2.08-1.05-3.09-1.62-.49-.28-.88-.26-1.36.01-.9.52-1.85.96-2.76,1.47-1.03.57-2.05.66-3.02-.07-.96-.72-1.23-1.71-.96-2.86.05-.21.04-.42.06-.64ZM944.51,648.77c0,.75.51,1.07,1.2.73,1.23-.61,2.46-1.24,3.66-1.92.57-.32,1.06-.32,1.63,0,1.15.64,2.32,1.24,3.49,1.85.33.17.65.36,1.03.1.39-.28.36-.65.28-1.07-.24-1.33-.43-2.66-.68-3.98-.11-.58.06-1,.47-1.39.96-.91,1.89-1.84,2.83-2.76.29-.28.58-.56.44-1.03-.14-.49-.58-.5-.96-.56-1.33-.21-2.66-.41-4-.58-.55-.07-.88-.34-1.11-.82-.58-1.21-1.19-2.42-1.78-3.63-.18-.37-.37-.73-.85-.72-.43.02-.61.36-.77.7-.54,1.1-1.13,2.18-1.61,3.3-.34.8-.87,1.18-1.73,1.26-1.13.11-2.25.28-3.36.47-.43.07-.96.02-1.15.58-.18.56.24.84.56,1.16.79.77,1.53,1.59,2.38,2.3.77.64.92,1.35.72,2.28-.27,1.25-.46,2.53-.67,3.75Z"/>
      </g>
      <g>
        <text class="cls-58" transform="translate(847.98 691.68)"><tspan class="cls-207" x="0" y="0">C</tspan><tspan class="cls-219" x="14.6" y="0">U</tspan><tspan class="cls-193" x="29.44" y="0">S</tspan><tspan class="cls-234" x="42.64" y="0">T</tspan><tspan x="54.62" y="0">OM</tspan><tspan class="cls-219" x="88.38" y="0">E</tspan><tspan x="101.1" y="0">R </tspan><tspan class="cls-163" x="119.36" y="0">F</tspan><tspan class="cls-125" x="131.68" y="0">I</tspan><tspan class="cls-118" x="138.58" y="0">R</tspan><tspan class="cls-193" x="152.6" y="0">S</tspan><tspan x="165.8" y="0">T</tspan></text>
        <text class="cls-108" transform="translate(844.81 713.84)"><tspan class="cls-38" x="0" y="0">C</tspan><tspan class="cls-168" x="9.35" y="0">u</tspan><tspan class="cls-242" x="16.81" y="0">s</tspan><tspan class="cls-96" x="23" y="0">t</tspan><tspan class="cls-56" x="26.98" y="0">omer </tspan><tspan class="cls-224" x="61.28" y="0">s</tspan><tspan class="cls-21" x="67.56" y="0">a</tspan><tspan x="74.62" y="0">t</tspan><tspan class="cls-21" x="78.68" y="0">i</tspan><tspan class="cls-222" x="81.61" y="0">s</tspan><tspan class="cls-21" x="87.89" y="0">f</tspan><tspan x="91.34" y="0">a</tspan><tspan class="cls-137" x="98.47" y="0">c</tspan><tspan x="105.43" y="0">tion </tspan><tspan class="cls-145" x="131.25" y="0">i</tspan><tspan x="134.19" y="0">s </tspan><tspan class="cls-145" x="144.07" y="0">a</tspan><tspan x="151.13" y="0">t </tspan><tspan class="cls-38" x="158.83" y="0">t</tspan><tspan x="162.85" y="0">he </tspan><tspan x="15.22" y="16.84">hea</tspan><tspan class="cls-180" x="37.09" y="16.84">r</tspan><tspan x="42.07" y="16.84">t </tspan><tspan class="cls-83" x="49.78" y="16.84">o</tspan><tspan class="cls-97" x="57.31" y="16.84">f our o</tspan><tspan class="cls-73" x="95.08" y="16.84">r</tspan><tspan class="cls-132" x="99.44" y="16.84">g</tspan><tspan x="106.98" y="16.84">an</tspan><tspan class="cls-217" x="121.8" y="16.84">i</tspan><tspan class="cls-222" x="124.92" y="16.84">z</tspan><tspan class="cls-21" x="130.92" y="16.84">a</tspan><tspan x="137.98" y="16.84">tio</tspan><tspan class="cls-158" x="152.47" y="16.84">n</tspan><tspan x="159.98" y="16.84">. </tspan><tspan class="cls-79" x=".19" y="33.68">W</tspan><tspan x="12.57" y="33.68">e </tspan><tspan class="cls-136" x="23.26" y="33.68">b</tspan><tspan class="cls-224" x="31.07" y="33.68">e</tspan><tspan x="38.17" y="33.68">li</tspan><tspan class="cls-144" x="44.18" y="33.68">e</tspan><tspan x="51.43" y="33.68">ve in </tspan><tspan class="cls-4" x="82.91" y="33.68">s</tspan><tspan class="cls-246" x="89.03" y="33.68">h</tspan><tspan x="96.64" y="33.68">a</tspan><tspan class="cls-4" x="103.77" y="33.68">r</tspan><tspan class="cls-97" x="108.2" y="33.68">ing </tspan><tspan class="cls-177" x="130.21" y="33.68">s</tspan><tspan x="136.27" y="33.68">u</tspan><tspan class="cls-134" x="143.82" y="33.68">cc</tspan><tspan class="cls-137" x="157.55" y="33.68">es</tspan><tspan x="171.16" y="33.68">s </tspan><tspan class="cls-38" x="1.19" y="50.53">t</tspan><tspan x="5.21" y="50.53">h</tspan><tspan class="cls-4" x="12.9" y="50.53">r</tspan><tspan x="17.33" y="50.53">ough </tspan><tspan class="cls-38" x="51.31" y="50.53">s</tspan><tspan class="cls-132" x="57.5" y="50.53">t</tspan><tspan class="cls-184" x="61.43" y="50.53">r</tspan><tspan class="cls-56" x="65.87" y="50.53">ong and long</tspan><tspan class="cls-130" x="144.26" y="50.53">-</tspan><tspan class="cls-168" x="149.34" y="50.53">t</tspan><tspan x="153.32" y="50.53">e</tspan><tspan class="cls-171" x="160.36" y="50.53">r</tspan><tspan class="cls-97" x="164.75" y="50.53">m </tspan><tspan class="cls-4" x="37.12" y="67.37">r</tspan><tspan class="cls-225" x="41.56" y="67.37">e</tspan><tspan class="cls-228" x="48.66" y="67.37">l</tspan><tspan class="cls-145" x="51.57" y="67.37">a</tspan><tspan x="58.62" y="67.37">tio</tspan><tspan class="cls-38" x="73.11" y="67.37">n</tspan><tspan class="cls-4" x="80.76" y="67.37">s</tspan><tspan class="cls-56" x="86.88" y="67.37">hi</tspan><tspan class="cls-85" x="97.57" y="67.37">p</tspan><tspan x="105.44" y="67.37">s </tspan><tspan class="cls-246" x="115.33" y="67.37">w</tspan><tspan class="cls-237" x="125.65" y="67.37">i</tspan><tspan class="cls-182" x="128.76" y="67.37">t</tspan><tspan class="cls-56" x="132.77" y="67.37">h </tspan><tspan x="47.1" y="84.21">our </tspan><tspan class="cls-145" x="70.27" y="84.21">c</tspan><tspan class="cls-168" x="77" y="84.21">u</tspan><tspan class="cls-38" x="84.46" y="84.21">s</tspan><tspan class="cls-168" x="90.65" y="84.21">t</tspan><tspan class="cls-56" x="94.62" y="84.21">ome</tspan><tspan class="cls-225" x="120.73" y="84.21">r</tspan><tspan class="cls-102" x="125.33" y="84.21">s</tspan><tspan class="cls-97" x="131.75" y="84.21">.</tspan></text>
      </g>
    </g>
    <g>
      <g>
        <use class="cls-65" transform="translate(1080.42 552.67) scale(.88 1.13)" xlink:href="#image-2"/>
        <path class="cls-7" d="M1089.26,606.36c0-23.39,14.77-42.34,32.99-42.34h131.94c18.22,0,32.99,18.96,32.99,42.34v193.19c0,23.39-14.77,42.34-32.99,42.34h-131.94c-18.22,0-32.99-18.96-32.99-42.34v-193.19Z"/>
      </g>
      <g>
        <path class="cls-49" d="M1199.46,647.07c.14.39-.01.59-.09.79-1.24,3.34-2.5,6.67-3.72,10.01-.22.6-.44.74-1.07.51-10.08-3.78-20.17-7.53-30.25-11.31-.25-.09-.7-.05-.6-.57.08-.43.38-.51.75-.57,7.74-1.31,10.97-9.96,5.97-16.02-.28-.34-.33-.61-.17-1.01,2.87-7.68,5.74-15.36,8.59-23.05.2-.54.42-.63.95-.43,10.08,3.77,20.17,7.54,30.26,11.28.56.21.62.45.43.97-2.44,6.5-4.86,13.01-7.28,19.52-.17.47-.5.67-.91.86-3.72,1.69-7.43,3.39-11.15,5.08-.54.24-1.01.56-1.44.97-1.7,1.63-3.41,3.26-5.14,4.87-.43.4-.72.79-.4,1.36.29.52.71.42,1.26.35,2.25-.3,4.52-.5,6.78-.7.8-.07,1.53-.27,2.25-.61,1.63-.78,3.28-1.52,4.97-2.29ZM1195.24,632.61c1.58.59,3.16,1.18,4.75,1.77.62.23,1.19.18,1.46-.5.27-.68-.1-1.11-.72-1.36-.08-.03-.16-.06-.24-.09-3-1.12-6-2.24-9-3.35-.91-.34-1.48-.17-1.69.46-.21.62.11,1.08,1.04,1.43,1.47.55,2.95,1.1,4.42,1.65ZM1198.22,624.74c-1.56-.58-3.12-1.16-4.67-1.75-.62-.24-1.19-.24-1.47.44-.29.72.11,1.15.78,1.4,3.12,1.16,6.23,2.32,9.35,3.49.66.25,1.25.2,1.51-.54.24-.7-.19-1.08-.81-1.3-1.56-.57-3.12-1.16-4.67-1.74ZM1185.94,613.28c-1.56-.58-3.12-1.15-4.67-1.75-.65-.25-1.24-.29-1.51.48-.28.76.19,1.12.84,1.36,3.09,1.14,6.18,2.29,9.26,3.46.66.25,1.26.24,1.53-.49.27-.73-.19-1.12-.86-1.35-1.54-.55-3.06-1.14-4.59-1.71ZM1182.92,621.13c1.56.58,3.12,1.16,4.67,1.75.65.25,1.26.24,1.54-.48.28-.73-.19-1.12-.84-1.36-3.09-1.14-6.18-2.3-9.26-3.45-.63-.24-1.23-.31-1.52.47-.28.76.18,1.13.82,1.37,1.53.57,3.06,1.14,4.59,1.71ZM1181.41,625.2c-1.53-.57-3.06-1.14-4.59-1.71-.65-.25-1.25-.25-1.53.49-.28.76.21,1.12.85,1.36,3.09,1.15,6.17,2.3,9.25,3.45.65.25,1.26.23,1.53-.49.28-.74-.2-1.12-.85-1.36-1.56-.57-3.11-1.16-4.67-1.74ZM1179.21,631.38c-1.53-.57-3.06-1.14-4.59-1.71-.66-.25-1.29-.36-1.61.45-.32.83.26,1.15.91,1.39,3.03,1.13,6.07,2.26,9.1,3.4.66.25,1.32.36,1.62-.44.29-.78-.24-1.16-.91-1.41-1.51-.55-3.01-1.12-4.51-1.68ZM1199.75,620.51c1.56.58,3.12,1.15,4.67,1.75.66.25,1.25.25,1.53-.48.28-.74-.19-1.11-.85-1.35-3.09-1.14-6.18-2.29-9.26-3.45-.66-.25-1.25-.27-1.53.47-.27.73.18,1.12.84,1.36,1.53.56,3.06,1.14,4.59,1.71ZM1179.95,640.63c1.23.46,2.46.91,3.68,1.37.59.22,1.16.34,1.49-.36.29-.62-.02-1.16-.81-1.46-2.45-.92-4.91-1.83-7.36-2.75-.67-.25-1.25-.2-1.5.53-.24.7.18,1.07.81,1.3,1.23.44,2.46.91,3.68,1.37ZM1191.57,638.08c1.12.42,2.24.84,3.36,1.25.6.22,1.13.15,1.38-.49.27-.68-.09-1.12-.72-1.35-2.21-.83-4.42-1.65-6.63-2.47-.6-.22-1.14-.12-1.38.51-.27.67.08,1.11.73,1.34,1.09.4,2.18.81,3.28,1.22ZM1176.78,646.33c.96.36,1.91.71,2.87,1.07.6.23,1.12.14,1.37-.51.26-.64-.03-1.07-.65-1.3-1.94-.72-3.88-1.44-5.82-2.17-.63-.24-1.13-.08-1.35.55-.22.63.09,1.06.7,1.29.96.35,1.91.71,2.87,1.07Z"/>
        <path class="cls-49" d="M1205.95,636.45c-.09-.52.1-.79.21-1.08,2.22-5.96,4.44-11.92,6.66-17.88.53-1.41.41-1.67-1.01-2.2-10.83-4.04-21.65-8.07-32.48-12.11-1.3-.48-1.55-.37-2.02.9-2.88,7.71-5.76,15.42-8.61,23.13-.25.67-.48.97-1.11.42-.04-.04-.11-.05-.15-.08-.43-.29-1.19-.14-1.35-.65-.15-.5.28-1.04.47-1.56,3.1-8.34,6.21-16.68,9.32-25.02.84-2.24,1.47-2.54,3.68-1.71,1.09.41,2.18.83,3.28,1.22.5.17.7.36.48.94-.48,1.29-.33,1.53.95,2.01,8.06,3.01,16.13,6.02,24.2,9.02,1.27.47,1.53.37,2.01-.92.18-.49.38-.62.89-.42,1.33.53,2.68,1,4.01,1.51,1.32.51,1.78,1.48,1.29,2.79-2.43,6.57-4.89,13.13-7.33,19.69-.11.28-.24.5-.54.64-.93.42-1.84.87-2.85,1.36Z"/>
        <path class="cls-49" d="M1205.56,644.29c.15.52-.04.77-.13,1.03-2.05,5.53-4.11,11.05-6.18,16.57-.71,1.91-1.52,2.28-3.43,1.57-11.92-4.44-23.84-8.89-35.77-13.34-1.88-.7-2.22-1.47-1.52-3.36q.53-1.42,2.02-1.05c.17.04.34.11.51.12.47.02.59.18.43.66-.43,1.34-.34,1.49.98,1.98,10.88,4.06,21.77,8.12,32.65,12.17,1.33.5,1.57.39,2.07-.96,1.61-4.32,3.23-8.64,4.82-12.97.23-.63.57-1.01,1.19-1.27.79-.33,1.55-.76,2.35-1.17Z"/>
        <path class="cls-49" d="M1165.74,629.09c3.94,1.47,5.99,5.97,4.52,9.89-1.46,3.91-6.01,5.98-9.91,4.52-4.02-1.51-6.01-5.93-4.49-9.95,1.51-3.99,5.88-5.96,9.88-4.46ZM1159.73,639.52c.27.08.54.1.83-.04,2.67-1.23,5.35-2.44,8.02-3.68.56-.26.73-.74.5-1.31-.25-.61-.74-.68-1.3-.48-.22.08-.43.18-.64.28-1.99.91-3.98,1.8-5.95,2.73-.46.22-.71.22-.9-.31-.19-.55-.48-1.06-.71-1.59-.28-.62-.72-.94-1.39-.63-.67.31-.69.86-.41,1.47.44.95.88,1.9,1.31,2.86.14.31.33.54.65.7Z"/>
        <path class="cls-49" d="M1197.05,605.31c-3.61-1.35-7.21-2.71-10.83-4.02-.62-.23-.79-.48-.48-1.07.14-.26.2-.55.32-.82.67-1.54,1.91-2.1,3.49-1.54,1.59.57,3.17,1.18,4.76,1.77,1.08.4,1.26.33,1.79-.67.85-1.57,2.49-2.23,4.07-1.62,1.62.62,2.39,2.2,1.91,4-.21.78.04,1.22.77,1.48,1.67.61,3.35,1.21,5,1.87,1.88.74,2.43,3.31,1.07,4.78-.29.31-.55.05-.79-.04-3.04-1.12-6.07-2.26-9.1-3.39-.66-.24-1.31-.49-1.97-.73Z"/>
        <path class="cls-49" d="M1221.01,634.7c-.26.64-.78.94-1.35,1.2-4.49,2.04-8.97,4.09-13.45,6.14-4.03,1.84-8.07,3.67-12.09,5.54-.61.29-.85.18-1.06-.42-.2-.58-.45-1.14-.76-1.67-.33-.56-.13-.76.4-1,8.48-3.89,16.96-7.81,25.43-11.71,1.4-.64,2.35-.35,2.83.82.15.37.15.74.06,1.09Z"/>
        <path class="cls-49" d="M1187.84,648.6c.69-.98,1.66-1.68,2.48-2.54.19-.2.33-.16.45.09.3.63.96,1.35.82,1.86-.15.57-1.16.31-1.79.41-.65.1-1.3.3-1.97.15v.02Z"/>
        <path class="cls-49" d="M1187.83,648.58s-.02.04-.03.05c0,0-.03,0-.04-.01.03,0,.06-.01.09-.02,0,0,0-.02,0-.02Z"/>
      </g>
      <g>
        <text class="cls-58" transform="translate(1097.53 691.68)"><tspan class="cls-138" x="0" y="0">A</tspan><tspan class="cls-105" x="14.02" y="0">CC</tspan><tspan class="cls-238" x="43.3" y="0">O</tspan><tspan class="cls-117" x="58.9" y="0">U</tspan><tspan class="cls-165" x="73.82" y="0">N</tspan><tspan class="cls-92" x="89.3" y="0">T</tspan><tspan class="cls-39" x="100.22" y="0">A</tspan><tspan class="cls-188" x="114.44" y="0">B</tspan><tspan x="128.44" y="0">I</tspan><tspan class="cls-57" x="135.34" y="0">L</tspan><tspan class="cls-91" x="147.46" y="0">I</tspan><tspan class="cls-153" x="154.48" y="0">T</tspan><tspan x="167.88" y="0">Y</tspan></text>
        <text class="cls-108" transform="translate(1120.28 714.16)"><tspan class="cls-79" x="0" y="0">W</tspan><tspan x="12.38" y="0">e ta</tspan><tspan class="cls-228" x="34.26" y="0">k</tspan><tspan x="40.74" y="0">e </tspan><tspan class="cls-182" x="51.44" y="0">t</tspan><tspan class="cls-56" x="55.45" y="0">he </tspan><tspan class="cls-131" x="73.84" y="0">c</tspan><tspan x="80.7" y="0">ompl</tspan><tspan class="cls-113" x="110.5" y="0">e</tspan><tspan class="cls-168" x="117.65" y="0">t</tspan><tspan x="121.63" y="0">e </tspan><tspan class="cls-38" x="-21.35" y="16.84">o</tspan><tspan class="cls-155" x="-13.96" y="16.84">w</tspan><tspan x="-3.82" y="16.84">ne</tspan><tspan class="cls-225" x="10.92" y="16.84">r</tspan><tspan class="cls-4" x="15.52" y="16.84">s</tspan><tspan class="cls-56" x="21.64" y="16.84">hip </tspan><tspan class="cls-113" x="43.72" y="16.84">o</tspan><tspan x="51.26" y="16.84">f all our d</tspan><tspan class="cls-131" x="106.1" y="16.84">e</tspan><tspan class="cls-141" x="113.22" y="16.84">c</tspan><tspan class="cls-145" x="120.19" y="16.84">i</tspan><tspan x="123.13" y="16.84">sio</tspan><tspan class="cls-38" x="139.79" y="16.84">n</tspan><tspan x="147.44" y="16.84">s</tspan><tspan x="-11.56" y="33.68">and a</tspan><tspan class="cls-218" x="21.75" y="33.68">c</tspan><tspan x="28.72" y="33.68">tio</tspan><tspan class="cls-38" x="43.2" y="33.68">n</tspan><tspan class="cls-56" x="50.85" y="33.68">s and under no </tspan><tspan class="cls-141" x="-20.78" y="50.53">c</tspan><tspan x="-13.8" y="50.53">i</tspan><tspan class="cls-4" x="-10.8" y="50.53">r</tspan><tspan class="cls-21" x="-6.37" y="50.53">c</tspan><tspan x=".36" y="50.53">u</tspan><tspan class="cls-38" x="7.91" y="50.53">ms</tspan><tspan x="25.69" y="50.53">tan</tspan><tspan class="cls-131" x="44.57" y="50.53">c</tspan><tspan class="cls-137" x="51.43" y="50.53">e</tspan><tspan x="58.64" y="50.53">s </tspan><tspan class="cls-171" x="68.53" y="50.53">r</tspan><tspan x="72.92" y="50.53">un </tspan><tspan class="cls-187" x="91.81" y="50.53">a</tspan><tspan class="cls-133" x="98.73" y="50.53">w</tspan><tspan class="cls-145" x="108.92" y="50.53">a</tspan><tspan x="115.98" y="50.53">y </tspan><tspan class="cls-134" x="126.01" y="50.53">f</tspan><tspan class="cls-184" x="129.6" y="50.53">r</tspan><tspan class="cls-56" x="134.04" y="50.53">om</tspan><tspan x="-4.58" y="67.37">ta</tspan><tspan class="cls-237" x="6.6" y="67.37">k</tspan><tspan x="13.28" y="67.37">ing </tspan><tspan class="cls-182" x="35.29" y="67.37">t</tspan><tspan class="cls-56" x="39.3" y="67.37">he </tspan><tspan class="cls-4" x="57.69" y="67.37">r</tspan><tspan class="cls-137" x="62.12" y="67.37">e</tspan><tspan class="cls-228" x="69.34" y="67.37">s</tspan><tspan class="cls-183" x="75.47" y="67.37">p</tspan><tspan class="cls-56" x="83.29" y="67.37">o</tspan><tspan class="cls-38" x="90.71" y="67.37">n</tspan><tspan x="98.36" y="67.37">si</tspan><tspan class="cls-225" x="107.6" y="67.37">b</tspan><tspan class="cls-97" x="115.37" y="67.37">il</tspan><tspan class="cls-237" x="121.38" y="67.37">i</tspan><tspan class="cls-110" x="124.48" y="67.37">t</tspan><tspan class="cls-114" x="128.96" y="67.37">y</tspan><tspan class="cls-97" x="134.52" y="67.37">.</tspan></text>
      </g>
    </g>
    <g>
      <line class="cls-54" x1="678.67" y1="301.09" x2="678.67" y2="303.59"/>
      <line class="cls-52" x1="678.67" y1="308.45" x2="678.67" y2="422.75"/>
      <line class="cls-54" x1="678.67" y1="425.18" x2="678.67" y2="427.68"/>
      <path class="cls-107" d="M678.67,439.75c-2.11-5.68-5.7-12.73-9.51-17.09l9.51,3.44,9.51-3.44c-3.81,4.37-7.4,11.42-9.51,17.09Z"/>
    </g>
    <g>
      <line class="cls-54" x1="165.78" y1="427.68" x2="165.78" y2="425.18"/>
      <line class="cls-55" x1="165.78" y1="420.39" x2="165.78" y2="365.25"/>
      <polyline class="cls-54" points="165.78 362.86 165.78 360.36 168.28 360.36"/>
      <line class="cls-53" x1="173.26" y1="360.36" x2="1186.57" y2="360.36"/>
      <polyline class="cls-54" points="1189.06 360.36 1191.56 360.36 1191.56 362.86"/>
      <line class="cls-55" x1="1191.56" y1="367.65" x2="1191.56" y2="422.79"/>
      <line class="cls-54" x1="1191.56" y1="425.18" x2="1191.56" y2="427.68"/>
      <path class="cls-107" d="M165.78,439.75c2.11-5.68,5.7-12.73,9.51-17.09l-9.51,3.44-9.51-3.44c3.81,4.37,7.4,11.42,9.51,17.09Z"/>
      <path class="cls-107" d="M1191.56,439.75c-2.11-5.68-5.7-12.73-9.51-17.09l9.51,3.44,9.51-3.44c-3.81,4.37-7.4,11.42-9.51,17.09Z"/>
    </g>
    <g>
      <line class="cls-54" x1="423.89" y1="360.36" x2="423.89" y2="362.86"/>
      <line class="cls-51" x1="423.89" y1="367.56" x2="423.89" y2="421.71"/>
      <line class="cls-54" x1="423.89" y1="424.06" x2="423.89" y2="426.56"/>
      <path class="cls-107" d="M423.89,438.64c-2.11-5.68-5.7-12.73-9.51-17.09l9.51,3.44,9.51-3.44c-3.81,4.37-7.4,11.42-9.51,17.09Z"/>
    </g>
    <g>
      <line class="cls-54" x1="933.44" y1="360.36" x2="933.44" y2="362.86"/>
      <line class="cls-55" x1="933.44" y1="367.65" x2="933.44" y2="422.79"/>
      <line class="cls-54" x1="933.44" y1="425.18" x2="933.44" y2="427.68"/>
      <path class="cls-107" d="M933.44,439.75c-2.11-5.68-5.7-12.73-9.51-17.09l9.51,3.44,9.51-3.44c-3.81,4.37-7.4,11.42-9.51,17.09Z"/>
    </g>
    <g>
      <text class="cls-50" transform="translate(410.17 483.06)"><tspan x="0" y="0">2</tspan></text>
      <text class="cls-48" transform="translate(663.04 483.06)"><tspan x="0" y="0">3</tspan></text>
      <text class="cls-48" transform="translate(161.88 483.06)"><tspan x="0" y="0">1</tspan></text>
      <text class="cls-48" transform="translate(926.9 483.06)"><tspan x="0" y="0">4</tspan></text>
      <text class="cls-48" transform="translate(1178.84 483.06)"><tspan x="0" y="0">5</tspan></text>
      <path class="cls-6" d="M33.44,513.11c0-1.54,1.58-2.79,3.52-2.79h1283.41c1.94,0,3.52,1.25,3.52,2.79v11.17c0,1.54-1.58,2.79-3.52,2.79H36.96c-1.94,0-3.52-1.25-3.52-2.79v-11.17Z"/>
      <image class="cls-236" width="1161" height="19" transform="translate(33.44 510.32) scale(1.11 .88)" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABI4AAAAQCAYAAABwSDS5AAAACXBIWXMAAAn/AAAJ/wEHzD5GAAAB6UlEQVR4nO3dS2/TQBiG0deXqGy7AcSe//+nUBdISIgNiCYpC8/Ek4m7RbJ1jjS1c2nV9aOZz0MWz0k+J3kqry9J3pJcyzXNFQAAAID9GprrkGRMMpX7P0l+JPlev/Cc5GuS17LOWYJRXW+5j0YCEgAAAMD+DN19H47mJKeyXpJ8m5N8yRKM/mYNR208suMIAAAA4DjaHUdj1nDUbiD6mBKOTkl+ZwlHdV3KsuMIAAAA4Bi2dhzVaDRlaURPWZrQh2TZgnRp1rm79uFINAIAAADYr635RrX9jFma0JSlC2XOeiTt0q12zlEiGgEAAAAcQY1HY/feQw+as1aluq4bKxGOAAAAAI5g2Hivnjq7m3k95zEWbQWkRDgCAAAAOII+HA157EK3cFS/MOT9x7IBAAAAcAz9nKP2/q4DzXk/FglHAAAAAMezFYu2+tAtHI1l9RO12yFJjqoBAAAA7N/Wk9XaPlRfZ05yyjo1+618cM7j2bZEPAIAAADYs61oNGZtRKdyP6f8mMr1NjE761CkOiQ7EY0AAAAAjqCNR304qtFoSrl5zfp0tbrjaMr2jiMAAAAA9q/fcVQ3FtVdR7ejaj+TfGp+acr90bVr80cFJAAAAID9aodgt7ONajiq8ejX///XAAAAANiNf+oGhUMxuzpaAAAAAElFTkSuQmCC"/>
      <g>
        <use transform="translate(141.28 490.55) scale(.68)" xlink:href="#image"/>
        <path class="cls-6" d="M147.38,518.62c0-12.14,9.86-21.99,22.01-21.99s22.01,9.84,22.01,21.99-9.86,21.99-22.01,21.99-22.01-9.84-22.01-21.99h0Z"/>
      </g>
      <g>
        <use transform="translate(393.28 490.55) scale(.68)" xlink:href="#image"/>
        <path class="cls-6" d="M399.38,518.62c0-12.14,9.86-21.99,22.01-21.99s22.01,9.84,22.01,21.99-9.86,21.99-22.01,21.99-22.01-9.84-22.01-21.99h0Z"/>
      </g>
      <g>
        <use transform="translate(646.61 490.55) scale(.68)" xlink:href="#image-3"/>
        <path class="cls-6" d="M652.71,518.62c0-12.14,9.86-21.99,22.01-21.99s22.01,9.84,22.01,21.99-9.86,21.99-22.01,21.99-22.01-9.84-22.01-21.99h0Z"/>
      </g>
      <g>
        <use transform="translate(910.61 490.55) scale(.68)" xlink:href="#image-3"/>
        <path class="cls-6" d="M916.71,518.62c0-12.14,9.86-21.99,22.01-21.99s22.01,9.84,22.01,21.99-9.86,21.99-22.01,21.99-22.01-9.84-22.01-21.99h0Z"/>
      </g>
      <g>
        <use transform="translate(1162.61 490.55) scale(.68)" xlink:href="#image-3"/>
        <path class="cls-6" d="M1168.71,518.62c0-12.14,9.86-21.99,22.01-21.99s22.01,9.84,22.01,21.99-9.86,21.99-22.01,21.99-22.01-9.84-22.01-21.99h0Z"/>
      </g>
      <circle class="cls-49" cx="169.39" cy="518.85" r="7.7"/>
      <circle class="cls-59" cx="421.39" cy="518.85" r="7.7"/>
      <circle class="cls-49" cx="674.72" cy="518.85" r="7.7"/>
      <circle class="cls-49" cx="938.72" cy="518.85" r="7.7"/>
      <circle class="cls-49" cx="1190.72" cy="518.85" r="7.7"/>
    </g>
  </g>


      </svg>
    </div>
  </div>
</section>



      {/* OUR JOURNEY Section */}
      <section 
        id="our-journey" 
        style={{
          position: 'relative',
          padding: '80px 40px 100px 40px',
          minHeight: '60vh',
          overflow: 'hidden',
          background: '#ffffff',
          display: isSectionVisible('our-journey') ? 'block' : 'none'
        }}
      >
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
          backgroundSize: '80% auto',
          opacity: 0.3,
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
            gap: '25px'
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
              fontWeight: '700',
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
              margin: 0,
              textAlign: 'justify',
              fontWeight: '700',
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
        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1400px',
          margin: '60px auto 0',
          display: 'flex',
          gap: '60px',
          alignItems: 'flex-start'
        }}>
          {/* Left Side - Empty */}
          <div style={{ flex: '1' }}></div>

          {/* Right Side - Teal Box */}
          <div style={{
            flex: '1',
            background: '#0095AA',
            borderRadius: '15px',
            padding: '40px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
          }}>
            {/* Main Text */}
            <p style={{ fontSize: '1.1rem', color: '#ffffff', maxWidth: '800px', lineHeight: '1.7', margin: '0 0 20px 0' }}>
              Today, Unified stands as a trusted PT partner across multiple regions, delivering systems aligned with modern engineering requirements and the evolving expectations of India's construction industry.
            </p>

            {/* Explore Our Projects Heading */}
            <h3 style={{
              fontSize: '0.9rem',
              fontWeight: '700',
              color: '#ffffff',
              margin: '0 0 20px 0',
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
                  gap: '12px',
                  background: '#ffffff',
                  color: '#0095AA',
                  padding: '14px 28px',
                  borderRadius: '50px',
                  border: 'none',
                  fontSize: '20px',
                  fontWeight: '900',
                  fontFamily: "'DM Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                }}
              >
                <span>Visit Projects</span>
                <div style={{
                  width: '28px',
                  height: '28px',
                  background: '#0095AA',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.3s ease'
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sliding Banner - BUILT ON ENGINEERING DELIVERED WITH CERTAINTY */}
      <section style={{
        position: 'relative',
        width: '100%',
        background: '#ffffff',
        padding: '30px 0',
        overflow: 'hidden',
        display: !currentHash ? 'block' : 'none'
      }}>
        <div style={{
          display: 'flex',
          width: 'fit-content',
          animation: 'slideBanner 20s linear infinite'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '30px',
            whiteSpace: 'nowrap',
            padding: '0 50px'
          }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '30px'
              }}>
                <img 
                  src="/assets/icon.png" 
                  alt="Icon"
                  style={{
                    width: '4.8rem',
                    height: '5rem',
                    animation: 'rotateAsterisk 2s linear infinite',
                    display: 'inline-block',
                    objectFit: 'contain',
                    verticalAlign: 'middle',
                    marginTop: '0.5rem'
                  }}
                />
                <span style={{
                  fontSize: '4.2rem',
                  fontWeight: '700',
                  letterSpacing: '2px',
                  fontFamily: 'Anton, sans-serif',
                  display: 'inline-block'
                }}>
                  {'BUILT ON ENGINEERING DELIVERED WITH CERTAINTY  '.split('').map((char, idx) => (
                    <span
                      key={idx}
                      className="banner-letter-hover"
                      style={{
                        color: '#9ca3af',
                        transition: 'color 0.3s ease',
                        display: 'inline-block'
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes slideBanner {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        @keyframes rotateAsterisk {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .banner-letter-hover:hover {
          color: #0095AA !important;
        }
      `}</style>

      {/* Vision Values Mission Section */}
      

      {/* PROJECT REACH PORTFOLIO Section */}
      <section 
        id="project-reach-portfolio" 
        style={{ 
          padding: '0', 
          minHeight: '100vh', 
          backgroundColor: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 1,
          display: isSectionVisible('project-reach-portfolio') ? 'block' : 'none'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 40px 0 40px', marginBottom: '40px' }}>
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0095AA', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>
              GEOGRAPHICAL PRESENCE
            </h3>
            <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#1a252f', marginBottom: '20px' }}>
              WHERE WE <span style={{ color: '#0095AA' }}>OPERATE</span>
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#4a5568', maxWidth: '800px', lineHeight: '1.7' }}>
              Unified has executed and managed post-tensioning projects across key construction markets in India. Click on the pins to explore our regional impact.
            </p>
          </div>
        </div>

        <div style={{ 
          width: '100%', 
          height: 'calc(100vh - 250px)', 
          minHeight: '650px',
          position: 'relative',
          background: '#f8fafc',
          borderTop: '1px solid #e2e8f0'
        }}>
          <div 
            ref={mapRef} 
            style={{ 
              height: '100%', 
              width: '100%', 
              zIndex: 1,
              cursor: 'grab'
            }}
          ></div>

          <div style={{
            position: 'absolute',
            top: '40px',
            right: '40px',
            width: '380px',
            zIndex: 900,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {activeCity ? (
              <div style={{
                background: 'rgba(255, 255, 255, 0.98)',
                borderRadius: '30px',
                padding: '30px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                border: '1px solid #ffffff',
                pointerEvents: 'auto',
                animation: 'fadeIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}>
                <div style={{ position: 'relative', height: '200px', marginBottom: '20px', borderRadius: '20px', overflow: 'hidden' }}>
                  <img src={activeCity.image} alt={activeCity.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1a252f', margin: 0 }}>{activeCity.name}</h3>
                  <span style={{ fontSize: '10px', fontWeight: '800', padding: '5px 10px', borderRadius: '8px', background: 'rgba(0,149,170,0.1)', color: '#0095AA', textTransform: 'uppercase' }}>{activeCity.type}</span>
                </div>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#4a5568', marginBottom: '20px' }}>{activeCity.description}</p>
                <button 
                  onClick={closePanel}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    background: '#0095AA', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '12px', 
                    fontWeight: '700', 
                    cursor: 'pointer'
                  }}
                >
                  RESET MAP VIEW
                </button>
              </div>
            ) : (
              <>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '25px',
                  padding: '25px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(255,255,255,0.5)',
                  pointerEvents: 'auto'
                }}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1a252f', marginBottom: '10px' }}>Interactive Portfolio</h4>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>Explore our project impact across major Indian hubs. Click any pin for city-specific data.</p>
                </div>

                <div style={{
                  background: 'linear-gradient(135deg, #1a252f 0%, #2d3748 100%)',
                  borderRadius: '25px',
                  padding: '30px',
                  color: 'white',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  pointerEvents: 'auto'
                }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#0095AA', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>
                    Global Outreach:
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: '900' }}>AFRICA — 02%</div>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '10px', lineHeight: '1.5' }}>Specialised structural execution and engineering consultancy services.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* LEADERSHIP Section */}
      <section 
        id="leadership" 
        style={{
          position: 'relative',
          padding: '20px 40px 10px 40px',
          minHeight: '60vh',
          overflow: 'hidden',
          background: '#ffffff',
          display: isSectionVisible('leadership') ? 'block' : 'none'
        }}
      >

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 40px'
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: '900',
            color: '#1a2a5e',
            fontFamily: 'Anton, sans-serif',
            margin: '0 auto 0px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textAlign: 'center'
          }}>
            LEADERSHIP
          </h2>
          
          <p style={{
            fontSize: '1.2rem',
            color: '#1a1a1a',
            lineHeight: '1.8',
            maxWidth: '1000px',
            margin: '0 auto 10px',
            fontFamily: 'Segoe UI, sans-serif',
            fontWeight: '600',
            textAlign: 'center'
          }}>
            Unified's leadership combines technical governance, execution discipline, and strategic planning. Each director operates with clearly defined accountability, ensuring quality, coordination, and consistency across every project.
          </p>

          {/* Urvesh Shah Profile Section */}
          <div style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            gap: '40px',
            minHeight: '600px',
          }}>
            {/* Left Side - Image */}
            <div style={{
              flex: '0 0 35%',
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: 'flex-end',
              overflow: 'visible',
              marginLeft: '-40px',
              marginTop: '-5px'
            }}>
              {/* Background Text - URVESH SHAH */}
              <div style={{
                position: 'absolute',
                top: '60px',
                left: '20px',
                fontSize: 'clamp(4rem, 8vw, 7rem)',
                fontWeight: '900',
                color: 'rgba(0, 0, 0, 0.05)',
                fontFamily: 'Anton, sans-serif',
                letterSpacing: '5px',
                textTransform: 'uppercase',
                zIndex: 0,
                pointerEvents: 'none',
                lineHeight: '1.2',
                whiteSpace: 'nowrap',
                width: 'max-content'
              }}>
                URVESH SHAH
              </div>
              <div style={{
                width: '100%',
                overflow: 'hidden',
                position: 'relative',
                zIndex: 1
              }}>
                <img 
                  src="/assets/Urvesh sir.png" 
                  alt="Urvesh Shah"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>
            </div>

            {/* Right Side - Text Content */}
            <div style={{
              flex: '1',
              padding: '150px 20px 60px 180px',
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              {/* Name */}
              <h3 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '900',
                color: '#1a2a5e',
                fontFamily: 'Anton, sans-serif',
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>
                URVESH SHAH
              </h3>

              {/* Title */}
              <p style={{
                fontSize: '1.15rem',
                color: '#0095AA',
                margin: '0 0 20px 0',
                fontFamily: 'Segoe UI, sans-serif',
                lineHeight: '1',
                fontWeight: '900'
              }}>
                Director - Business Development & Technical Strategy
              </p>

              {/* Role & Responsibilities */}
              <div style={{ marginBottom: '10px' }}>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '900',
                  color: '#1a1a1a',
                  margin: '0 0 5px 0',
                  fontFamily: 'Segoe UI, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Role & Responsibilities:
                </h4>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  <li style={{
                    fontSize: '1.05rem',
                    color: '#333',
                    paddingLeft: '20px',
                    position: 'relative',
                    fontFamily: 'Segoe UI, sans-serif',
                    fontWeight: '700'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: '#0095AA',
                      fontWeight: 'bold'
                    }}>•</span>
                    Leads client engagement, marketing, and business development
                  </li>
                  <li style={{
                    fontSize: '1.05rem',
                    color: '#333',
                    paddingLeft: '20px',
                    position: 'relative',
                    fontFamily: 'Segoe UI, sans-serif',
                    fontWeight: '700'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: '#0095AA',
                      fontWeight: 'bold'
                    }}>•</span>
                    Aligns project requirements with technical execution teams
                  </li>
                  <li style={{
                    fontSize: '1.05rem',
                    color: '#333',
                    paddingLeft: '20px',
                    position: 'relative',
                    fontFamily: 'Segoe UI, sans-serif',
                    fontWeight: '700'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: '#0095AA',
                      fontWeight: 'bold'
                    }}>•</span>
                    Manages material planning, sequencing, and logistics
                  </li>
                  <li style={{
                    fontSize: '1.05rem',
                    color: '#333',
                    lineHeight: '1.4',
                    marginBottom: '12px',
                    paddingLeft: '20px',
                    position: 'relative',
                    fontFamily: 'Segoe UI, sans-serif',
                    fontWeight: '700'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: '#0095AA',
                      fontWeight: 'bold'
                    }}>•</span>
                    Builds long-term partnerships with developers and consultants
                  </li>
                </ul>
              </div>

              {/* Experience */}
              <div>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '900',
                  color: '#1a1a1a',
                  margin: '0 0 5px 0',
                  fontFamily: 'Segoe UI, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Experience:
                </h4>
                <p style={{
                  fontSize: '1.05rem',
                  color: '#333',
                  lineHeight: '1.4',
                  margin: 0,
                  fontFamily: 'Segoe UI, sans-serif',
                  fontWeight: '700'
                }}>
                  X years of expertise in post-tensioning systems, client handling, and project coordination bridging technical intent with commercial execution.
                </p>
              </div>
            </div>
          </div>

          {/* Sachin Patil Profile Section */}
          <div style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            gap: '40px',
            marginTop: '80px'
          }}>
            {/* Left Side - Text Content */}
            <div style={{
              flex: '1',
              padding: '0px 80px 60px 50px',
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}>
              {/* Name */}
              <h3 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '900',
                color: '#1a2a5e',
                fontFamily: 'Anton, sans-serif',
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>
                SACHIN PATIL
              </h3>

              {/* Title */}
              <p style={{
                fontSize: '1.15rem',
                color: '#0095AA',
                margin: '0 0 20px 0',
                fontFamily: 'Segoe UI, sans-serif',
                lineHeight: '1',
                fontWeight: '900'
              }}>
                Director - Quality Assurance & Technical Compliance
              </p>

              {/* Role & Responsibilities */}
              <div style={{ marginBottom: '10px' }}>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '900',
                  color: '#1a1a1a',
                  margin: '0 0 5px 0',
                  fontFamily: 'Segoe UI, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Role & Responsibilities:
                </h4>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  <li style={{
                    fontSize: '1.05rem',
                    color: '#333',
                    paddingLeft: '20px',
                    position: 'relative',
                    fontFamily: 'Segoe UI, sans-serif',
                    fontWeight: '700'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: '#0095AA',
                      fontWeight: 'bold'
                    }}>•</span>
                    Ensures material traceability, testing, and code compliance
                  </li>
                  <li style={{
                    fontSize: '1.05rem',
                    color: '#333',
                    paddingLeft: '20px',
                    position: 'relative',
                    fontFamily: 'Segoe UI, sans-serif',
                    fontWeight: '700'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: '#0095AA',
                      fontWeight: 'bold'
                    }}>•</span>
                    Reviews PT layouts, anchorage zones, and stressing data
                  </li>
                  <li style={{
                    fontSize: '1.05rem',
                    color: '#333',
                    paddingLeft: '20px',
                    position: 'relative',
                    fontFamily: 'Segoe UI, sans-serif',
                    fontWeight: '700'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: '#0095AA',
                      fontWeight: 'bold'
                    }}>•</span>
                    Implements QA/QC systems across all active sites
                  </li>
                  <li style={{
                    fontSize: '1.05rem',
                    color: '#333',
                    lineHeight: '1.4',
                    marginBottom: '12px',
                    paddingLeft: '20px',
                    position: 'relative',
                    fontFamily: 'Segoe UI, sans-serif',
                    fontWeight: '700'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: '#0095AA',
                      fontWeight: 'bold'
                    }}>•</span>
                    Leads technical training for supervisors and site teams
                  </li>
                </ul>
              </div>

              {/* Experience */}
              <div>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '900',
                  color: '#1a1a1a',
                  margin: '0 0 5px 0',
                  fontFamily: 'Segoe UI, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Experience:
                </h4>
                <p style={{
                  fontSize: '1.05rem',
                  color: '#333',
                  lineHeight: '1.4',
                  margin: 0,
                  fontFamily: 'Segoe UI, sans-serif',
                  fontWeight: '700'
                }}>
                  Over X years in PT quality control, system inspection, stressing documentation, and compliance management across bonded and unbonded systems.
                </p>
              </div>
            </div>

            {/* Right Side - Image */}
            <div style={{
              flex: '0 0 45%',
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: 'flex-start',
              overflow: 'visible',
              marginRight: '-40px',
              marginTop: '-30px',
              marginLeft: '-80px'
            }}>
              {/* Background Text - SACHIN PATIL */}
              <div style={{
                position: 'absolute',
                right: '20px',
                fontSize: 'clamp(4rem, 8vw, 7rem)',
                fontWeight: '900',
                color: 'rgba(0, 0, 0, 0.05)',
                fontFamily: 'Anton, sans-serif',
                letterSpacing: '5px',
                textTransform: 'uppercase',
                zIndex: 0,
                pointerEvents: 'none',
                lineHeight: '1.2',
                whiteSpace: 'nowrap',
                width: 'max-content'
              }}>
                SACHIN PATIL
              </div>
              <div style={{
                width: '100%',
                overflow: 'hidden',
                position: 'relative',
                zIndex: 1,
                marginLeft: '-60px'
              }}>
                <img 
                  src="/assets/Sachin sir.png" 
                  alt="Sachin Patil"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Akshay Patel Profile Section */}
          <div style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            gap: '40px',
            minHeight: '600px',
            marginTop: '40px',
            marginLeft: '30px'
          }}>
            {/* Left Side - Image */}
            <div style={{
              flex: '0 0 35%',
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: 'flex-end',
              overflow: 'visible',
              marginLeft: '-10px',
              marginTop: '-5px'
            }}>
              {/* Background Text - AKSHAY PATEL */}
              <div style={{
                position: 'absolute',
                top: '60px',
                left: '20px',
                fontSize: 'clamp(4rem, 8vw, 7rem)',
                fontWeight: '900',
                color: 'rgba(0, 0, 0, 0.05)',
                fontFamily: 'Anton, sans-serif',
                letterSpacing: '5px',
                textTransform: 'uppercase',
                zIndex: 0,
                pointerEvents: 'none',
                lineHeight: '1.2',
                whiteSpace: 'nowrap',
                width: 'max-content'
              }}>
                AKSHAY PATEL
              </div>
              <div style={{
                width: '100%',
                overflow: 'hidden',
                position: 'relative',
                zIndex: 1,
                marginTop: '-30px'
              }}>
                <img 
                  src="/assets/Akshay sir.png" 
                  alt="Akshay Patel"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    display: 'block',
                    marginLeft: '70px'
                  }}
                />
              </div>
            </div>

            {/* Right Side - Text Content */}
            <div style={{
              flex: '1',
              padding: '80px 20px 60px 160px',
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              {/* Name */}
              <h3 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '900',
                color: '#1a2a5e',
                fontFamily: 'Anton, sans-serif',
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>
                AKSHAY PATEL
              </h3>

              {/* Title */}
              <p style={{
                fontSize: '1.15rem',
                color: '#0095AA',
                margin: '0 0 20px 0',
                fontFamily: 'Segoe UI, sans-serif',
                lineHeight: '1',
                fontWeight: '900'
              }}>
                Director - Operations & Execution
              </p>

              {/* Role & Responsibilities */}
              <div style={{ marginBottom: '10px' }}>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '900',
                  color: '#1a1a1a',
                  margin: '0 0 5px 0',
                  fontFamily: 'Segoe UI, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Role & Responsibilities:
                </h4>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  <li style={{
                    fontSize: '1.05rem',
                    color: '#333',
                    paddingLeft: '20px',
                    position: 'relative',
                    fontFamily: 'Segoe UI, sans-serif',
                    fontWeight: '700'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: '#0095AA',
                      fontWeight: 'bold'
                    }}>•</span>
                    Leads PT execution teams across all sites
                  </li>
                  <li style={{
                    fontSize: '1.05rem',
                    color: '#333',
                    paddingLeft: '20px',
                    position: 'relative',
                    fontFamily: 'Segoe UI, sans-serif',
                    fontWeight: '700'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: '#0095AA',
                      fontWeight: 'bold'
                    }}>•</span>
                    Ensures compliance with drawings and stressing protocols
                  </li>
                  <li style={{
                    fontSize: '1.05rem',
                    color: '#333',
                    paddingLeft: '20px',
                    position: 'relative',
                    fontFamily: 'Segoe UI, sans-serif',
                    fontWeight: '700'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: '#0095AA',
                      fontWeight: 'bold'
                    }}>•</span>
                    Oversees quality checks, safety practices, and delivery timelines
                  </li>
                  <li style={{
                    fontSize: '1.05rem',
                    color: '#333',
                    lineHeight: '1.4',
                    marginBottom: '12px',
                    paddingLeft: '20px',
                    position: 'relative',
                    fontFamily: 'Segoe UI, sans-serif',
                    fontWeight: '700'
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: '#0095AA',
                      fontWeight: 'bold'
                    }}>•</span>
                    Coordinates with contractors and structural consultants
                  </li>
                </ul>
              </div>

              {/* Experience */}
              <div>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '900',
                  color: '#1a1a1a',
                  margin: '0 0 5px 0',
                  fontFamily: 'Segoe UI, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Experience:
                </h4>
                <p style={{
                  fontSize: '1.05rem',
                  color: '#333',
                  lineHeight: '1.4',
                  margin: 0,
                  fontFamily: 'Segoe UI, sans-serif',
                  fontWeight: '700'
                }}>
                  Over X years in on-site execution of bonded and unbonded PT systems, managing complex slab cycles and field operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATION Section */}
      <section 
        id="certification" 
        style={{
          position: 'relative',
          padding: '20px 40px 100px 40px',
          minHeight: '60vh',
          overflow: 'hidden',
          background: '#ffffff',
          display: isSectionVisible('certification') ? 'block' : 'none'
        }}
      >

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 40px'
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: '900',
            color: '#1a2a5e',
            fontFamily: 'Anton, sans-serif',
            margin: '0 auto 60px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textAlign: 'center'
          }}>
            CERTIFICATION
          </h2>

          {/* Main Content - Text Left, Image Right */}
          <div style={{
            display: 'flex',
            gap: '60px',
            alignItems: 'flex-start',
            marginBottom: '60px'
          }}>
            {/* Left Side - Text Content */}
            <div style={{
              flex: '1',
              display: 'flex',
              flexDirection: 'column',
              gap: '25px'
            }}>
              <p style={{
                fontSize: '1.1rem',
                color: '#333',
                margin: 0,
                fontFamily: 'Segoe UI, sans-serif',
                fontWeight: '600'
              }}>
                <strong>Unified Post-Tensioning Systems LLP</strong> operates under a structured Quality Management System aligned with <strong>ISO 9001:2015</strong> standards.
              </p>

              <p style={{
                fontSize: '1.1rem',
                color: '#333',
                margin: 0,
                fontFamily: 'Segoe UI, sans-serif',
                fontWeight: '600'
              }}>
                Our processes are built to ensure consistency, traceability, and engineering accountability across design, material handling, site execution, and project handover.
              </p>

              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1a2a5e',
                margin: '20px 0 15px 0',
                fontFamily: 'Segoe UI, sans-serif'
              }}>
                Quality Policy
              </h3>

              <p style={{
                fontSize: '1.1rem',
                color: '#333',
                margin: 0,
                fontFamily: 'Segoe UI, sans-serif',
                fontWeight: '600'
              }}>
                At Unified, quality is not treated as documentation compliance – it is embedded into how we design, plan, execute, and review every post-tensioning system.
              </p>

              <p style={{
                fontSize: '1.1rem',
                color: '#333',
                margin: 0,
                fontFamily: 'Segoe UI, sans-serif',
                fontWeight: '600'
              }}>
                We are committed to delivering dependable post-tensioning solutions by:
              </p>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <li style={{
                  fontSize: '1.1rem',
                  color: '#333',
                  paddingLeft: '30px',
                  position: 'relative',
                  fontFamily: 'Segoe UI, sans-serif',
                  fontWeight: '600'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    color: '#0095AA',
                    fontSize: '1.2rem'
                  }}>✓</span>
                  Clearly understanding project-specific structural and execution requirements
                </li>
                <li style={{
                  fontSize: '1.1rem',
                  color: '#333',
                  paddingLeft: '30px',
                  position: 'relative',
                  fontFamily: 'Segoe UI, sans-serif',
                  fontWeight: '600'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    color: '#0095AA',
                    fontSize: '1.2rem'
                  }}>✓</span>
                  Providing technically appropriate, engineer-approved PT system solutions
                </li>
                <li style={{
                  fontSize: '1.1rem',
                  color: '#333',
                  paddingLeft: '30px',
                  position: 'relative',
                  fontFamily: 'Segoe UI, sans-serif',
                  fontWeight: '600'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    color: '#0095AA',
                    fontSize: '1.2rem'
                  }}>✓</span>
                  Supplying certified, durable materials with controlled quality checks
                </li>
                <li style={{
                  fontSize: '1.1rem',
                  color: '#333',
                  paddingLeft: '30px',
                  position: 'relative',
                  fontFamily: 'Segoe UI, sans-serif',
                  fontWeight: '600'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    color: '#0095AA',
                    fontSize: '1.2rem'
                  }}>✓</span>
                  Adhering to applicable codes, standards, and consultant specifications
                </li>
                <li style={{
                  fontSize: '1.1rem',
                  color: '#333',
                  paddingLeft: '30px',
                  position: 'relative',
                  fontFamily: 'Segoe UI, sans-serif',
                  fontWeight: '600'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    color: '#0095AA',
                    fontSize: '1.2rem'
                  }}>✓</span>
                  Maintaining disciplined execution practices at site level
                </li>
                <li style={{
                  fontSize: '1.1rem',
                  color: '#333',
                  paddingLeft: '30px',
                  position: 'relative',
                  fontFamily: 'Segoe UI, sans-serif',
                  fontWeight: '600'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    color: '#0095AA',
                    fontSize: '1.2rem'
                  }}>✓</span>
                  Continuously improving processes based on audits, feedback, and performance reviews
                </li>
              </ul>
            </div>

            {/* Right Side - ISO Logo */}
            <div style={{
              flex: '0 0 400px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingTop: '20px'
            }}>
              <img 
                src="/assets/iso-certified-company-stamp-logo-png_seeklogo-556487.png" 
                alt="ISO Certified Company"
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  height: 'auto',
                  objectFit: 'contain'
                }}
              />
            </div>
          </div>

          {/* Footer Line */}
          <div style={{
            borderTop: '1px solid #e2e8f0',
            paddingTop: '40px',
            marginTop: '40px',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '1.2rem',
              color: '#9ca3af',
              fontFamily: 'Anton, sans-serif',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              margin: 0,
              fontWeight: '400'
            }}>
              CERTIFIED SYSTEMS. DISCIPLINED EXECUTION. MEASURABLE OUTCOMES.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs
