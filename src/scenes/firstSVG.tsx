import { makeScene2D, Img } from "@motion-canvas/2d";
import { createRef, waitFor } from "@motion-canvas/core";

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

    yield* waitFor(4)
})