import { Rect, makeScene2D } from "@motion-canvas/2d";
import { createRef, waitFor } from "@motion-canvas/core";

export default makeScene2D(function* (view) {

    const rectA = createRef<Rect>();

    view.add(
        <Rect 
            ref={rectA}
            width={300}
            height={300}
            fill={"purple"}
        />
    )

    yield* waitFor(5)
})