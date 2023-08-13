import { Circle, makeScene2D } from "@motion-canvas/2d";
import { createRef, waitFor } from "@motion-canvas/core";

export default makeScene2D(function* (view) {

    const ellipseA = createRef<Circle>();

    view.add(
        <Circle 
            ref={ellipseA}
            width={200}
            height={100}
            fill="yellow"
        />
    )

    yield* waitFor(5)
})