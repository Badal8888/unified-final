import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WhatWeDo.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: 1,
    image: '/assets/construction-site.jpg',
    title: 'POST-TENSIONING ENGINEERING',
    description: 'Unified specialises in the engineering and execution of post-tensioning systems where structural efficiency, speed of construction, and long-span performance directly influence project feasibility.'
  },
  {
    id: 2,
    image: '/assets/construction-site-with-cranes-dubai.jpg',
    title: 'BONDED POST-TENSIONING',
    description: 'Bonded PT offers superior crack control, long-term durability, and high structural reliability for slabs that demand precision and safety under heavy loads.'
  },
  {
    id: 3,
    image: '/assets/construction-houses-israel-2022view-building-complex-vintage-processing-selective-focus.jpg',
    title: 'UNBONDED POST-TENSIONING',
    description: 'Unbonded PT provides faster construction cycles, flexible floor planning, and efficient performance for modern high-rise and commercial projects.'
  },
  {
    id: 4,
    image: '/assets/1.jpg',
    title: 'INTEGRATED DESIGN STRATEGY',
    description: 'Post-tensioning is integrated into the structural system as a design strategy—not applied as a standardised solution. Our approach enhances concrete behaviour and maximises usable space.'
  }
];

const WhatWeDo = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const slidesRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    
    // Calculate total scroll width
    const totalWidth = section.scrollWidth - window.innerWidth;

    // Create the horizontal scroll animation - snappy scrub for direct transitions
    const horizontalScroll = gsap.to(section, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger,
        start: 'top 0',
        end: () => `+=${totalWidth}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: {
          snapTo: 1 / (slides.length - 1),
          duration: { min: 0.2, max: 0.4 },
          ease: 'power1.inOut'
        }
      }
    });

    // Animate image from completely off-screen (bottom) to its position
    const totalSlides = slidesRef.current.length;
    
    slidesRef.current.forEach((slide, index) => {
      if (!slide) return;
      
      const imageWrapper = slide.querySelector('.slide-image-wrapper');
      const startY = window.innerHeight; // Start from completely off-screen

      // First slide image at normal position
      if (index === 0) {
        gsap.set(imageWrapper, { y: 0 });
      } else {
        // Other slides - image starts from completely below viewport
        gsap.set(imageWrapper, { y: startY });
      }

      // Skip animation for first slide
      if (index === 0) return;

      // Create animation for each slide's image
      const slideStart = index * window.innerWidth;
      const isLastSlide = index === totalSlides - 1;

      ScrollTrigger.create({
        trigger: trigger,
        start: 'top 0',
        end: () => `+=${totalWidth}`,
        scrub: 0.5,
        onUpdate: (self) => {
          const scrollProgress = self.progress * totalWidth;
          const slideProgress = (scrollProgress - slideStart + window.innerWidth * 0.7) / window.innerWidth;
          
          // For last slide, ensure it reaches final position
          let animProgress;
          if (isLastSlide) {
            animProgress = Math.min(Math.max(slideProgress * 2, 0), 1);
          } else {
            animProgress = Math.min(Math.max(slideProgress * 1.5, 0), 1);
          }
          
          // Image moves from completely off-screen to normal position - smooth
          gsap.to(imageWrapper, {
            y: startY * (1 - animProgress),
            duration: 0.4,
            ease: 'power2.out',
            overwrite: true
          });
        }
      });
    });

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      horizontalScroll.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="what-we-do-wrapper" ref={triggerRef}>
      {/* Large Background Outlined Text */}
      <div className="what-we-do-bg-text">WHAT WE DO</div>
      
      <div className="what-we-do-header">
        <h2>WHAT WE DO</h2>
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-arrow">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="horizontal-scroll-container" ref={sectionRef}>
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className="slide-panel"
            ref={el => slidesRef.current[index] = el}
          >
            <div className="slide-inner">
              <div className="slide-content">
                <span className="slide-number">0{slide.id}</span>
                <h3 className="slide-title">{slide.title}</h3>
                <p className="slide-description">{slide.description}</p>
                <button className="slide-cta">
                  Learn More
                  <span className="cta-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
              </div>
              <div className="slide-image-wrapper">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="slide-image"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </section>
  );
};

export default WhatWeDo;
