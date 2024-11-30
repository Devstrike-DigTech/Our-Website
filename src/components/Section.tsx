import React from 'react';

interface SectionProps {
  sectionTitle: string;
  header: string;
  subheader?: string;
  body: string;
}

const Section: React.FC<SectionProps> = ({
  sectionTitle,
  header,
  subheader,
  body
}) => {
  // Split the body text roughly in half at a period for better content distribution
  const splitText = () => {
    const sentences = body.split('. ');
    const halfLength = Math.ceil(sentences.length / 2);
    const firstHalf = sentences.slice(0, halfLength).join('. ') + '.';
    const secondHalf = sentences.slice(halfLength).join('. ');
    return [firstHalf, secondHalf];
  };

  const [firstColumn, secondColumn] = splitText();

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
      {/* Section Title */}
      <p className="text-primary text-justify font-medium mb-3 text-sm md:text-base">
        {sectionTitle}
      </p>

      {/* Main Header */}
      <div className="lg:w-3/4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          {header}
        </h2>
      </div>

      {/* Optional Subheader */}
      {subheader && (
        <div className="lg:w-3/4">
          <h3 className="text-lg md:text-xl text-gray-700 mb-6">
            {subheader}
          </h3>
        </div>
      )}

      {/* Body Text - Grid layout for larger screens */}
      <div className="mt-8 grid lg:grid-cols-2 gap-6 lg:gap-12">
        <p className="text-sm md:text-base text-gray-600 leading-relaxed text-justify">
          {firstColumn}
        </p>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed text-justify">
          {secondColumn}
        </p>
      </div>
    </div>
  );
};

export default Section;