import React from 'react';

const Section: React.FC = () => {
  return (
    <section>
      <h2>A Slight Reinterpretation</h2>

      <p>
        We'll begin by reinterpreting the statement{' '}
        <code>
          a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup>
        </code>{' '}
        ever so slightly. In particular, we've constructed squares using each of
        the triangle's sides as a base. Since a square whose side length is{' '}
        <code>l</code> has an area of{' '}
        <code>
          l<sup>2</sup>
        </code>
        , our new interpretation of the Pythagorean Theorem states that the two
        smaller squares together have exactly the same area as the larger
        square.
      </p>

      <p>This is what we'll demonstrate in the steps to come.</p>
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
