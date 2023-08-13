import { Circle, makeScene2D } from "@motion-canvas/2d";

import { Direction, createRef, slideTransition } from "@motion-canvas/core";

export default makeScene2D(function* (view) {

    const sectorA = createRef<Circle>();

    view.add(
        <Circle
          ref={sectorA}
          size={160}
          fill={'lightseagreen'}
          startAngle={30}
          endAngle={270}
          closed={true}
        />
      );
    
    yield* slideTransition(Direction.Right);

    yield* sectorA().startAngle(270, 2).to(30, 2);
});