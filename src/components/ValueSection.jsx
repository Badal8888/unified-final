import { useState } from 'react';
import './ValueSection.css';

const sectors = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
      </svg>
    ),
    title: 'HOSPITALS',
    image: '/assets/construction-site.jpg',
    description: 'These projects need fast, disruption-free construction and long, flexible floor plans. That\'s why the demand for PT systems in hospitals is consistently high — they simply cannot work with slow, beam-heavy structures.'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 13h-4v-3h4v3zm-6 0h-4v-3h4v3zm-6 0H3v-3h4v3zm12-5h-4V5h4v3zm-6 0h-4V5h4v3zM7 8H3V5h4v3zm12 10h-4v-3h4v3zm-6 0h-4v-3h4v3zm-6 0H3v-3h4v3zM21 3H1v18h20V3z"/>
      </svg>
    ),
    title: 'INDUSTRIAL',
    image: '/assets/construction-site-with-cranes-dubai.jpg',
    description: 'Factories and warehouses require uninterrupted floor areas and high load-carrying slabs. PT meets these needs directly, keeping it in steady demand for industrial construction.'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    ),
    title: 'RESIDENTIAL',
    image: '/assets/1.jpg',
    description: 'Residential builders focus on faster possession dates and controlled construction costs. PT helps them achieve quicker slab cycles and reduced material usage, making it one of the most requested systems in housing projects.'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
      </svg>
    ),
    title: 'COMMERCIAL',
    image: '/assets/construction-houses-israel-2022view-building-complex-vintage-processing-selective-focus.jpg',
    description: 'Commercial spaces are always chasing maximum usable area and higher rental value. Developers prefer PT because it delivers open floors that sell and lease faster — making it a heavily demanded system in this sector.'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"/>
      </svg>
    ),
    title: 'BASEMENTS',
    image: '/assets/construction-site.jpg',
    description: 'Basement construction faces height restrictions and heavy loads. PT solutions are widely preferred because they reduce slab thickness and simplify complex underground layouts.'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z"/>
      </svg>
    ),
    title: 'SKYSCRAPERS',
    image: '/assets/construction-site-with-cranes-dubai.jpg',
    description: 'High-rise developers can\'t afford bulky, inefficient structural systems. They need lightweight, high-performance slabs — which is why PT is the go-to choice for towers and premium vertical projects.'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"/>
      </svg>
    ),
    title: 'FOUNDATION SLAB',
    image: '/assets/1.jpg',
    description: 'Foundation work demands high strength, crack control, and long-term durability. PT systems stay in strong demand here because they deliver thinner, stronger slabs that handle heavy structural loads without long-term performance issues.'
  }
];

const ValueSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="value-section">
      {/* Background decoration */}
      <div className="value-bg-decoration"></div>

      <div className="value-container">
        <h2 className="value-main-title">WHERE POST-TENSIONING CREATES VALUE</h2>

        <div className="value-content">
          {/* Left Side - Text + Image */}
          <div className="value-left">
            <div className="value-intro">
              <p className="value-intro-highlight">Post-tensioning is<br />not just reinforcement.</p>
              <p className="value-intro-text">
                It is a structural strategy that transforms slab efficiency, reduces overall cost, and expands architectural possibilities.
              </p>
            </div>
            <div className="value-image-box">
              {sectors.map((sector, index) => (
                <img 
                  key={index}
                  src={sector.image} 
                  alt={sector.title}
                  className={activeIndex === index ? 'active' : ''}
                />
              ))}
            </div>
          </div>

          {/* Sectors List */}
          <div className="value-right">
            {sectors.map((sector, index) => (
              <div 
                key={index} 
                className={`sector-item ${activeIndex === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className="sector-icon-wrapper">
                  <div className="sector-icon">{sector.icon}</div>
                </div>
                <div className="sector-tag">
                  <h3 className="sector-title">{sector.title}</h3>
                </div>
                <div className="sector-desc-box">
                  <p className="sector-description">{sector.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
