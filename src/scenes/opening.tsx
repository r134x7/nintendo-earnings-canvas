import { Txt, makeScene2D } from "@motion-canvas/2d";

import { createRef, createSignal, DEFAULT, waitFor } from "@motion-canvas/core";

export default makeScene2D(function* (view) {

    const openingTextSignal = createSignal("Test");

    const openingText = "Hello World";

    view.add(
        <Txt 
            text={() => `${openingTextSignal()}`}
        />
    )

    yield* waitFor(5)
})