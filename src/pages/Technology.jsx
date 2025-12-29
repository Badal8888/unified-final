import { useEffect, useState } from 'react';

const Technology = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [currentHash, setCurrentHash] = useState('');
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'overview';
  
      setCurrentHash(hash);
      setActiveSection(hash);
  
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    };
  
    // initial load
    handleHashChange();
  
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  

  const scrollToSection = (id) => {
    window.location.hash = id;
    setActiveSection(id);

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isSectionVisible = (id) => {
    if (!currentHash) return true;
    return currentHash === id;
  };

  /* ================= JSX ================= */

  return (
    <>
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
          key={currentHash === 'overview' ? 'overview-video' : currentHash === 'prestressed-systems' ? 'prestressed-systems-video' : currentHash === 'post-tensioned-systems' ? 'post-tensioned-systems-video' : currentHash === 'bonded-tensioned-systems' ? 'bonded-tensioned-systems-video' : currentHash === 'unbonded-tensioned-systems' ? 'unbonded-tensioned-systems-video' : currentHash === 'structural-geometry' ? 'structural-geometry-video' : currentHash === 'faq' ? 'faq-video' : 'aboutus-video'}
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
            currentHash === 'overview' ? "/assets/Overview-bg-video.mp4" :
            currentHash === 'prestressed-systems' ? "/assets/PRESTRESSED-SYSTEMS.mp4" :
            currentHash === 'post-tensioned-systems' ? "/assets/Post-Tensioned-bg-video.mp4" :
            currentHash === 'bonded-tensioned-systems' ? "/assets/Bonded-Tensioned-bg-video.mp4" :
            currentHash === 'unbonded-tensioned-systems' ? "/assets/Unbonded-Tensioned-bg-video.mp4" :
            currentHash === 'structural-geometry' ? "/assets/Structural-Geometry-bg-video.mp4" :
            currentHash === 'faq' ? "/assets/FAQ-bg-video.mp4" :
            "/assets/Overview-bg-video.mp4"
          } type="video/mp4" />
        </video>

        {/* Overlay Layer */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 149, 170, 0.7)',
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
          {currentHash === 'overview' ? 'OVERVIEW' :
           currentHash === 'prestressed-systems' ? 'PRESTRESSING' :
           currentHash === 'post-tensioned-systems' ? 'POST-TENSIONED SYSTEMS' :
           currentHash === 'bonded-tensioned-systems' ? 'BONDED-TENSIONED SYSTEMS' :
           currentHash === 'unbonded-tensioned-systems' ? 'UNBONDED-TENSIONED SYSTEMS' :
           currentHash === 'structural-geometry' ? 'STRUCTURAL GEOMETRY' :
           currentHash === 'faq' ? 'FAQ' :
           'OVERVIEW'}
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
            onClick={() => scrollToSection('overview')}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === 'overview' ? '#0095AA' : '#000000',
              fontSize: '1.2rem',
              fontWeight: activeSection === 'overview' ? '700' : '600',
              cursor: 'pointer',
              padding: '5px 10px',
              fontFamily: 'sans-serif',
              transition: 'all 0.3s ease'
            }}
          >
                OVERVIEW
          </button>
          <span style={{ color: '#0095AA', fontSize: '1.2rem' }}>-</span>
          <button 
            onClick={() => scrollToSection('prestressed-systems')}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === 'prestressed-systems' ? '#0095AA' : '#000000',
              fontSize: '1.2rem',
              fontWeight: activeSection === 'prestressed-systems' ? '700' : '600',
              cursor: 'pointer',
              padding: '5px 10px',
              fontFamily: 'sans-serif',
              transition: 'all 0.3s ease'
            }}
          >
            PRESTRESSING
          </button>
          <span style={{ color: '#0095AA', fontSize: '1.2rem' }}>-</span>
          <button 
            onClick={() => scrollToSection('post-tensioned-systems')}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === 'post-tensioned-systems' ? '#0095AA' : '#000000',
              fontSize: '1.2rem',
              fontWeight: activeSection === 'post-tensioned-systems' ? '700' : '600',
              cursor: 'pointer',
              padding: '5px 10px',
              fontFamily: 'sans-serif',
              transition: 'all 0.3s ease'
            }}
          >
            POST-TENSIONING
          </button>
          <span style={{ color: '#0095AA', fontSize: '1.2rem' }}>-</span>
          <button 
            onClick={() => scrollToSection('bonded-tensioned-systems')}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === 'bonded-tensioned-systems' ? '#0095AA' : '#000000',
              fontSize: '1.2rem',
              fontWeight: activeSection === 'bonded-tensioned-systems' ? '700' : '600',
              cursor: 'pointer',
              padding: '5px 10px',
              fontFamily: 'sans-serif',
              transition: 'all 0.3s ease'
            }}
          >
            BONDED PTS
          </button>
          <span style={{ color: '#0095AA', fontSize: '1.2rem' }}>-</span>
          <button 
            onClick={() => scrollToSection('unbonded-tensioned-systems')}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === 'unbonded-tensioned-systems' ? '#0095AA' : '#000000',
              fontSize: '1.2rem',
              fontWeight: activeSection === 'unbonded-tensioned-systems' ? '700' : '600',
              cursor: 'pointer',
              padding: '5px 10px',
              fontFamily: 'sans-serif',
              transition: 'all 0.3s ease'
            }}
          >
            UNBONDED PTS
          </button>
          <span style={{ color: '#0095AA', fontSize: '1.2rem' }}>-</span>
          <button 
            onClick={() => scrollToSection('structural-geometry')}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === 'structural-geometry' ? '#0095AA' : '#000000',
              fontSize: '1.2rem',
              fontWeight: activeSection === 'structural-geometry' ? '700' : '600',
              cursor: 'pointer',
              padding: '5px 10px',
              fontFamily: 'sans-serif',
              transition: 'all 0.3s ease'
            }}
          >
          GEOMETRIES
          </button>
          <span style={{ color: '#0095AA', fontSize: '1.2rem' }}>-</span>
          <button 
            onClick={() => scrollToSection('faq')}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === 'faq' ? '#0095AA' : '#000000',
              fontSize: '1.2rem',
              fontWeight: activeSection === 'faq' ? '700' : '600',
              cursor: 'pointer',
              padding: '5px 10px',
              fontFamily: 'sans-serif',
              transition: 'all 0.3s ease'
            }}
          >
            FAQ'S
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
      <section
  id="overview"
  style={{
    position: 'relative',
    padding: '60px 40px 100px 40px',
    minHeight: '60vh',
    overflow: 'hidden',
    display: isSectionVisible('overview') ? 'block' : 'none'
  }}
>

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
    OVERVIEW
  </h2>

  {/* Content */}
  <div
    style={{
      position: 'relative',
      zIndex: 1,
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center'
    }}
  >
    {/* Right Side - Text Content */}
    <div style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            marginLeft: '100px'
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
    {/* Video */}
    <div
      style={{
        flex: '0.8',
        overflow: 'hidden',
      }}
    >
      <img
  src="/assets/overview-img.jpeg"
  alt="Overview"
  style={{
    width: '100%',
    height: '520px',   // 🔥 yahin size bada
    objectFit: 'cover',
    display: 'block'
  }}
/>
    </div>
        </div>
