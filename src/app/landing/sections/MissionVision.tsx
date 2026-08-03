import React from 'react';

interface MissionVisionProps {
  mission: string;
  vision: string;
}

const MissionVision: React.FC<MissionVisionProps> = ({ mission, vision }) => {
  return (
    <section className="container mx-auto px-4 md:px-6 lg:px-8">
      <div
        className="w-full rounded-2xl px-6 py-14 md:px-12 md:py-20"
        style={{ background: 'linear-gradient(135deg, #931F5A 0%, #353B77 100%)' }}
      >
        <div className="mx-auto grid max-w-4xl gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="text-center text-white lg:text-left">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Mission</h2>
            <p className="text-base leading-relaxed text-white/90 md:text-lg">
              {mission}
            </p>
          </div>

          <div className="text-center text-white lg:text-left">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Vision</h2>
            <p className="text-base leading-relaxed text-white/90 md:text-lg">
              {vision}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
