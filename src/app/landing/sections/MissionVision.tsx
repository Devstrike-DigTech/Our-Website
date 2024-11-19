import React from 'react';

interface MissionVisionProps {
  mission: string;
  vision: string;
}

const MissionVision: React.FC<MissionVisionProps> = ({ mission, vision }) => {
  return (
    <section className="w-full py-16 md:py-24" style={{
      background: 'linear-gradient(to bottom, #931F5A, #353B77)'
    }}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Grid container */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Mission Column */}
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Mission
            </h2>
            <p className="text-white/90 text-base md:text-lg leading-relaxed text-justify">
              {mission}
            </p>
          </div>

          {/* Vision Column */}
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Vision
            </h2>
            <p className="text-white/90 text-base md:text-lg leading-relaxed text-justify">
              {vision}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;