</section>

      <section id="prestressed-systems"
      style={{
        position: 'relative',
        padding: '60px 40px 100px 40px',
        minHeight: '60vh',
        overflow: 'hidden',
        display: isSectionVisible('prestressed-systems') ? 'block' : 'none'
      }}>
        
        {/* Overlay */}
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
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
    OUR CORE EXPERTISE
  </h2>

  <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1194.85 578.67">
  <defs>
    <style>{`
      .cls-1 {
        letter-spacing: 0em;
      }

      .cls-2 {
        letter-spacing: .02em;
      }

      .cls-3 {
        letter-spacing: 0em;
      }

      .cls-4 {
        letter-spacing: 0em;
      }

      .cls-5 {
        letter-spacing: 0em;
      }

      .cls-6, .cls-7, .cls-8 {
        fill: #231f20;
      }

      .cls-6, .cls-9 {
        font-size: 30.68px;
      }

      .cls-6, .cls-9, .cls-8 {
        font-family: AcuminConcept-Bold, 'Acumin Variable Concept';
        font-variation-settings: 'wght' 700, 'wdth' 100, 'slnt' 0;
        font-weight: 700;
      }

      .cls-10 {
        letter-spacing: -.06em;
      }

      .cls-11 {
        letter-spacing: 0em;
      }

      .cls-12 {
        letter-spacing: 0em;
      }

      .cls-13 {
        letter-spacing: 0em;
      }

      .cls-14 {
        letter-spacing: -.01em;
      }

      .cls-15 {
        letter-spacing: 0em;
      }

      .cls-7 {
        font-family: AcuminConcept-MediumItalic, 'Acumin Variable Concept';
        font-size: 17.89px;
        font-style: italic;
        font-variation-settings: 'wght' 500, 'wdth' 100, 'slnt' 12;
        font-weight: 500;
      }

      .cls-16 {
        letter-spacing: 0em;
      }

      .cls-17 {
        letter-spacing: -.02em;
      }

      .cls-18 {
        fill: #0896c1;
      }

      .cls-18, .cls-19 {
        fill-rule: evenodd;
      }

      .cls-20 {
        letter-spacing: 0em;
      }

      .cls-21 {
        letter-spacing: 0em;
      }

      .cls-22 {
        letter-spacing: 0em;
      }

      .cls-23 {
        letter-spacing: 0em;
      }

      .cls-24 {
        letter-spacing: .04em;
      }

      .cls-25 {
        letter-spacing: .01em;
      }

      .cls-26 {
        letter-spacing: 0em;
      }

      .cls-27 {
        letter-spacing: 0em;
      }

      .cls-28 {
        letter-spacing: -.01em;
      }

      .cls-29 {
        letter-spacing: 0em;
      }

      .cls-30 {
        letter-spacing: 0em;
      }

      .cls-31 {
        letter-spacing: -.02em;
      }

      .cls-32 {
        letter-spacing: -.02em;
      }

      .cls-33 {
        letter-spacing: .02em;
      }

      .cls-34 {
        letter-spacing: 0em;
      }

      .cls-35 {
        letter-spacing: 0em;
      }

      .cls-36 {
        letter-spacing: 0em;
      }

      .cls-37 {
        letter-spacing: .01em;
      }

      .cls-38 {
        letter-spacing: 0em;
      }

      .cls-39 {
        letter-spacing: -.08em;
      }

      .cls-40 {
        letter-spacing: -.01em;
      }

      .cls-41 {
        letter-spacing: .04em;
      }

      .cls-42 {
        letter-spacing: 0em;
      }

      .cls-43 {
        letter-spacing: -.01em;
      }

      .cls-44 {
        letter-spacing: -.02em;
      }

      .cls-45 {
        letter-spacing: 0em;
      }

      .cls-46 {
        letter-spacing: .02em;
      }

      .cls-47 {
        letter-spacing: 0em;
      }

      .cls-48 {
        letter-spacing: 0em;
      }

      .cls-49 {
        letter-spacing: 0em;
      }

      .cls-50 {
        letter-spacing: 0em;
      }

      .cls-51 {
        letter-spacing: 0em;
      }

      .cls-52 {
        letter-spacing: .04em;
      }

      .cls-53 {
        letter-spacing: 0em;
      }

      .cls-54 {
        letter-spacing: 0em;
      }

      .cls-55 {
        letter-spacing: .01em;
      }

      .cls-56 {
        letter-spacing: 0em;
      }

      .cls-57 {
        letter-spacing: 0em;
      }

      .cls-58 {
        letter-spacing: 0em;
      }

      .cls-59 {
        letter-spacing: 0em;
      }

      .cls-60 {
        letter-spacing: 0em;
      }

      .cls-61 {
        letter-spacing: 0em;
      }

      .cls-62 {
        letter-spacing: 0em;
      }

      .cls-63 {
        letter-spacing: .02em;
      }

      .cls-64 {
        letter-spacing: .02em;
      }

      .cls-65 {
        letter-spacing: 0em;
      }

      .cls-66 {
        letter-spacing: -.01em;
      }

      .cls-67 {
        letter-spacing: .03em;
      }

      .cls-68 {
        letter-spacing: .02em;
      }

      .cls-69 {
        letter-spacing: 0em;
      }

      .cls-70 {
        letter-spacing: 0em;
      }

      .cls-71 {
        letter-spacing: 0em;
      }

      .cls-72 {
        letter-spacing: -.01em;
      }

      .cls-73 {
        letter-spacing: .02em;
      }

      .cls-74 {
        letter-spacing: 0em;
      }

      .cls-75 {
        letter-spacing: .01em;
      }

      .cls-76 {
        letter-spacing: 0em;
      }

      .cls-77 {
        letter-spacing: 0em;
      }

      .cls-78 {
        letter-spacing: .03em;
      }

      .cls-79 {
        letter-spacing: 0em;
      }

      .cls-80 {
        letter-spacing: .03em;
      }

      .cls-81 {
        letter-spacing: 0em;
      }

      .cls-82 {
        letter-spacing: -.02em;
      }

      .cls-83 {
        letter-spacing: -.01em;
      }

      .cls-84 {
        letter-spacing: 0em;
      }

      .cls-85 {
        letter-spacing: -.02em;
      }

      .cls-86 {
        letter-spacing: 0em;
      }

      .cls-9 {
        fill: #fff;
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
        letter-spacing: 0em;
      }

      .cls-91 {
        letter-spacing: 0em;
      }

      .cls-92 {
        letter-spacing: 0em;
      }

      .cls-93 {
        letter-spacing: 0em;
      }

      .cls-94 {
        letter-spacing: 0em;
      }

      .cls-95 {
        letter-spacing: .01em;
      }

      .cls-96 {
        letter-spacing: -.01em;
      }

      .cls-97 {
        letter-spacing: 0em;
      }

      .cls-98 {
        letter-spacing: 0em;
      }

      .cls-8 {
        font-size: 23.01px;
      }

      .cls-99 {
        letter-spacing: 0em;
      }

      .cls-100 {
        letter-spacing: 0em;
      }

      .cls-101 {
        letter-spacing: 0em;
      }

      .cls-102 {
        letter-spacing: 0em;
      }

      .cls-103 {
        letter-spacing: .02em;
      }

      .cls-104 {
        letter-spacing: -.02em;
      }

      .cls-105 {
        letter-spacing: -.08em;
      }

      .cls-106 {
        letter-spacing: 0em;
      }

      .cls-107 {
        letter-spacing: 0em;
      }

      .cls-108 {
        letter-spacing: .01em;
      }

      .cls-109 {
        letter-spacing: 0em;
      }

      .cls-110 {
        letter-spacing: .01em;
      }

      .cls-111 {
        fill: none;
        stroke: #231f20;
        stroke-miterlimit: 10;
      }

      .cls-112 {
        letter-spacing: -.01em;
      }

      .cls-113 {
        letter-spacing: 0em;
      }

      .cls-114 {
        letter-spacing: -.02em;
      }

      .cls-115 {
        letter-spacing: 0em;
      }

      .cls-116 {
        letter-spacing: 0em;
      }

      .cls-117 {
        letter-spacing: 0em;
      }

      .cls-118 {
        letter-spacing: -.03em;
      }

      .cls-119 {
        letter-spacing: 0em;
      }

      .cls-120 {
        letter-spacing: -.01em;
      }

      .cls-121 {
        letter-spacing: .02em;
      }

      .cls-122 {
        letter-spacing: 0em;
      }

      .cls-123 {
        letter-spacing: .01em;
      }

      .cls-124 {
        letter-spacing: 0em;
      }

      .cls-125 {
        letter-spacing: 0em;
      }

      .cls-19 {
        fill: #ededed;
      }
    `}</style>
    </defs>
    <line class="cls-111" x1="614.44" y1="131.38" x2="614.44" y2="202.58"/>
  <line class="cls-111" x1="614.44" y1="329.07" x2="614.44" y2="394.59"/>
  <text class="cls-7" transform="translate(383.79 101.09)"><tspan class="cls-118" x="0" y="0">A</tspan><tspan x="10.63" y="0" xml:space="preserve"> m</tspan><tspan class="cls-117" x="29.79" y="0">e</tspan><tspan class="cls-115" x="39.13" y="0">t</tspan><tspan x="44.66" y="0">h</tspan><tspan class="cls-76" x="54.61" y="0">o</tspan><tspan class="cls-63" x="64.35" y="0">d</tspan><tspan x="74.94" y="0"> </tspan><tspan class="cls-26" x="79.43" y="0">o</tspan><tspan x="89.24" y="0">f </tspan><tspan class="cls-101" x="98.81" y="0">r</tspan><tspan class="cls-60" x="104.98" y="0">e</tspan><tspan x="114.38" y="0">i</tspan><tspan class="cls-36" x="118.66" y="0">n</tspan><tspan class="cls-106" x="128.57" y="0">fo</tspan><tspan class="cls-70" x="143.35" y="0">r</tspan><tspan x="149.52" y="0">cin</tspan><tspan class="cls-11" x="172.82" y="0">g</tspan><tspan class="cls-30" x="182.95" y="0" xml:space="preserve"> conc</tspan><tspan class="cls-70" x="225.23" y="0">r</tspan><tspan class="cls-74" x="231.41" y="0">e</tspan><tspan class="cls-113" x="240.75" y="0">t</tspan><tspan x="246.22" y="0">e in </tspan><tspan class="cls-50" x="278.75" y="0">w</tspan><tspan x="292" y="0">hich i</tspan><tspan class="cls-115" x="334.01" y="0">n</tspan><tspan class="cls-113" x="343.84" y="0">t</tspan><tspan class="cls-90" x="349.31" y="0">e</tspan><tspan class="cls-115" x="358.72" y="0">r</tspan><tspan class="cls-16" x="364.86" y="0">n</tspan><tspan x="374.67" y="0">a</tspan><tspan class="cls-63" x="384.19" y="0">l</tspan><tspan x="388.86" y="0"> </tspan><tspan class="cls-14" x="393.35" y="0">s</tspan><tspan class="cls-79" x="401.38" y="0">t</tspan><tspan class="cls-70" x="407" y="0">r</tspan><tspan class="cls-124" x="413.18" y="0">e</tspan><tspan class="cls-110" x="422.66" y="0">s</tspan><tspan class="cls-92" x="431.12" y="0">s</tspan><tspan class="cls-124" x="439.28" y="0">e</tspan><tspan class="cls-23" x="448.77" y="0">s</tspan><tspan class="cls-63" x="457.11" y="0"> </tspan><tspan x="-.09" y="21.47">a</tspan><tspan class="cls-70" x="9.43" y="21.47">r</tspan><tspan x="15.6" y="21.47">e i</tspan><tspan class="cls-115" x="33.69" y="21.47">n</tspan><tspan class="cls-77" x="43.52" y="21.47">t</tspan><tspan class="cls-101" x="49.14" y="21.47">r</tspan><tspan class="cls-76" x="55.31" y="21.47">o</tspan><tspan x="65.05" y="21.47">duc</tspan><tspan class="cls-100" x="94.11" y="21.47">e</tspan><tspan class="cls-63" x="103.52" y="21.47">d</tspan><tspan x="114.11" y="21.47" xml:space="preserve"> i</tspan><tspan class="cls-115" x="122.88" y="21.47">n</tspan><tspan class="cls-113" x="132.7" y="21.47">t</tspan><tspan class="cls-68" x="138.18" y="21.47">o</tspan><tspan x="148.15" y="21.47"> </tspan><tspan class="cls-115" x="152.64" y="21.47">t</tspan><tspan x="158.17" y="21.47">he </tspan><tspan class="cls-120" x="181.93" y="21.47">s</tspan><tspan class="cls-36" x="189.96" y="21.47">t</tspan><tspan class="cls-71" x="195.58" y="21.47">r</tspan><tspan x="201.79" y="21.47">u</tspan><tspan class="cls-20" x="211.58" y="21.47">c</tspan><tspan class="cls-40" x="220.6" y="21.47">t</tspan><tspan x="226.04" y="21.47">u</tspan><tspan class="cls-70" x="235.83" y="21.47">r</tspan><tspan class="cls-42" x="242" y="21.47">e </tspan><tspan class="cls-1" x="255.82" y="21.47">b</tspan><tspan class="cls-69" x="265.98" y="21.47">e</tspan><tspan x="275.45" y="21.47">fo</tspan><tspan class="cls-56" x="290.23" y="21.47">r</tspan><tspan x="296.4" y="21.47">e it </tspan><tspan class="cls-47" x="324.64" y="21.47">i</tspan><tspan class="cls-15" x="329" y="21.47">s</tspan><tspan x="337.34" y="21.47" xml:space="preserve"> p</tspan><tspan class="cls-23" x="352.05" y="21.47">u</tspan><tspan x="361.91" y="21.47">t i</tspan><tspan class="cls-115" x="376.33" y="21.47">n</tspan><tspan class="cls-89" x="386.16" y="21.47">t</tspan><tspan class="cls-68" x="391.63" y="21.47">o</tspan><tspan x="401.6" y="21.47"> </tspan><tspan class="cls-49" x="406.09" y="21.47">s</tspan><tspan class="cls-47" x="414.25" y="21.47">e</tspan><tspan class="cls-103" x="423.66" y="21.47">r</tspan><tspan class="cls-50" x="430.37" y="21.47">v</tspan><tspan x="439.02" y="21.47">ice</tspan></text>
  <text class="cls-7" transform="translate(491.37 296.5)"><tspan class="cls-105" x="0" y="0">T</tspan><tspan class="cls-100" x="8.14" y="0">e</tspan><tspan x="17.55" y="0">ndo</tspan><tspan class="cls-20" x="47.4" y="0">n</tspan><tspan class="cls-60" x="57.3" y="0">s</tspan><tspan x="65.64" y="0" xml:space="preserve"> a</tspan><tspan class="cls-70" x="79.65" y="0">r</tspan><tspan x="85.82" y="0">e </tspan><tspan class="cls-45" x="99.63" y="0">t</tspan><tspan class="cls-90" x="105.11" y="0">e</tspan><tspan class="cls-21" x="114.52" y="0">n</tspan><tspan class="cls-26" x="124.42" y="0">s</tspan><tspan x="132.79" y="0">ion</tspan><tspan class="cls-90" x="156.72" y="0">e</tspan><tspan class="cls-63" x="166.13" y="0">d</tspan><tspan x="176.72" y="0" xml:space="preserve"> a</tspan><tspan class="cls-59" x="190.73" y="0">f</tspan><tspan class="cls-113" x="195.69" y="0">t</tspan><tspan class="cls-47" x="201.17" y="0">e</tspan><tspan x="210.58" y="0">r </tspan><tspan class="cls-115" x="221.33" y="0">t</tspan><tspan x="226.86" y="0">he</tspan><tspan x="-28.33" y="21.47">conc</tspan><tspan class="cls-101" x="9.47" y="21.47">r</tspan><tspan class="cls-117" x="15.64" y="21.47">e</tspan><tspan class="cls-113" x="24.98" y="21.47">t</tspan><tspan x="30.46" y="21.47">e </tspan><tspan class="cls-4" x="44.27" y="21.47">h</tspan><tspan class="cls-101" x="54.08" y="21.47">a</tspan><tspan class="cls-60" x="63.51" y="21.47">s</tspan><tspan x="71.85" y="21.47"> </tspan><tspan class="cls-113" x="76.34" y="21.47">g</tspan><tspan x="86.23" y="21.47">ain</tspan><tspan class="cls-100" x="109.98" y="21.47">e</tspan><tspan class="cls-2" x="119.39" y="21.47">d</tspan><tspan x="129.98" y="21.47"> </tspan><tspan class="cls-87" x="134.47" y="21.47">s</tspan><tspan class="cls-108" x="142.58" y="21.47">u</tspan><tspan class="cls-13" x="152.64" y="21.47">ff</tspan><tspan class="cls-22" x="162.76" y="21.47">ici</tspan><tspan class="cls-90" x="180.39" y="21.47">e</tspan><tspan class="cls-115" x="189.8" y="21.47">n</tspan><tspan x="199.63" y="21.47">t </tspan><tspan class="cls-14" x="209.77" y="21.47">s</tspan><tspan class="cls-77" x="217.81" y="21.47">t</tspan><tspan class="cls-56" x="223.43" y="21.47">r</tspan><tspan class="cls-90" x="229.6" y="21.47">e</tspan><tspan class="cls-22" x="239.01" y="21.47">n</tspan><tspan class="cls-20" x="248.96" y="21.47">g</tspan><tspan class="cls-115" x="258.98" y="21.47">t</tspan><tspan x="264.51" y="21.47">h</tspan></text>
  <polyline class="cls-111" points="287.23 451.4 287.23 393.46 941.65 393.46 941.65 450.26"/>
  <text class="cls-7" transform="translate(0 552.52)"><tspan class="cls-20" x="0" y="0">U</tspan><tspan class="cls-49" x="12.04" y="0">s</tspan><tspan class="cls-100" x="20.2" y="0">e</tspan><tspan class="cls-63" x="29.61" y="0">d</tspan><tspan x="40.21" y="0"> </tspan><tspan class="cls-50" x="44.7" y="0">w</tspan><tspan x="57.94" y="0">h</tspan><tspan class="cls-100" x="67.89" y="0">e</tspan><tspan class="cls-70" x="77.3" y="0">r</tspan><tspan x="83.48" y="0">e h</tspan><tspan class="cls-11" x="107.24" y="0">i</tspan><tspan x="111.57" y="0">gh</tspan><tspan class="cls-100" x="131.59" y="0">e</tspan><tspan class="cls-30" x="141.01" y="0">r </tspan><tspan class="cls-120" x="151.76" y="0">s</tspan><tspan x="159.79" y="0">t</tspan><tspan class="cls-75" x="165.45" y="0">i</tspan><tspan class="cls-76" x="169.98" y="0">ff</tspan><tspan x="180.01" y="0">n</tspan><tspan class="cls-61" x="189.96" y="0">e</tspan><tspan class="cls-123" x="199.45" y="0">s</tspan><tspan class="cls-41" x="207.91" y="0">s</tspan><tspan class="cls-96" x="216.97" y="0">,</tspan><tspan x="220.51" y="0"> </tspan><tspan class="cls-1" x="225" y="0">b</tspan><tspan class="cls-74" x="235.16" y="0">e</tspan><tspan class="cls-77" x="244.5" y="0">t</tspan><tspan class="cls-113" x="250.12" y="0">t</tspan><tspan class="cls-100" x="255.6" y="0">e</tspan><tspan x="265.01" y="0">r c</tspan><tspan class="cls-31" x="284.84" y="0">r</tspan><tspan class="cls-79" x="290.76" y="0">a</tspan><tspan x="300.24" y="0">ck co</tspan><tspan class="cls-115" x="341.37" y="0">n</tspan><tspan class="cls-36" x="351.19" y="0">t</tspan><tspan class="cls-70" x="356.81" y="0">r</tspan><tspan class="cls-106" x="362.98" y="0">o</tspan><tspan class="cls-25" x="372.68" y="0">l</tspan><tspan class="cls-96" x="377.19" y="0">,</tspan><tspan x="380.73" y="0" xml:space="preserve"> an</tspan><tspan class="cls-63" x="404.69" y="0">d</tspan><tspan x="415.29" y="0" xml:space="preserve"> long-</tspan><tspan class="cls-45" x="460.33" y="0">t</tspan><tspan class="cls-100" x="465.8" y="0">e</tspan><tspan class="cls-115" x="475.21" y="0">r</tspan><tspan x="481.35" y="0">m du</tspan><tspan class="cls-44" x="520.5" y="0">r</tspan><tspan class="cls-106" x="526.43" y="0">a</tspan><tspan class="cls-50" x="535.95" y="0">b</tspan><tspan class="cls-76" x="546.13" y="0">i</tspan><tspan class="cls-11" x="550.44" y="0">l</tspan><tspan x="554.77" y="0">i</tspan><tspan class="cls-80" x="559.05" y="0">t</tspan><tspan class="cls-78" x="565.24" y="0">y</tspan><tspan x="28.59" y="21.47">a</tspan><tspan class="cls-70" x="38.1" y="21.47">r</tspan><tspan x="44.28" y="21.47">e </tspan><tspan class="cls-101" x="58.09" y="21.47">r</tspan><tspan class="cls-100" x="64.27" y="21.47">e</tspan><tspan x="73.68" y="21.47">qui</tspan><tspan class="cls-70" x="97.94" y="21.47">r</tspan><tspan class="cls-100" x="104.12" y="21.47">e</tspan><tspan class="cls-101" x="113.53" y="21.47">d</tspan><tspan x="123.64" y="21.47">—idea</tspan><tspan class="cls-73" x="172.88" y="21.47">l</tspan><tspan x="177.55" y="21.47" xml:space="preserve"> for he</tspan><tspan class="cls-104" x="226.85" y="21.47">a</tspan><tspan class="cls-121" x="236.02" y="21.47">v</tspan><tspan class="cls-78" x="244.89" y="21.47">y</tspan><tspan x="254.11" y="21.47"> </tspan><tspan class="cls-120" x="258.6" y="21.47">s</tspan><tspan class="cls-36" x="266.63" y="21.47">t</tspan><tspan class="cls-71" x="272.25" y="21.47">r</tspan><tspan x="278.46" y="21.47">u</tspan><tspan class="cls-20" x="288.25" y="21.47">c</tspan><tspan class="cls-43" x="297.27" y="21.47">t</tspan><tspan class="cls-30" x="302.71" y="21.47">u</tspan><tspan class="cls-31" x="312.5" y="21.47">r</tspan><tspan class="cls-106" x="318.42" y="21.47">a</tspan><tspan class="cls-63" x="327.94" y="21.47">l</tspan><tspan x="332.61" y="21.47" xml:space="preserve"> d</tspan><tspan class="cls-100" x="347.3" y="21.47">e</tspan><tspan class="cls-4" x="356.71" y="21.47">m</tspan><tspan x="371.24" y="21.47">an</tspan><tspan class="cls-63" x="390.71" y="21.47">d</tspan><tspan x="401.3" y="21.47"> </tspan><tspan class="cls-50" x="405.79" y="21.47">l</tspan><tspan class="cls-76" x="410.12" y="21.47">i</tspan><tspan class="cls-62" x="414.44" y="21.47">k</tspan><tspan x="423.06" y="21.47">e </tspan><tspan class="cls-76" x="436.88" y="21.47">po</tspan><tspan class="cls-11" x="456.86" y="21.47">d</tspan><tspan x="467.12" y="21.47">ium s</tspan><tspan class="cls-20" x="508.61" y="21.47">l</tspan><tspan class="cls-30" x="512.84" y="21.47">a</tspan><tspan class="cls-95" x="522.36" y="21.47">b</tspan><tspan class="cls-52" x="532.68" y="21.47">s</tspan><tspan class="cls-32" x="541.65" y="21.47">.</tspan></text>
  <text class="cls-7" transform="translate(723.64 552.52)"><tspan class="cls-20" x="0" y="0">U</tspan><tspan class="cls-92" x="12.04" y="0">s</tspan><tspan class="cls-90" x="20.2" y="0">e</tspan><tspan class="cls-63" x="29.62" y="0">d</tspan><tspan x="40.21" y="0" xml:space="preserve"> for f</tspan><tspan class="cls-56" x="75.32" y="0">a</tspan><tspan class="cls-14" x="84.75" y="0">s</tspan><tspan class="cls-113" x="92.78" y="0">t</tspan><tspan class="cls-90" x="98.26" y="0">e</tspan><tspan x="107.67" y="0">r </tspan><tspan class="cls-68" x="118.42" y="0">e</tspan><tspan class="cls-49" x="128.01" y="0">x</tspan><tspan class="cls-90" x="135.82" y="0">e</tspan><tspan class="cls-49" x="145.23" y="0">c</tspan><tspan class="cls-15" x="154.19" y="0">u</tspan><tspan class="cls-22" x="164.05" y="0">tio</tspan><tspan class="cls-33" x="183.68" y="0">n</tspan><tspan class="cls-112" x="193.92" y="0">,</tspan><tspan x="197.46" y="0" xml:space="preserve"> e</tspan><tspan class="cls-56" x="211.28" y="0">a</tspan><tspan class="cls-53" x="220.71" y="0">s</tspan><tspan x="229.08" y="0">i</tspan><tspan class="cls-90" x="233.36" y="0">e</tspan><tspan x="242.77" y="0">r i</tspan><tspan class="cls-20" x="257.8" y="0">n</tspan><tspan class="cls-14" x="267.7" y="0">s</tspan><tspan class="cls-115" x="275.73" y="0">t</tspan><tspan x="281.26" y="0">a</tspan><tspan class="cls-1" x="290.78" y="0">l</tspan><tspan class="cls-21" x="295.09" y="0">l</tspan><tspan class="cls-34" x="299.32" y="0">a</tspan><tspan class="cls-22" x="308.69" y="0">tio</tspan><tspan class="cls-121" x="328.32" y="0">n</tspan><tspan class="cls-96" x="338.56" y="0">,</tspan><tspan x="342.1" y="0" xml:space="preserve"> an</tspan><tspan class="cls-2" x="366.06" y="0">d</tspan><tspan x="376.66" y="0"> </tspan><tspan class="cls-55" x="381.15" y="0">f</tspan><tspan class="cls-22" x="386.44" y="0">l</tspan><tspan class="cls-108" x="390.72" y="0">e</tspan><tspan class="cls-88" x="400.31" y="0">x</tspan><tspan class="cls-1" x="408.4" y="0">i</tspan><tspan x="412.71" y="0">ble</tspan><tspan x="-35.19" y="21.47">s</tspan><tspan class="cls-21" x="-26.92" y="21.47">l</tspan><tspan x="-22.7" y="21.47">a</tspan><tspan class="cls-68" x="-13.18" y="21.47">b</tspan><tspan x="-2.78" y="21.47"> </tspan><tspan class="cls-1" x="1.71" y="21.47">b</tspan><tspan class="cls-15" x="11.87" y="21.47">e</tspan><tspan class="cls-16" x="21.27" y="21.47">h</tspan><tspan class="cls-17" x="31.08" y="21.47">a</tspan><tspan class="cls-50" x="40.24" y="21.47">v</tspan><tspan x="48.88" y="21.47">io</tspan><tspan class="cls-113" x="62.86" y="21.47">r</tspan><tspan class="cls-56" x="68.94" y="21.47">—</tspan><tspan class="cls-1" x="84.78" y="21.47">p</tspan><tspan class="cls-90" x="95.03" y="21.47">e</tspan><tspan class="cls-67" x="104.44" y="21.47">r</tspan><tspan x="111.17" y="21.47">f</tspan><tspan class="cls-90" x="116.25" y="21.47">e</tspan><tspan class="cls-21" x="125.66" y="21.47">c</tspan><tspan x="134.68" y="21.47">t for </tspan><tspan class="cls-70" x="170.36" y="21.47">r</tspan><tspan class="cls-61" x="176.54" y="21.47">e</tspan><tspan class="cls-26" x="186.02" y="21.47">s</tspan><tspan x="194.39" y="21.47">id</tspan><tspan class="cls-90" x="208.87" y="21.47">e</tspan><tspan class="cls-115" x="218.28" y="21.47">n</tspan><tspan x="228.11" y="21.47">t</tspan><tspan class="cls-21" x="233.76" y="21.47">i</tspan><tspan x="237.99" y="21.47">a</tspan><tspan class="cls-63" x="247.5" y="21.47">l</tspan><tspan x="252.17" y="21.47" xml:space="preserve"> an</tspan><tspan class="cls-63" x="276.14" y="21.47">d</tspan><tspan x="286.73" y="21.47" xml:space="preserve"> comm</tspan><tspan class="cls-90" x="339.34" y="21.47">e</tspan><tspan class="cls-70" x="348.75" y="21.47">r</tspan><tspan x="354.92" y="21.47">c</tspan><tspan class="cls-21" x="364" y="21.47">i</tspan><tspan x="368.22" y="21.47">a</tspan><tspan class="cls-63" x="377.74" y="21.47">l</tspan><tspan x="382.41" y="21.47"> </tspan><tspan class="cls-37" x="386.9" y="21.47">f</tspan><tspan x="392.2" y="21.47">l</tspan><tspan class="cls-1" x="396.47" y="21.47">o</tspan><tspan class="cls-22" x="406.21" y="21.47">or s</tspan><tspan class="cls-21" x="434.93" y="21.47">l</tspan><tspan x="439.15" y="21.47">a</tspan><tspan class="cls-110" x="448.67" y="21.47">b</tspan><tspan class="cls-24" x="459" y="21.47">s</tspan><tspan class="cls-114" x="467.96" y="21.47">.</tspan></text>
  <g>
    <g>
      <image width="361" height="70" transform="translate(431.97) scale(1.01 1.24)" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWkAAABXCAYAAADGfLQnAAAACXBIWXMAAArrAAAK6wGCiw1aAAADfElEQVR4nO3c227iSBSG0Z9Tunvy/q+amRwIc2FXUxhzCB3SW8paUskEAcrVp61yQQIAAHzc4ovfB/Bd7W5500diu+he3z8G4Lxdd91NnjtreZd/B4BPcc003KbmZZLVeG1/X/sZAN9RPzW/z6yL0/S5wPZxXifZjNd19rG+9BkA310f6LdxvY7XbQ63QI6cCmwLdIvzjyQ/kzxkH2n70gCXtQi3SL8keR7Xy/jcyal6PfNci28f51/jdRNTNMBHtVBvM0zRDxl6+pQh1q85EepTkV5nCPQ/SR5zGGgTNMBtVtlvG6+zb+kuQ6jb49+c7gAobDpJtxuFmwzT82OGrY6H7E91mKIBbrPM8Qm56Y3FA6uZD9hkCPNjhu2OHzk8egfAbRYzq+1VbzOE+sBq8uZVhqm57UX3gQbgc/SRTvZT9FGop/Ftk3S789huFALw+S4214QMUFgf6f6r376wAnBfrbntW93rzBzQOBVpgQb4GnO/jfTb9JuD07uOANzX2ebO7UmLM8DfcdRfNw4BCjsVadM0QAEmaYDCRBqgMJEGKEykAQoTaYDCRBqgMJEGKEykAQoTaYDCRBqgMJEGKEykAQoTaYDCRBqgMJEGKEykAQoTaYDCRBqgMJEGKEykAQoTaYDCRBqgMJEGKEykAQoTaYDCRBqgMJEGKEykAQoTaYDCRBqgMJEGKEykAQoTaYDCRBqgMJEGKEykAQoTaYDCRBqgMJEGKEykAQoTaYDCRBqgMJEGKOxUpHdf+l8AMGsu0gINUMQ00rtuAfA1TrZ32b2gXd+7BcB9vWff3qNQu3EIUFgf6Vby7bjaNG3rA+A+2uT8ln13D6bpuUi/JXkZr7Y8AO6jb+7ruLaZDMar7vGiuy6TrMe1HJ9bBIDP0Af6vyRP4/UtZyLda6Hul1AD/Lk+0M9J/s0Q6edcmKSTIcL9C1qc23VKtAHO200e94F+ypkpOnG6A6C09eTvVvG2T7LI/pTHQ5JNbH0A3GKXYTujHc5o2xxtip49TTeNdPug9wx3GpP9aP4zQ6jXGbZJRBrgOi3Q2wyBfs4Q5+ecONXRnAtt24teZZigNzmOtFADnNfOPbcp+jX7Y84nJ+jmUmRbiNsJj9W4bHkAXKdFum0d918YvPhbSW4cAhR27SS8mFkAXG83sy66JbYCDXA7v4cEAAAAAEBJ/wMCvLrYstTaxwAAAABJRU5ErkJggg=="/>
      <path class="cls-18" d="M440.06,19.49c0-6.64,4.38-12.02,9.77-12.02h329.28c5.4,0,9.77,5.38,9.77,12.02v48.1c0,6.64-4.38,12.02-9.77,12.02h-329.28c-5.4,0-9.77-5.38-9.77-12.02V19.49Z"/>
    </g>
    <text class="cls-9" transform="translate(498.94 52.6)"><tspan class="cls-65" x="0" y="0">P</tspan><tspan class="cls-51" x="19.73" y="0">R</tspan><tspan class="cls-12" x="40.19" y="0">E</tspan><tspan class="cls-54" x="59.42" y="0">S</tspan><tspan x="78.71" y="0">T</tspan><tspan class="cls-86" x="96.75" y="0">R</tspan><tspan class="cls-122" x="117.21" y="0">E</tspan><tspan class="cls-35" x="136.44" y="0">S</tspan><tspan class="cls-72" x="156.17" y="0">S</tspan><tspan class="cls-94" x="175.25" y="0">I</tspan><tspan x="184.88" y="0">NG</tspan></text>
  </g>
  <g>
    <g>
      <image width="361" height="70" transform="translate(359.44 194.69) scale(1.41 1.18)" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWoAAAA8CAYAAABPePC9AAAACXBIWXMAAAfXAAAH1wHrz0HgAAACzUlEQVR4nO3bUW/iRhiG0deB0GxXqvr/f2c3XRKCezGeZTA4JGxAI/UcaWTHwlauHn0aTAIAAFxvuPN9AP9n4zU3fSa4Q/P59hyAy8bmOM6uveu92NYYPyRZJ3mcjuskq+n6pWcAUIK8n9ZuWq/T8S3H8T6xFNka6RroP5I8JdnkEGpTNcDH1BDXUL8k2U7rZbq2z0Ks12eu1QC3gf42HR9jmga4Ro31W8o0vUlp6nNKsF+zEOulUK9TIv1nku85jrRJGuB6qxy2kdc59HRMiXU9/2Ue6ron/ZgS5+8p0/Rmui7SAL/nIYee1t2J+R72kVVzPkx/PyX5K8nfKaHexCQN8FXaFzXa6XrIIdZHE/XD7AF1mq57JzXQANzGxe62oZ4X3hQNcFu1u/U16HXObDMvhVqkAe6n7W8N9S/z1+yG2QLg9t7t7nyPur0BgPs76e+5UAPQEaEG6JxQA3ROqAE6J9QAnRNqgM4JNUDnhBqgc0IN0DmhBuicUAN0TqgBOifUAJ0TaoDOCTVA54QaoHNCDdA5oQbonFADdE6oATon1ACdE2qAzgk1QOeEGqBzQg3QOaEG6JxQA3ROqAE6J9QAnVsK9XjX/wKARedCLdIAHZmHemwWAPez2N+H5gP1uG8WALe3z6G/J7FuJ+r6obdp7ZubALiNGuZdDu09ivVq4YYxJeKr6ThMC4CvUYfj1yTPSf5J8iPJS2Y7GvNQV0NKoNsl1gBfo0Z6l2Sb5N+UWG9TpuqjnYx5qIfZB2qg63FOuAEuG2fnbaSfp/Vzunay3bxeeNhuumnIYa96k+QxpmuAa40pE/MuZYujTtI10me/F5yHuj6o7pskh/I/pcR6nTKJCzXAx9VIv6VEepsS6G1Kb0+2PKpLsa2Tc92nXsUXjACfVV/SqDsU7dt1F3+78tHQDmcWAJ8znlkXXRNckQb4PX6fAgAAAFD8B54kmbIN+ExpAAAAAElFTkSuQmCC"/>
      <path class="cls-19" d="M370.74,213.15c0-6.29,6.11-11.39,13.66-11.39h460.09c7.54,0,13.66,5.1,13.66,11.39v45.55c0,6.29-6.11,11.39-13.66,11.39h-460.09c-7.54,0-13.66-5.1-13.66-11.39v-45.55Z"/>
    </g>
    <text class="cls-6" transform="translate(400.75 244.98)"><tspan class="cls-94" x="0" y="0">P</tspan><tspan x="20.06" y="0">O</tspan><tspan class="cls-116" x="43.53" y="0">S</tspan><tspan class="cls-10" x="62.82" y="0">T</tspan><tspan class="cls-39" x="79.05" y="0">-</tspan><tspan x="88.5" y="0">T</tspan><tspan class="cls-102" x="106.54" y="0">E</tspan><tspan class="cls-48" x="125.4" y="0">N</tspan><tspan class="cls-72" x="148.44" y="0">S</tspan><tspan class="cls-109" x="167.52" y="0">IO</tspan><tspan class="cls-98" x="200.59" y="0">NI</tspan><tspan x="233.41" y="0">NG </tspan><tspan class="cls-83" x="287.03" y="0">S</tspan><tspan class="cls-65" x="306.05" y="0">Y</tspan><tspan class="cls-84" x="324.73" y="0">S</tspan><tspan x="344.03" y="0">TE</tspan><tspan class="cls-65" x="381.02" y="0">M</tspan><tspan x="407.9" y="0">S</tspan></text>
  </g>
  <g>
    <g>
      <image width="361" height="70" transform="translate(104.73 444.5) scale(1.01 1.2)" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWkAAABUCAYAAABA6MaJAAAACXBIWXMAAArrAAAK6wGCiw1aAAADb0lEQVR4nO3cbW/iRhiG0ZsA2W3z//9qWpIQ+sGe9WDMy9IkfdScI43MomDtp0uPxgMJAAAAwP/K6os/B/BdHe750O/EdtX9ff8agMsO3fUwe++iW0LbgvyQZD1e279vvQfAd9QH+X1hXQ31pcD2cd4k2Y7XTaZYX7sHwHfXB/ptXK/jdZ/j6frEucC2QLc4/0jyM8ljpkjb8gC4rkW4RfolyW5cL+N7Z6fqzcJ7Lb59nP8Yr9uYogF+Vwv1PsMU/Zihp88ZYv2aM6F+mL8BQB3nJulNhin6zyRPOZ6ibXMA3Ged6dneJlNLDxmm6fb6l3mk24PCbYYwP2XY6njMdKpDoAHu85DTE3LzB4tH1gs32GYI81OGSfpHjo/eAXCf1cJqe9X7DKE+sp59eJ1ham7bHH2gAfgYfaSTaYo+CfU8vm2Sbk8e2x40AB/vanNNyACF9ZHuv/rtCysAn6s1t32re5OFAxrnIi3QAF9j6beRfpl/c3D+1BGAz3WxuUt70uIM8N846e+5B4dCDVCA0x0AhYk0QGEiDVCYSAMUJtIAhYk0QGEiDVCYSAMUJtIAhYk0QGEiDVCYSAMUJtIAhYk0QGEiDVCYSAMUJtIAhYk0QGEiDVCYSAMUJtIAhYk0QGEiDVCYSAMUJtIAhYk0QGEiDVCYSAMUJtIAhYk0QGEiDVCYSAMUJtIAhYk0QGEiDVCYSAMUJtIAhYk0QGEiDVCYSAMUJtIAhYk0QGHnIn340v8FAIuWIi3QAEXMI33oFgBf42x77UkDFNYifeiu790C4HO9Z2rvyTTdT9Ltj/bjeu8+BMDHa1F+y9Tdo1AvRfotyct4NU0DfI6+ua/j2mc2GK+716vu+pBkM66H8b1VAPgIfaD/TvI8Xt9yIdK9Fup+CTXAv9cHepfkrwyR3mVhkna6A6Cw+SS9ynHF2wTdrnMma4DLDrPX/RT9nAtbHcmw57x0s7ZPssp0yuMxyTa2PgDucciwndEOZ7RtjhboxdN080i3G71neNKYTNX/mSHUmwwTuEgD3KYFep8h0LsMcd7lzKmO5lJo2zbHOsMEvc1ppIUa4LJ27rlN0a+ZjjmfnaCba5FtIW4nPNbjsuUBcJsW6bZ13H9h8OpvJTndAVDYrZPwamEBcLvDwrrqntgKNMD9/B4SAAAA8J39AzSdutLO+peVAAAAAElFTkSuQmCC"/>
      <path class="cls-19" d="M112.81,463.36c0-6.43,4.38-11.64,9.77-11.64h329.28c5.4,0,9.77,5.21,9.77,11.64v46.56c0,6.43-4.38,11.64-9.77,11.64H122.59c-5.4,0-9.77-5.21-9.77-11.64v-46.56Z"/>
    </g>
    <text class="cls-8" transform="translate(203.12 479.64)"><tspan x="0" y="0">BO</tspan><tspan class="cls-29" x="33.13" y="0">N</tspan><tspan x="50.52" y="0">D</tspan><tspan class="cls-57" x="67.46" y="0">E</tspan><tspan class="cls-64" x="81.61" y="0">D</tspan><tspan class="cls-107" x="98.93" y="0">-</tspan><tspan class="cls-29" x="107.58" y="0">P</tspan><tspan class="cls-93" x="122.63" y="0">O</tspan><tspan class="cls-27" x="140.23" y="0">S</tspan><tspan class="cls-93" x="154.7" y="0">T</tspan><tspan x="-42.96" y="27.61">T</tspan><tspan class="cls-57" x="-29.44" y="27.61">E</tspan><tspan class="cls-3" x="-15.29" y="27.61">N</tspan><tspan class="cls-28" x="1.99" y="27.61">S</tspan><tspan x="16.3" y="27.61">IO</tspan><tspan class="cls-119" x="41.1" y="27.61">NI</tspan><tspan x="65.72" y="27.61">NG </tspan><tspan class="cls-85" x="105.94" y="27.61">S</tspan><tspan class="cls-58" x="120.2" y="27.61">Y</tspan><tspan class="cls-27" x="134.21" y="27.61">S</tspan><tspan class="cls-93" x="148.68" y="27.61">TE</tspan><tspan class="cls-107" x="176.43" y="27.61">M</tspan><tspan x="196.58" y="27.61">S</tspan></text>
  </g>
  <g>
    <g>
      <image width="361" height="70" transform="translate(764.77 444.5) scale(1.01 1.2)" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWkAAABUCAYAAABA6MaJAAAACXBIWXMAAArrAAAK6wGCiw1aAAADcElEQVR4nO3c3W7iSBSF0U2AdM/k/V81MyQhzIVdcUGMQ+j8HE3WkkqmUbD66tNRuSABAAAA+F9ZfdNnAX6iw3s/8N7QrrrP9K8BWHboroeT9866NLItyDdJ1uO1/fs99wH4afogP8+sxVC/Fdc+zpsk2/G6yRTrS+4D8JP1gX4a1+N43ed4uj6yFNcW6BbnX0l+J7nNFGlbHgBvaxFukX5IshvXw/je7FS9OXPDFt8+zn+N121M0QDv1UK9zzBF32bo6X2GWD9mJtQ3AaCspUl6k2GK/jvJXY6naNscANdZZ3q2t8nU0kOGabq9TjIf6fagcJshzHcZtjpuM53qEGiA69zk9Qm50weLL9ZnbrDNEOa7DJP0rxwfvQPgOquZ1faq9xlC/eI00qvxvdtM2xx9oAH4GH2kk2mKPgr1XHjbJN2ePLY9aAA+3mJzTccAhZ1Guv/qty+sAHyu1tz2re5NTg5oLEVaoAG+xtxvIyU5jvTpr9sJNMDXONvcc3vS4gzwPY76u/TgUKgBvpnTHQCFiTRAYSINUJhIAxQm0gCFiTRAYSINUJhIAxQm0gCFiTRAYSINUJhIAxQm0gCFiTRAYSINUJhIAxQm0gCFiTRAYSINUJhIAxQm0gCFiTRAYSINUJhIAxQm0gCFiTRAYSINUJhIAxQm0gCFiTRAYSINUJhIAxQm0gCFiTRAYSINUJhIAxQm0gCFiTRAYSINUJhIAxQm0gCFiTRAYUuRPnzZ/wKAWeciLdAABcxF+tAtAL7GbHvtSQMU1kf60F2fuwXA53rO1N6jafp0km5/tB/Xc/chAD5ei/JTpu6+hPpcpJ+SPIxX0zTA5+ib+ziufbrBeH3ygVV3vUmyGdfN+N4qAHyEPtD/Jrkfr09ZiHSvhbpfQg3w5/pA75L8kyHSu5xM0k53ABQ2N0mvcvygsE3Q7Tr39wCcdzh53U/R9zmz1ZEM+83nbtb2SVaZTnncJtnG1gfANQ4ZtjPa4Yy2zdEC/eo03Vyk242eMzxpTKbq/84Q6k2GKVykAS7TAr3PEOhdhjjvMnOqo3krsm2bY51hgt7mdaSFGmBZO/fcpujHTMecZyfo5pLAthC3Ex7rcdnyALhMi3TbOu6/MLj4W0lOdwAU9p4peDWzALjcYWYtuja0Ag1wPb+HBAAAAPxU/wFLtLrSYO7sawAAAABJRU5ErkJggg=="/>
      <path class="cls-19" d="M772.86,463.36c0-6.43,4.38-11.64,9.77-11.64h329.28c5.4,0,9.77,5.21,9.77,11.64v46.56c0,6.43-4.38,11.64-9.77,11.64h-329.28c-5.4,0-9.77-5.21-9.77-11.64v-46.56Z"/>
    </g>
    <text class="cls-8" transform="translate(843.31 479.64)"><tspan class="cls-91" x="0" y="0">U</tspan><tspan class="cls-119" x="16.75" y="0">N</tspan><tspan x="34.14" y="0">BO</tspan><tspan class="cls-119" x="67.27" y="0">N</tspan><tspan class="cls-99" x="84.66" y="0">D</tspan><tspan class="cls-97" x="101.6" y="0">E</tspan><tspan class="cls-46" x="115.75" y="0">D</tspan><tspan class="cls-66" x="133.07" y="0">-</tspan><tspan class="cls-119" x="141.72" y="0">P</tspan><tspan x="156.77" y="0">O</tspan><tspan class="cls-27" x="174.37" y="0">S</tspan><tspan x="188.84" y="0">T </tspan><tspan x="-23.11" y="27.61">T</tspan><tspan class="cls-97" x="-9.58" y="27.61">E</tspan><tspan class="cls-38" x="4.57" y="27.61">N</tspan><tspan class="cls-28" x="21.85" y="27.61">S</tspan><tspan class="cls-5" x="36.16" y="27.61">IO</tspan><tspan class="cls-81" x="60.96" y="27.61">NI</tspan><tspan x="85.57" y="27.61">NG </tspan><tspan class="cls-82" x="125.79" y="27.61">S</tspan><tspan class="cls-107" x="140.05" y="27.61">Y</tspan><tspan class="cls-125" x="154.07" y="27.61">S</tspan><tspan x="168.54" y="27.61">TE</tspan><tspan class="cls-66" x="196.28" y="27.61">M</tspan><tspan x="216.44" y="27.61">S</tspan></text>
  </g>
    </svg>

    <h2
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    margin: '60px 0'
  }}
