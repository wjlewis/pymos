export class DragSubject {
  private type: Type;
  private hOffset?: number;
  private vOffset?: number;

  static None(): DragSubject {
    const out = new DragSubject();
    out.type = Type.None;
    return out;
  }

  static RVertex(hOffset: number, vOffset: number): DragSubject {
    const out = new DragSubject();
    out.type = Type.RVertex;
    out.hOffset = hOffset;
    out.vOffset = vOffset;
    return out;
  }

  static HVertex(): DragSubject {
    const out = new DragSubject();
    out.type = Type.HVertex;
    return out;
  }

  static VVertex(): DragSubject {
    const out = new DragSubject();
    out.type = Type.VVertex;
    return out;
  }

  match<A>(handlers: Match<A>): A {
    switch (this.type) {
      case Type.None:
        return handlers.none();
      case Type.RVertex:
        return handlers.r(this.hOffset as number, this.vOffset as number);
      case Type.HVertex:
        return handlers.h();
      case Type.VVertex:
        return handlers.v();
    }
  }
}

enum Type {
  None = 'None',
  RVertex = 'RVertex',
  HVertex = 'HVertex',
  VVertex = 'VVertex',
}

export interface Match<A> {
  none: () => A;
  r: (hOffset: number, vOffset: number) => A;
  h: () => A;
  v: () => A;
}
