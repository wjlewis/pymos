import React from 'react';

const Section: React.FC = () => {
  return (
    <section>
      <h1>A Pythagorean Mosaic</h1>

      <p>
        The celebrated <em>Pythagorean Theorem</em> says that the relationship
        between the lengths of the sides of any right triangle is astonishingly
        simple: specifically, the square of the length of the longest side (the
        &ldquo;hypotenuse&rdquo;) is equal to the sum of the squares of the
        shorter sides. Following convention, if we call the length of the
        hypotenuse <code>c</code>, and the lengths of the remaining sides{' '}
        <code>a</code> and <code>b</code>, the Pythagorean Theorem states that{' '}
        <code>
          a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup>
        </code>
        .
      </p>
      <p>
        How do we <em>know</em> that this is true? Perhaps we could (somehow)
        check a large collection of right triangles to see if this is always the
        case. Although such an effort might instill some confidence, it would be
        far from definitive: inevitably, we'd remain tormented by the nagging
        thought that we'd missed some exotic conjecture-defying triangle.
      </p>
      <p>
        We want something sturdier: a <em>proof</em>. In the remaining pages,
        we'll step through a tidy demonstration of the Pythagorean Theorem.
        Unlike the &ldquo;checking&rdquo; strategy described above, our proof
        will appeal to universal properties of right triangles and other
        geometric figures, rather than relying on the specific details of any
        particular triangle.
      </p>

      <p>
        We'll use the right triangle shown here to illustrate each step. Each of
        the triangle's vertices () can be dragged at any time; this will allow
        us to observe each step with a variety of different triangles.
      </p>
    </section>
  );
};

const Graphics: React.FC = () => {
  return <circle cx="0" cy="0" r="20" fill="red" />;
};

const step = {
  section: Section,
  graphics: Graphics,
};

export default step;
