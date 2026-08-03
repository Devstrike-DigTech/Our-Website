import React from 'react';

interface SectionProps {
  id?: string;
  sectionTitle: string;
  header: string;
  subheader?: string;
  body: string;
}

const Section: React.FC<SectionProps> = ({
  id,
  sectionTitle,
  header,
  subheader,
  body
}) => {
  // Split the body text roughly in half at a period for the two-column layout.
  const splitText = () => {
    const sentences = body.split('. ');
    const halfLength = Math.ceil(sentences.length / 2);
    const firstHalf = sentences.slice(0, halfLength).join('. ') + '.';
    const secondHalf = sentences.slice(halfLength).join('. ');
    return [firstHalf, secondHalf];
  };

  const [firstColumn, secondColumn] = splitText();

  return (
    <div id={id} className="container mx-auto px-4 py-14 md:px-6 lg:px-8">
      <p className="mb-3 text-sm font-medium text-primary md:text-base">
        {sectionTitle}
      </p>

      <div className="lg:w-3/4">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl">
          {header}
        </h2>
      </div>

      {subheader && (
        <div className="lg:w-3/4">
          <h3 className="mb-6 text-lg text-gray-700 md:text-xl">
            {subheader}
          </h3>
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-12">
        <p className="text-sm leading-relaxed text-gray-600 md:text-base">
          {firstColumn}
        </p>
        <p className="text-sm leading-relaxed text-gray-600 md:text-base">
          {secondColumn}
        </p>
      </div>
    </div>
  );
};

export default Section;
