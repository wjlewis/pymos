import React from 'react';
import * as L from './locations';
import { StepProps } from './index';
import { StateContext, RightTriangle } from '../state';
import { Anim, Extras as AnimExtras } from '../tools';
import ControlPoints from '../ControlPoints';
import MainTriangle from '../MainTriangle';
import Polygon from '../Polygon';

const Section: React.FC = () => {
  return (
    <section>
      <h2>Epilogue: Is this a proof?</h2>

      <p>
        We're now in a position to ask two important questions:{' '}
        <em>
          in what sense have we <b>proven</b> the Pythagorean Theorem?
        </em>{' '}
        and{' '}
        <em>
          in what sense is the Pythagorean Theorem <b>true</b>?
        </em>
        .
      </p>

      <h3>Missing Pieces</h3>

      <p>
        While the preceding pages make a fairly convincing case, there are
        compelling reasons to withhold the lofty title of &ldquo;proof&rdquo;
        for the time being. For example, we quite casually conjured a variety of
        geometric figures around our original right triangle without offering
        any insight regarding <em>how</em> to construct them. A more persuasive
        argument would first show that these objects <em>can</em> in fact be
        constructed (perhaps by showing how to do so).
      </p>

      <p>
        If this objection seems trifling, consider the following two requests:{' '}
        <em>construct a triangle whose angles sum to 120&deg;</em>, and{' '}
        <em>
          construct a square whose area equals that of a circle of radius{' '}
          <code>r</code>
        </em>
        . Is it possible to execute these commands? The first appears to violate
        a fundamental property of triangles (whose angles sum to 180&deg;), and
        it's unclear whether the second one is possible, particularly without
        further details.
      </p>

      <p>
        What we desire then, is a set of rules indicating what the possible
        &ldquo;moves&rdquo; are for constructing figures, along with some
        principles describing how these figures relate to one another. As an
        example, the legal moves might include drawing a line between two
        established points, creating a circle between two points, adding a point
        where two lines intersect, etc.
      </p>

      <h3>Which System to Choose?</h3>

      <p>
        Unfortunately, rather than resolve the issue described above, the
        prospect of choosing a system prompts the following obvious question:{' '}
        <em>which system to choose?</em>. The{' '}
        <a
          href="https://en.wikipedia.org/wiki/Non-Euclidean_geometry#Importance"
          target="_blank"
          rel="noreferrer"
        >
          unsettling discovery
        </a>{' '}
        that there exist many systems that adequately model our conceptions of
        geometry means that such a choice is non-trivial. It also answers our
        second question with a definitive{' '}
        <a
          href="https://en.wikipedia.org/wiki/Mu_(negative)#%22Unasking%22_the_question"
          target="_blank"
          rel="noreferrer"
        >
          <b>mu</b>
        </a>
        : it makes no sense to ask &ldquo;is the Pythagorean Theorem <b>true</b>
        ?&rdquo;; we can only ask &ldquo;is the Pythagorean Theorem{' '}
        <b>true in system X</b>
        ?&rdquo;.
      </p>

      <h3>Fallibility</h3>

      <p>
        Suppose you offer a friend a proof <code>p</code> of some statement{' '}
        <code>s</code>. If it's a fairly complicated proof, they might ask you
        to sit down and walk them through it. They might even question certain
        aspects of it and prompt you to argue that your proof is in fact
        correct. This defense of your proof is yet <em>another</em>{' '}
        proof&mdash;a <em>meta-</em>proof&mdash;which we might call{' '}
        <code>
          p<sub>1</sub>
        </code>
        . But why stop there? Perhaps your friend is a cranky skeptic and asks
        for justification of{' '}
        <code>
          p<sub>1</sub>
        </code>
        . And so you might provide{' '}
        <code>
          p<sub>2</sub>
        </code>{' '}
        (a <em>meta-meta-proof</em> proving that{' '}
        <code>
          p<sub>1</sub>
        </code>{' '}
        is a proof of <code>p</code>),{' '}
        <code>
          p<sub>3</sub>
        </code>
        , etc.
      </p>

      <p>We can summarize the issues underlying this exchange as follows:</p>

      <blockquote>
        <em>
          A proof, which exhibits the truth of a statement, is itself just
          another statement.
        </em>
      </blockquote>

      <p>
        We're accumstomed to think of statements and proofs in a stratified
        fashion: statements (and the mathematical objects they reference) are
        inert &ldquo;things&rdquo;; proofs, on the other hand, are{' '}
        <em>about</em> these things, and as such they inhabit some realm above
        statements. However, this neat structure is flattened when our skeptical
        colleague pushes our complicated proof into the level of mathematical
        statements.
      </p>

      <h3>Moving Forward</h3>

      <p>
        It's suprisingly easy to contract a crippling case of what we might call
        &ldquo;metamathematical nihilism&rdquo;. In such cases it pays to
        remember that although proof is the most important tool of mathematics,
        mathematics is chiefly concerned with <em>discovery</em>. This is not
        encouragement to dispense with rigor: after all, a discovery is only
        worth the name if it's backed up by a proof. Rather, it's a simple
        reminder that the modes in which we work, the &ldquo;intuitive&rdquo;
        and &ldquo;rigorous&rdquo;, the &ldquo;active&rdquo; and
        &ldquo;contemplative&rdquo;, are often in competition and do best when
        exercised independently.
      </p>

      <p>
        To that end, it's time for me to grab a compass and straightedge, and
        get to work.
      </p>

      <h2>Notes</h2>

      <p>
        I first saw this proof in Paul Lockhart's book <em>Measurement</em>,
        although variations are well-known and widespread. I find Lockhart's
        view of mathematics refreshing, and highly recommend any of his
        writings.
      </p>

      <p>
        I owe many of my thoughts on the topics of proof, truth, and fallibility
        to Douglas Hofstadter, Robert Pirsig,{' '}
        <a
          href="https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/book.html"
          target="_blank"
          rel="noreferrer"
        >
          Hal Abelson, Gerry Sussman
        </a>
        , Thomas Kuhn,{' '}
        <a href="https://metarationality.com/" target="_blank" rel="noreferrer">
          David Chapman
        </a>
        , and others.
      </p>

      <p>
        This webpage is written using React (with TypeScript), and I created the
        animations using a small collection of combinators along with some
        special-purpose hooks. For more information, see the{' '}
        <a
          href="https://github.com/wjlewis/pymos"
          target="_blank"
          rel="noreferrer"
        >
          source
        </a>
        .
      </p>
    </section>
  );
};

const Graphics: React.FC<StepProps> = ({ frame }) => {
  const { state } = React.useContext(StateContext);

  const angles = React.useMemo(() => animAngles(state.tri), [state.tri]);

  const {
    anglePath,
    angleMeasure1APath,
    angleMeasure1BPath,
    angleMeasure2Path,
    angleMeasure3APath,
    angleMeasure3BPath,
    angleMeasure4Path,
  } = angles.fn(frame);

  return (
    <>
      <Polygon className="main-square dim " pts={L.aSquare(state.tri)} />
      <Polygon className="main-square dim " pts={L.bSquare(state.tri)} />
      <Polygon className="main-square" pts={L.cSquare(state.tri)} />

      <MainTriangle />

      <path className="angle-measure inside" d={angleMeasure1APath} />
      <path className="angle-measure inside" d={angleMeasure1BPath} />

      <path className="angle-measure inside" d={angleMeasure2Path} />

      <path className="angle-measure" d={angleMeasure3APath} />
      <path className="angle-measure" d={angleMeasure3BPath} />

      <path className="angle-measure" d={angleMeasure4Path} />

      <Polygon className="angle-path" d={anglePath} opacity={0} />

      <Polygon
        className="aux-square"
        pts={L.cAuxSquare(state.tri)}
        opacity={0}
      />

      <ControlPoints />
    </>
  );
};

function animAngles(tri: RightTriangle): Anim<AnimAnglesState> {
  const angleMeasure1R = L.hr(tri).length() / 2;
  const angleMeasure2R = L.vr(tri).length() / 2;

  return Anim.Fork({
    anglePath: AnimExtras.SvgPath([tri.h, tri.v, L.c1(tri)], 1200, false),
    angleMeasure1APath: Anim.Wait('', 300).then(
      AnimExtras.SvgArc(tri.h, L.hv(tri), L.hr(tri), angleMeasure1R, 500)
    ),
    angleMeasure1BPath: Anim.Wait('', 300).then(
      AnimExtras.SvgArc(tri.h, L.hv(tri), L.hr(tri), angleMeasure1R - 6, 500)
    ),
    angleMeasure2Path: Anim.Wait('', 600).then(
      AnimExtras.SvgArc(tri.v, L.vh(tri), L.vr(tri), angleMeasure2R, 500)
    ),
    angleMeasure3APath: Anim.Wait('', 1000).then(
      AnimExtras.SvgArc(tri.v, L.vC1(tri), L.vCAuxV(tri), angleMeasure1R, 500)
    ),
    angleMeasure3BPath: Anim.Wait('', 1000).then(
      AnimExtras.SvgArc(
        tri.v,
        L.vC1(tri),
        L.vCAuxV(tri),
        angleMeasure1R - 6,
        500
      )
    ),
    angleMeasure4Path: Anim.Wait('', 1300).then(
      AnimExtras.SvgArc(
        L.c1(tri),
        L.c1V(tri),
        L.c1CAuxV(tri),
        angleMeasure2R,
        500
      )
    ),
  });
}

interface AnimAnglesState {
  anglePath: string;
  angleMeasure1APath: string;
  angleMeasure1BPath: string;
  angleMeasure2Path: string;
  angleMeasure3APath: string;
  angleMeasure3BPath: string;
  angleMeasure4Path: string;
}

const step = {
  section: Section,
  graphics: Graphics,
  duration: 1800,
};

export default step;
