import React, { useEffect, useState } from 'react';

interface HeroHeaderProps {
  imageSrc: string;
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const HeroHeader: React.FC<HeroHeaderProps> = ({
  imageSrc,
  title,
  description,
  buttonText,
  onButtonClick
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate parallax offset - adjust the division factor to control parallax intensity
  const parallaxOffset = scrollPosition / 2;

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 w-full h-[120%]" // Extra height for parallax movement
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          transform: `translateY(${parallaxOffset}px)`,
          transition: 'transform 0.1s cubic-bezier(0,0,0.2,1)', // Smooth transition for performance
          willChange: 'transform', // Optimization for animations
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Container - No parallax effect on content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 md:px-8 lg:px-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6"
          >
            {title}
          </h1>
          <p 
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            {description}
          </p>
          {buttonText && (
            <button
              onClick={onButtonClick}
              className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold 
                       hover:bg-gray-100 transition-colors duration-200
                       transform hover:scale-105"
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroHeader;