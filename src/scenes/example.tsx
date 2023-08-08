import {Circle, makeScene2D} from '@motion-canvas/2d';
import {createRef, all} from '@motion-canvas/core';

export default makeScene2D(function* (view) {

  const circleA = createRef<Circle>();

  view.add(
    <Circle 
      ref={circleA}
      x={-500}
      width={200}
      height={200}
      fill="red"
    />
  )

  yield* all(
    circleA().position.x(500, 1).to(-500, 0.5),
    circleA().fill("blue", 1).to("red", 0.5)
  )
});
