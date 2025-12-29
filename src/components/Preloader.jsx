import { useState, useEffect } from 'react';
import './Preloader.css';

const Preloader = ({ onLoadingComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Fallback timeout in case video doesn't trigger onEnded
    const fallbackTimer = setTimeout(() => {
      handleVideoEnd();
    }, 7000); // 7 seconds max

    return () => clearTimeout(fallbackTimer);
  }, []);

  const handleVideoEnd = () => {
    // Wait 2 seconds after video ends
    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        onLoadingComplete();
      }, 500); // Wait for fade out animation
    }, 2000);
  };

  return (
    <div className={`preloader ${fadeOut ? 'fade-out' : ''}`}>
      <div className="preloader-content">
        <video
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="preloader-video"
        >
          <source src="/assets/WhatsApp Video 2025-12-15 at 4.46.35 PM.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Preloader;

