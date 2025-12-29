import React from 'react';

const VisionValuesMission = () => {
  return (
    <div style={{ marginBottom: '50px', position: 'relative' }}>
      {/* Vision Box - Top */}
      <div style={{ 
        position: 'relative',
        marginBottom: '50px',
        padding: '40px', 
        background: '#fff', 
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto 50px'
      }}>
        {/* Eye Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          background: '#0095aa',
          borderRadius: '50%',
          margin: '0 auto 25px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4C7 4 2.73 7.11 1 11.5C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 11.5C21.27 7.11 17 4 12 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: '700', color: '#000', textTransform: 'uppercase' }}>VISION</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.9', color: '#333', margin: 0 }}>
          To become the most preferred choice of real estate developers, structural consultants and architects of India and assist them in creating robust infrastructure for our modern India.
        </p>
      </div>

      {/* Dotted Line Down from Vision */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '50px',
        position: 'relative'
      }}>
        <div style={{
          width: '0',
          height: '60px',
          borderLeft: '2px dashed #0095aa',
          position: 'relative'
        }}></div>
      </div>

      {/* Values - Middle Section */}
      <div style={{ 
        marginBottom: '50px',
        padding: '40px',
        background: '#e8e8e8',
        borderRadius: '12px',
        position: 'relative',
        maxWidth: '1400px',
        margin: '0 auto 50px',
        width: '100%'
      }}>
        {/* Diamond Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          background: '#0095aa',
          borderRadius: '50%',
          margin: '0 auto 25px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 3H18L22 7L12 22L2 7L6 3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: '15px', fontWeight: '700', color: '#fff', textTransform: 'uppercase', textAlign: 'center' }}>VALUES</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#333', textAlign: 'center', marginBottom: '40px' }}>
          The following principles drive our commitment to quality, responsibility, and long-term excellence:
        </p>

        {/* Dotted Line from Values Center */}
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '0',
          height: '60px',
          borderLeft: '2px dashed #0095aa',
          zIndex: 1
        }}></div>

        {/* Five Values Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '30px',
          position: 'relative',
          marginTop: '40px'
        }}>
          {/* INTEGRITY */}
          <div style={{ 
            padding: '25px', 
            background: '#fff', 
            borderRadius: '10px', 
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            position: 'relative',
            textAlign: 'center'
          }}>
            {/* Handshake Icon */}
            <div style={{
              width: '60px',
              height: '60px',
              margin: '0 auto 15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 14H9C8.46957 14 7.96086 13.7893 7.58579 13.4142C7.21071 13.0391 7 12.5304 7 12V9C7 8.46957 7.21071 7.96086 7.58579 7.58579C7.96086 7.21071 8.46957 7 9 7H11" stroke="#0095aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13 14H15C15.5304 14 16.0391 13.7893 16.4142 13.4142C16.7893 13.0391 17 12.5304 17 12V9C17 8.46957 16.7893 7.96086 16.4142 7.58579C16.0391 7.21071 15.5304 7 15 7H13" stroke="#0095aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 7V5C11 4.46957 11.2107 3.96086 11.5858 3.58579C11.9609 3.21071 12.4696 3 13 3H15C15.5304 3 16.0391 3.21071 16.4142 3.58579C16.7893 3.96086 17 4.46957 17 5V7" stroke="#0095aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 11V9C7 7.93913 7.42143 6.92172 8.17157 6.17157C8.92172 5.42143 9.93913 5 11 5H13C14.0609 5 15.0783 5.42143 15.8284 6.17157C16.5786 6.92172 17 7.93913 17 9V11" stroke="#0095aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '1.1rem', color: '#0095aa', marginBottom: '12px', fontWeight: '700', textTransform: 'uppercase' }}>INTEGRITY</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#666', margin: 0 }}>
              We are recognized and respected across the industry for our utmost commitment to honesty and transparency.
            </p>
          </div>

          {/* INNOVATION */}
          <div style={{ 
            padding: '25px', 
            background: '#fff', 
            borderRadius: '10px', 
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            position: 'relative',
            textAlign: 'center'
          }}>
            {/* Lightbulb Icon */}
            <div style={{
              width: '60px',
              height: '60px',
              margin: '0 auto 15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H15" stroke="#0095aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 3C8.5 3 6 5.5 6 9C6 11.5 7.5 13.5 9 15V18H15V15C16.5 13.5 18 11.5 18 9C18 5.5 15.5 3 12 3Z" stroke="#0095aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '1.1rem', color: '#0095aa', marginBottom: '12px', fontWeight: '700', textTransform: 'uppercase' }}>INNOVATION</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#666', margin: 0 }}>
              We constantly strive to be more creative in our thinking and more efficient in our performance. Our determination to be the best in business by offering world-class products and services to customers.
            </p>
          </div>

          {/* TEAMWORK */}
          <div style={{ 
            padding: '25px', 
            background: '#fff', 
            borderRadius: '10px', 
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            position: 'relative',
            textAlign: 'center'
          }}>
            {/* Team Icon */}
            <div style={{
              width: '60px',
              height: '60px',
              margin: '0 auto 15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#0095aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#0095aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#0095aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#0095aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '1.1rem', color: '#0095aa', marginBottom: '12px', fontWeight: '700', textTransform: 'uppercase' }}>TEAMWORK</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#666', margin: 0 }}>
              Fostering a culture of teamwork allows us to work together within the company as well as with our customers to deliver better solutions.
            </p>
            {/* Dotted line from bottom */}
            <div style={{
              position: 'absolute',
              bottom: '-30px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0',
              height: '30px',
              borderLeft: '2px dashed #0095aa'
            }}></div>
          </div>

          {/* CUSTOMER FIRST */}
          <div style={{ 
            padding: '25px', 
            background: '#fff', 
            borderRadius: '10px', 
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            position: 'relative',
            textAlign: 'center'
          }}>
            {/* Customer Icon */}
            <div style={{
              width: '60px',
              height: '60px',
              margin: '0 auto 15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#0095aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#0095aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="18" cy="7" r="3" stroke="#0095aa" strokeWidth="2"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '1.1rem', color: '#0095aa', marginBottom: '12px', fontWeight: '700', textTransform: 'uppercase' }}>CUSTOMER FIRST</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#666', margin: 0 }}>
              Customer satisfaction is at the heart of our organization. We believe in sharing success through strong and long-term relationships with our customers.
            </p>
            {/* Dotted line from bottom */}
            <div style={{
              position: 'absolute',
              bottom: '-30px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0',
              height: '30px',
              borderLeft: '2px dashed #0095aa'
            }}></div>
          </div>

          {/* ACCOUNTABILITY */}
          <div style={{ 
            padding: '25px', 
            background: '#fff', 
            borderRadius: '10px', 
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            position: 'relative',
            textAlign: 'center'
          }}>
            {/* Clipboard Icon */}
            <div style={{
              width: '60px',
              height: '60px',
              margin: '0 auto 15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="#0095aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5C15 5.53043 14.7893 6.03914 14.4142 6.41421C14.0391 6.78929 13.5304 7 13 7H11C10.4696 7 9.96086 6.78929 9.58579 6.41421C9.21071 6.03914 9 5.53043 9 5Z" stroke="#0095aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 12L11 14L15 10" stroke="#0095aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '1.1rem', color: '#0095aa', marginBottom: '12px', fontWeight: '700', textTransform: 'uppercase' }}>ACCOUNTABILITY</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#666', margin: 0 }}>
              We take the complete ownership of all our decisions and actions and under no circumstances run away from taking the responsibility.
            </p>
          </div>
        </div>
      </div>

      {/* Converging Dotted Lines from Values to Mission */}
      <div style={{
        position: 'relative',
        height: '60px',
        marginBottom: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* Left line from TEAMWORK */}
        <div style={{
          position: 'absolute',
          left: 'calc(50% - 200px)',
          bottom: '0',
          width: '0',
          height: '30px',
          borderLeft: '2px dashed #0095aa',
          transform: 'rotate(-20deg)',
          transformOrigin: 'bottom'
        }}></div>
        {/* Right line from CUSTOMER FIRST */}
        <div style={{
          position: 'absolute',
          right: 'calc(50% - 200px)',
          bottom: '0',
          width: '0',
          height: '30px',
          borderLeft: '2px dashed #0095aa',
          transform: 'rotate(20deg)',
          transformOrigin: 'bottom'
        }}></div>
        {/* Center vertical line */}
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: '0',
          width: '0',
          height: '60px',
          borderLeft: '2px dashed #0095aa'
        }}></div>
      </div>

      {/* Mission Box - Bottom */}
      <div style={{ 
        padding: '40px', 
        background: '#fff', 
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Target Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          background: '#0095aa',
          borderRadius: '50%',
          margin: '0 auto 25px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
            <circle cx="12" cy="12" r="6" stroke="white" strokeWidth="2"/>
            <circle cx="12" cy="12" r="2" fill="white"/>
          </svg>
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: '700', color: '#000', textTransform: 'uppercase' }}>MISSION</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.9', color: '#333', margin: 0 }}>
          To constantly deliver excellent value-based, innovative solutions that are sure to elevate the benchmarks of quality in construction and exceed the expectations of our customers.
        </p>
      </div>
    </div>
  );
};

export default VisionValuesMission;

