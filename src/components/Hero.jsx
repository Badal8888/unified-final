import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    years: 0,
    projects: 0,
    cities: 0,
    engineers: 0
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const statsRef = useRef(null);
  const heroRef = useRef(null);

  const slides = [
    {
      image: '/assets/1.jpg',
      title: "India's Trusted Authority in",
      highlight: 'Bonded & Unbonded Post-Tensioning Systems',
      description: 'We engineer high-performance structural solutions that speed up construction, reduce material consumption, and deliver larger, smarter, more efficient buildings.'
    },
    {
      image: '/assets/construction-site.jpg',
      title: 'Excellence in',
      highlight: 'Structural Engineering Solutions',
      description: 'Our approach blends advanced engineering, precise execution, and a deep understanding of modern architectural requirements for superior results.'
    },
    {
      image: '/assets/construction-site-with-cranes-dubai.jpg',
      title: 'Building the Future with',
      highlight: 'Innovative PT Technology',
      description: 'From design to execution, we provide end-to-end post-tensioning solutions that transform the way structures are built across India.'
    },
    {
      image: '/assets/construction-houses-israel-2022view-building-complex-vintage-processing-selective-focus.jpg',
      title: 'Committed to',
      highlight: 'Quality & Precision',
      description: 'With years of expertise and a dedicated team, we ensure every project meets the highest standards of structural integrity and efficiency.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4); // 4 slides
    }, 8000); // 8 seconds - very slow slide transition

    return () => clearInterval(interval);
  }, []); // Empty dependency - run only once

  // Scroll animation for numbers
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateNumbers();
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px'
      }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated]);

  const animateNumbers = () => {
    const targets = {
      years: 8,
      projects: 380,
      cities: 84,
      engineers: 171
    };

    const duration = 2500; // 2.5 seconds for smoother animation
    const steps = 120; // More steps for smoother animation
    const stepDuration = duration / steps;

    let currentStep = 0;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easing function (easeOutCubic)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);

      setAnimatedNumbers({
        years: Math.floor(targets.years * easeOutCubic),
        projects: Math.floor(targets.projects * easeOutCubic),
        cities: Math.floor(targets.cities * easeOutCubic),
        engineers: Math.floor(targets.engineers * easeOutCubic)
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Ensure final values are set
        setAnimatedNumbers({
          years: targets.years,
          projects: targets.projects,
          cities: targets.cities,
          engineers: targets.engineers
        });
      }
    };

    requestAnimationFrame(animate);
  };

  // Scroll-based slide animation for hero sections
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const heroElement = heroRef.current;
          if (heroElement) {
            const heroRect = heroElement.getBoundingClientRect();
            const heroHeight = heroElement.offsetHeight;
            const viewportHeight = window.innerHeight;
            
            // Calculate scroll progress within hero section
            // 0 when hero is at top, 1 when hero is completely scrolled past
            let progress = 0;
            
            if (heroRect.top < 0) {
              // Hero is being scrolled past
              const scrolledPast = Math.abs(heroRect.top);
              progress = Math.min(scrolledPast / heroHeight, 1);
            } else if (heroRect.top <= viewportHeight) {
              // Hero is in view, calculate progress based on how much is visible
              const visibleHeight = heroRect.bottom;
              const totalScrollable = heroHeight + viewportHeight;
              progress = Math.max(0, (viewportHeight - visibleHeight) / totalScrollable);
            }
            
            setScrollProgress(progress);
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="hero-bg-video"
      >
        <source src="/assets/456584_Drone_Landscape_Bangkok_3840x2160.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay"></div>

      <div className="hero-container">
        {/* Left Side - Image Slider */}
        <div 
          className="hero-left"
          style={{
            transform: `translateY(${scrollProgress * 50}px)`,
            opacity: 1 - scrollProgress * 0.5
          }}
        >
          <div className="hero-image-card">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`slide ${index === currentSlide ? 'active' : ''}`}
              >
                <img 
                  src={slide.image} 
                  alt={slide.highlight} 
                  className="hero-main-image"
                />
                <div className="hero-image-content">
                  <div className="hero-text-box">
                    <h1 className="hero-title">
                      {slide.title} <span className="highlight">{slide.highlight}</span>
                    </h1>
                    <div className="hero-description">
                      <p>{slide.description}</p>
                      <p className="hero-description-extra">Our approach blends advanced engineering, precise execution, and a deep understanding of modern architectural requirements.</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
          </div>
        </div>

        {/* Right Side - Stats and Info */}
        <div 
          className="hero-right"
          style={{
            transform: `translateY(${scrollProgress * 80}px)`,
            opacity: 1 - scrollProgress * 0.6
          }}
        >
          {/* Statistics Section - White Card */}
          <div className="hero-stats-section" ref={statsRef}>
            <h2 className="hero-right-title">Transforming Landscapes With Expert Engineering</h2>
            
            {/* Statistics Grid */}
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-number">{animatedNumbers.years}+</div>
                <div className="stat-label">Years of experience</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{animatedNumbers.projects}+</div>
                <div className="stat-label">Projects Done</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{animatedNumbers.cities}+</div>
                <div className="stat-label">Cities Of Work</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{animatedNumbers.engineers}+</div>
                <div className="stat-label">Structural Engineers & Architects</div>
              </div>
            </div>
          </div>

          {/* Explore PT Systems Section - Light Blue Card */}
          <div className="explore-section">
            <div className="explore-images">
              <div className="explore-image">
                <img src="/assets/1.jpg" alt="PT System" />
              </div>
              <div className="explore-image">
                <img src="/assets/construction-site.jpg" alt="PT System" />
              </div>
            </div>
            <div className="explore-content">
              <h3 className="explore-title">EXPLORE OUR PT SYSTEMS</h3>
              <Link to="/technology" className="btn-technology">
                Visit Technology
                <span className="btn-arrow">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* News Ticker */}
      <div className="ticker-wrapper">
        <div className="ticker">
          <div className="ticker-content">
            <span className="ticker-item">★ Quality Matters, Over Quantity ★</span>
            <span className="ticker-item">★ Post-tensioning you can trust ★</span>
            <span className="ticker-item">★ Delivering structural efficiency every time ★</span>
            <span className="ticker-item">★ Quality Matters, Over Quantity ★</span>
            <span className="ticker-item">★ Post-tensioning you can trust ★</span>
            <span className="ticker-item">★ Delivering structural efficiency every time ★</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
