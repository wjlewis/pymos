import React from 'react';

const Section: React.FC = () => {
  return (
    <section>
      <h2>Considering the Leftovers (2)</h2>

      <p>
        We can also remove 4 copies of the original triangle from the first
        auxiliary square. Doing so leaves us with the two smaller squares whose
        areas are{' '}
        <code>
          a<sup>2</sup>
        </code>{' '}
        and{' '}
        <code>
          b<sup>2</sup>
        </code>
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