>
  {/* Left line */}
  <span
    style={{
      flex: 1,
      height: '4px',
      backgroundColor: '#2b387a'
    }}
  />

  {/* Text */}
  <span
    style={{
      fontSize: '66px',
      fontWeight: '800',
      letterSpacing: '2px',
      color: '#2b387a',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap'
    }}
  >
    PRESTRESSING
  </span>

  {/* Right line */}
  <span
    style={{
      flex: 1,
      height: '4px',
      backgroundColor: '#2b387a'
    }}
  />
</h2>
<div
  style={{
    display: 'flex',
    alignItems: 'flex-start',
    maxWidth: '1400px',
    margin: '0 auto'
  }}
>
  {/* LEFT – IMAGE / DIAGRAM */}
  <div style={{ flex: '1', marginLeft:'50px'}}>
    <img
      src="/assets/prestressing-diagram.jpeg"
      alt="Prestressing Diagram"
      style={{
        width: 'auto',
        height: '500px',
        display: 'block',
        marginTop: '-10px'
      }}
    />
  </div>

  {/* RIGHT – TEXT */}
  <div
    style={{
      flex: '1',
      fontSize: '1rem',
      lineHeight: '1.7',
      color: '#000',
      marginLeft: '-60px'
    }}
  >
    <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#333',
              margin: 0,
              textAlign: 'justify',
              fontWeight: '600'
            }}>
      Prestressing is a structural technique in which internal compressive
      forces are intentionally introduced into concrete before it is subjected
      to service loads. This is achieved by tensioning high-strength steel
      tendons placed within or adjacent to the concrete, thereby counteracting
      tensile stresses that would otherwise lead to cracking.
    </p>

    <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#333',
              margin: 0,
              textAlign: 'justify',
              fontWeight: '600',
              marginTop: '20px'
            }}>
      Tendons may consist of single wires, multi-wire strands, or threaded bars
      manufactured from high-tensile steel or advanced composite materials.
      Once prestress is applied, the concrete–steel system behaves as a
      composite structural element, combining the compressive strength of
      concrete with the tensile capacity of steel.
    </p>

    <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#333',
              margin: 0,
              textAlign: 'justify',
              fontWeight: '600',
              marginTop: '20px'
            }}>
      Prestressed concrete enables longer spans, reduced structural depth,
      improved crack control, and material efficiency, making it a preferred
      system for performance-driven structures.
    </p>
  </div>
</div>

      </section>
      </div>
    </>
  );
};

export default Technology;
