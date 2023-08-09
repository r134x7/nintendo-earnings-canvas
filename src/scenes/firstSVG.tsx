import { makeScene2D, Img } from "@motion-canvas/2d";
import { Direction, all, createRef, slideTransition, waitFor } from "@motion-canvas/core";

import something from "../assets/episode1/rect3.svg"
import something2 from "../assets/episode1/firstDrawing.svg"

export default makeScene2D(function* (view) {

    const ref = createRef<Img>();

    view.add(
        <Img 
            ref={ref}
            src={something2}
        />
    )

    yield* slideTransition(Direction.Right);

    // yield* ref().x(-200, 1)
    yield* all(
        ref().x(-200, 1),
        ref().y(200, 1)
    )

    yield* slideTransition(Direction.Right);

    yield* waitFor(4)
})