import React from 'react';

const Section: React.FC = () => {
  return (
    <section>
      <h2>Computing Areas (2)</h2>

      <p>
        The area of the second auxiliar square is a bit trickier to compute.
        However, once we see that our original right triangle appears
        &ldquo;copied&rdquo; within the square, it's clear that the square's
        sides have length <code>a + b</code>. Accordingly, its area is{' '}
        <code>
          (a + b)<sup>2</sup>
        </code>{' '}
        as well.
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
