import './OurClients.css';

const OurClients = () => {
  // Row 1 logos (1-30)
  const row1Logos = Array.from({ length: 30 }, (_, i) => `/Client-Logos/${i + 1}.png`);
  
  // Row 2 logos (31-59)
  const row2Logos = Array.from({ length: 29 }, (_, i) => `/Client-Logos/${i + 31}.png`);

  // Double the arrays for seamless infinite scroll
  const doubledRow1 = [...row1Logos, ...row1Logos];
  const doubledRow2 = [...row2Logos, ...row2Logos];

  return (
    <section className="our-clients-section">
      <div className="our-clients-container">
        {/* Title */}
        <h2 className="our-clients-title">OUR CLIENTS</h2>

        {/* Slider Container */}
        <div className="clients-slider-container">
          {/* Row 1 - Left to Right */}
          <div className="clients-row row-1">
            <div className="clients-track track-ltr">
              {doubledRow1.map((logo, index) => (
                <div key={`row1-${index}`} className="client-logo-wrapper">
                  <img src={logo} alt={`Client ${index + 1}`} className="client-logo" />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Right to Left (offset by half) */}
          <div className="clients-row row-2">
            <div className="clients-track track-rtl">
              {doubledRow2.map((logo, index) => (
                <div key={`row2-${index}`} className="client-logo-wrapper">
                  <img src={logo} alt={`Client ${index + 1}`} className="client-logo" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurClients;

