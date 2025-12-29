import './CompletedProjects.css';

const projects = [
  {
    id: 1,
    title: 'Dubai Marina Tower',
    location: 'Dubai, UAE',
    image: '/assets/construction-site-with-cranes-dubai.jpg',
    category: 'Commercial'
  },
  {
    id: 2,
    title: 'Al Reem Hospital',
    location: 'Abu Dhabi, UAE',
    image: '/assets/construction-site.jpg',
    category: 'Hospital'
  },
  {
    id: 3,
    title: 'Palm Residences',
    location: 'Dubai, UAE',
    image: '/assets/1.jpg',
    category: 'Residential'
  },
  {
    id: 4,
    title: 'Jebel Ali Industrial',
    location: 'Dubai, UAE',
    image: '/assets/construction-houses-israel-2022view-building-complex-vintage-processing-selective-focus.jpg',
    category: 'Industrial'
  },
  {
    id: 5,
    title: 'Downtown Business Center',
    location: 'Sharjah, UAE',
    image: '/assets/construction-site-with-cranes-dubai.jpg',
    category: 'Commercial'
  },
  {
    id: 6,
    title: 'Skyline Tower',
    location: 'Dubai, UAE',
    image: '/assets/construction-site.jpg',
    category: 'Skyscraper'
  },
  {
    id: 7,
    title: 'Green Valley Homes',
    location: 'Abu Dhabi, UAE',
    image: '/assets/1.jpg',
    category: 'Residential'
  }
];

const CompletedProjects = () => {
  // Double the projects array for seamless infinite loop
  const doubledProjects = [...projects, ...projects];

  return (
    <section className="cp-section">
      {/* Main Container with dancing gradient */}
      <div className="cp-main-container">
        {/* Title */}
        <div className="cp-title-box">
          <h2 className="cp-main-title">COMPLETED PROJECTS</h2>
        </div>

        {/* Infinite Slider */}
        <div className="cp-slider-wrapper">
          <div className="cp-slider-track">
            {doubledProjects.map((project, index) => (
              <div key={`${project.id}-${index}`} className="cp-image-card">
                <div className="cp-image-wrapper">
                  <img src={project.image} alt={project.title} />
                  
                  {/* Overlay on hover */}
                  <div className="cp-image-overlay">
                    <span className="cp-category">{project.category}</span>
                    <h3 className="cp-project-title">{project.title}</h3>
                    <p className="cp-location">{project.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <section style={{
        position: 'relative',
        width: '100%',
        background: '#ffffff',
        padding: '30px 0',
        overflow: 'hidden',
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
      </div>
    </section>
  );
};

export default CompletedProjects;
