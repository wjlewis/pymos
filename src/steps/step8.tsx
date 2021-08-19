import React from 'react';

const Section: React.FC = () => {
  return (
    <section>
      <h2>Putting It All Together</h2>

      <p>
        In other words, the area of the first auxiliary square is{' '}
        <code>
          a<sup>2</sup> + b<sup>2</sup> + 4A
        </code>{' '}
        (where <code>A</code> is the area of the right triangle), and the area
        of the second auxiliary square is{' '}
        <code>
          c<sup>2</sup> + 4A
        </code>
        . But the two auxiliary square have <em>the same area</em>, so these two
        expressions are equal:{' '}
        <code>
          a<sup>2</sup> + b<sup>2</sup> + 4A = c<sup>2</sup> + 4A
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
