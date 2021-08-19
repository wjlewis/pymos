import React from 'react';

const Section: React.FC = () => {
  return (
    <section>
      <h2>Some Auxiliary Elements</h2>

      <p>
        To start, we construct two larger squares around our original right
        triangle: one containing the largest square, and the other containing
        the two smaller squares.
      </p>
    </section>
  );
};

const Graphics: React.FC = () => {
  return null;
};

const step = {
  section: Section,
  graphics: Graphics,
};

export default step;
