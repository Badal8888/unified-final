import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WhoWeAre.css';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'Reduce overall structural weight',
  'Accelerate slab construction cycles',
  'Enable free, flexible architectural planning',
  'Improve long-term durability and serviceability'
];

const cards = [
  {
    id: 1,
    image: '/assets/construction-site.jpg',
    title: 'BONDED POST-TENSIONING',
    description: 'Bonded PT offers superior crack control, long-term durability, and high structural reliability for slabs that demand precision and safety under heavy loads.'
  },
  {
    id: 2,
    image: '/assets/construction-site-with-cranes-dubai.jpg',
    title: 'UNBONDED POST-TENSIONING',
    description: 'Unbonded PT provides faster construction cycles, flexible floor planning, and efficient performance for modern high-rise and commercial projects.'
  }
];

const WhoWeAre = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  // Horizontal scroll functionality removed
  // useEffect(() => {
  //   const section = sectionRef.current;
  //   const trigger = triggerRef.current;
  //   
  //   const totalWidth = section.scrollWidth - window.innerWidth;

  //   const horizontalScroll = gsap.to(section, {
  //     x: -totalWidth,
  //     ease: 'none',
  //     scrollTrigger: {
  //       trigger: trigger,
  //       start: 'top 0',
  //       end: () => `+=${totalWidth}`,
  //       pin: true,
  //       pinSpacing: true,
  //       scrub: 0.5,
  //       anticipatePin: 1,
  //       invalidateOnRefresh: true,
  //     }
  //   });

  //   const handleResize = () => {
  //     ScrollTrigger.refresh();
  //   };
  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     horizontalScroll.kill();
  //     ScrollTrigger.getAll().forEach(t => t.kill());
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  return (
    <section className="pt-capabilities-wrapper" ref={triggerRef}>
      {/* Background decorations */}
      <div className="pt-bg-decoration"></div>

      <div className="pt-horizontal-container" ref={sectionRef}>
        {/* Combined Panel: POST-TENSIONING ENGINEERING CAPABILITIES + OUR SYSTEMS ARE ENGINEERED TO */}
        <div className="pt-panel">
          <div className="pt-panel-content">
            <h2 className="pt-main-title">
              POST-TENSIONING ENGINEERING <span className="title-break">CAPABILITIES</span>
            </h2>
            
            <div className="pt-content-grid">
              <div className="pt-text-content">
                <p className="pt-paragraph">
                  Unified specialises in the engineering and execution of post-tensioning systems where 
                  structural efficiency, speed of construction, and long-span performance directly influence 
                  project feasibility.
                </p>
                <p className="pt-paragraph">
                  Post-tensioning is integrated into the structural system as a design strategy—not applied 
                  as a standardised solution. Our approach enhances concrete behaviour, optimises load paths, 
                  reduces unnecessary material consumption, and maximises usable space within the structure.
                </p>
              </div>

              <div className="pt-video-container">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="pt-video"
                >
                  <source src="/assets/freepik__aerial-view-of-a-cityscape-featuring-tall-building__66635.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          {/* OUR SYSTEMS ARE ENGINEERED TO Section - Connected */}
          <div className="systems-panel">
            {/* Tagline with white background */}
            <h2 className="systems-title">OUR SYSTEMS ARE ENGINEERED TO</h2>
            
            {/* Sky Blue Container */}
            <div className="systems-sky-blue-container">
              {/* 4 Feature Buttons */}
              <div className="systems-features">
                {features.map((feature, index) => (
                  <div key={index} className="feature-pill">
                    <span className="feature-check">✓</span>
                    {feature}
                  </div>
                ))}
              </div>

              {/* #0095AA Container - Inside sky blue */}
              <div className="systems-teal-container">
                {/* Background Image */}
                <div className="systems-bg-blueprint"></div>
                
                {/* Cards with outlines - Inside #0095AA section */}
                <div className="systems-cards">
                  {cards.map((card) => (
                    <div key={card.id} className="system-card">
                      <div className="system-card-image">
                        <img src={card.image} alt={card.title} />
                      </div>
                      <div className="system-card-content">
                        <h3 className="system-card-title">{card.title}</h3>
                        <p className="system-card-description">{card.description}</p>
                        <button className="system-card-btn">
                          <span className="btn-icon">›</span>
                          Learn more
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
