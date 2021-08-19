import React from 'react';

const Section: React.FC = () => {
  return (
    <section>
      <h2>Considering the Leftovers (1)</h2>

      <p>
        Now that we know that the areas of the auxiliary squares are equal,
        let's think about each slightly differently. In particular, if we remove
        the 4 copies of the original right triangle from the second auxiliary
        square, we're left with the square whose area is{' '}
        <code>
          c<sup>2</sup>
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
