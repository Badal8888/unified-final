import { useState, useEffect, useRef } from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(350);
  const trackRef = useRef(null);

  useEffect(() => {
    const updateCardWidth = () => {
      if (window.innerWidth <= 480) {
        setCardWidth(290);
      } else if (window.innerWidth <= 768) {
        setCardWidth(310);
      } else if (window.innerWidth <= 1024) {
        setCardWidth(310);
      } else {
        setCardWidth(350);
      }
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      title: 'Project Manager, L&T Construction',
      rating: 5,
      text: 'Unified delivered exceptional post-tensioning solutions for our high-rise project. Their precision and on-time delivery exceeded our expectations.'
    },
    {
      id: 2,
      name: 'Amit Sharma',
      title: 'Chief Engineer, Shapoorji Pallonji',
      rating: 5,
      text: 'The technical expertise and execution quality from Unified team is unmatched. They have become our go-to partner for all PT requirements.'
    },
    {
      id: 3,
      name: 'Priya Mehta',
      title: 'Director, Oberoi Realty',
      rating: 5,
      text: 'Working with Unified has been a game-changer for our projects. Their engineering solutions helped us achieve larger spans with reduced costs.'
    },
    {
      id: 4,
      name: 'Vikram Singh',
      title: 'VP Engineering, Godrej Properties',
      rating: 5,
      text: 'Unified commitment to quality and their innovative approach to post-tensioning has made them an invaluable partner for our developments.'
    },
    {
      id: 5,
      name: 'Suresh Patel',
      title: 'Technical Head, Prestige Group',
      rating: 5,
      text: 'The reliability and professionalism of Unified team sets them apart. They consistently deliver results that meet our stringent quality standards.'
    }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Create infinite loop array (clone first few items at end)
  const getInfiniteSlides = () => {
    return [...testimonials, ...testimonials, ...testimonials];
  };

  const infiniteSlides = getInfiniteSlides();

  // Auto slide every 4 seconds - only forward
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Reset position seamlessly when reaching end
  useEffect(() => {
    if (currentIndex >= testimonials.length * 2) {
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(testimonials.length);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 600);
    }
  }, [currentIndex, testimonials.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    // Only go forward, wrap around
    nextSlide();
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        {/* Header */}
        <div className="testimonials-header">
          <span className="testimonials-subtitle">What our customers say about us</span>
          <h2 className="testimonials-title">Testimonials</h2>
          <div className="testimonials-title-bg">Testimonials</div>
        </div>

        {/* Carousel */}
        <div className="testimonials-carousel">
          {/* Previous Button */}
          <button className="carousel-btn carousel-btn-prev" onClick={prevSlide}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Cards Track */}
          <div className="testimonials-track-wrapper">
            <div 
              ref={trackRef}
              className={`testimonials-track ${isTransitioning ? 'no-transition' : ''}`}
              style={{ transform: `translateX(-${currentIndex * cardWidth}px)` }}
            >
              {infiniteSlides.map((testimonial, idx) => (
                <div
                  key={`${testimonial.id}-${idx}`}
                  className={`testimonial-card ${idx === currentIndex ? 'active' : ''}`}
                >
                  <h4 className="testimonial-name">{testimonial.name}</h4>
                  <span className="testimonial-title">{testimonial.title}</span>
                  <div className="testimonial-stars">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="testimonial-text">{testimonial.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button className="carousel-btn carousel-btn-next" onClick={nextSlide}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;

