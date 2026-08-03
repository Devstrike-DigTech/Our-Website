import React, { useEffect, useRef, useState } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Progress of the section through the viewport: -1 (below) → 1 (above)
      const progress =
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const clamped = Math.min(1, Math.max(0, progress));
      // The image is 120% tall (10% overflow on each side), so ±10% stays covered.
      setOffset((clamped - 0.5) * 0.2 * rect.height);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <div
        ref={containerRef}
        className="relative h-[50vh] w-full overflow-hidden rounded-xl md:h-[60vh] lg:h-[70vh]"
      >
        {/* Background image with contained parallax */}
        <div
          className="absolute -top-[10%] left-0 h-[120%] w-full"
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            transform: `translateY(${offset}px)`,
            willChange: 'transform',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative flex h-full flex-col items-center justify-center px-4 md:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {title && (
              <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:mb-6 lg:text-5xl">
                {title}
              </h1>
            )}
            {description && (
              <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90 md:text-xl">
                {description}
              </p>
            )}
            {buttonText && (
              <button
                onClick={onButtonClick}
                className="rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 transition-colors duration-200 hover:bg-gray-100"
              >
                {buttonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroHeader;
