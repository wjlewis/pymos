import React from 'react';

const Section: React.FC = () => {
  return (
    <section>
      <h2>Computing Areas (1)</h2>

      <p>
        What are the areas of these auxiliary squares? We can see that the one
        containing the two smaller squares has a side length of{' '}
        <code>a + b</code>, so its area is{' '}
        <code>
          (a + b)<sup>2</sup>
        </code>
        .
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
