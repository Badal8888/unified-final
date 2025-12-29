import { useEffect, useRef, useState } from 'react';
import './WhyUnified.css';

const AnimatedNumber = ({ target, isVisible, delay }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    const timeout = setTimeout(() => {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);
      
      const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(counter);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(counter);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [isVisible, target, delay]);

  return <span>{count}%</span>;
};

const WhyUnified = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const metrics = [
    {
      percentage: 92,
      gradientId: 'gradient1',
      gradientColors: ['#4DD0E1', '#0095AA', '#26A69A'],
      textColor: '#c94a4a',
      label: 'On-schedule stressing and handover across major sites.'
    },
    {
      percentage: 88,
      gradientId: 'gradient2',
      gradientColors: ['#5ED5E8', '#0095AA', '#2DB5A8'],
      textColor: '#c94a4a',
      label: 'Design-execution accuracy across slab layouts, tendon profiles, and detailing.'
    },
    {
      percentage: 95,
      gradientId: 'gradient3',
      gradientColors: ['#6EDEF0', '#0095AA', '#34C4B6'],
      textColor: '#c94a4a',
      label: 'Client approval and repeat-engagement rate in the last 5 years.'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="why-unified-section" ref={sectionRef}>
      <div className="why-unified-container">
        {/* Header */}
        <div className="why-unified-header">
          <h2 className="why-unified-title">WHY UNIFIED</h2>
        </div>

        {/* Description */}
        <div className="why-unified-description">
          <p className="why-unified-text">
            Post-tensioning systems deliver results only when <strong>engineering intent and site execution are perfectly aligned.</strong>
          </p>
          <p className="why-unified-text">
            Unified is chosen not just for the system we provide, but for the <strong>discipline, accuracy, and reliability with which we deliver it.</strong>
          </p>
        </div>

        {/* Our Edge Title - Outside grey box */}
        <h3 className="our-edge-title">OUR EDGE</h3>
        
        {/* Our Edge Section - Grey box */}
        <div className="our-edge-section">
          <div className="metrics-container">
            {metrics.map((metric, index) => (
              <div key={index} className="metric-item">
                <div className="circle-progress-wrapper">
                  <div className="circle-background"></div>
                  <svg className="circle-progress" viewBox="0 0 120 120">
                    {/* Gradient Definition */}
                    <defs>
                      <linearGradient id={metric.gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={metric.gradientColors[0]} />
                        <stop offset="50%" stopColor={metric.gradientColors[1]} />
                        <stop offset="100%" stopColor={metric.gradientColors[2]} />
                      </linearGradient>
                    </defs>
                    {/* Background circle */}
                    <circle
                      className="circle-bg"
                      cx="60"
                      cy="60"
                      r="48"
                      fill="none"
                      stroke="#e0e0e0"
                      strokeWidth="8"
                    />
                    {/* Progress circle with gradient */}
                    <circle
                      className={`circle-fill ${isVisible ? 'animate' : ''}`}
                      cx="60"
                      cy="60"
                      r="48"
                      fill="none"
                      stroke={`url(#${metric.gradientId})`}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 48}`}
                      strokeDashoffset={isVisible ? `${2 * Math.PI * 48 * (1 - metric.percentage / 100)}` : `${2 * Math.PI * 48}`}
                      style={{
                        transition: 'stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)',
                        transitionDelay: `${index * 0.3}s`
                      }}
                    />
                  </svg>
                  <div className={`percentage-text ${isVisible ? 'visible' : ''}`}>
                    <AnimatedNumber target={metric.percentage} isVisible={isVisible} delay={index * 300} />
                  </div>
                </div>
                <p className="wu-metric-label">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUnified;

