import { Txt, makeScene2D } from "@motion-canvas/2d";

import { createRef, createSignal, DEFAULT, waitFor, all, tween, Thread, ThreadGenerator, SimpleSignal, delay, loop } from "@motion-canvas/core";

export default makeScene2D(function* (view) {

    const openingTextSignal = createSignal("");
    const numberSignal = createSignal(0);

    const openingText = "Hello World".split("");

    view.add(
        <Txt 
            text={() => `${openingTextSignal()} and ${numberSignal()}`}
        />
    )

    yield* delay(
        2,
        loop(
            openingText.length,
            i => {
                openingTextSignal(openingTextSignal() + openingText[i])
            }
        )
    )
    yield* waitFor(5)

    // yield* delay(0.7, numberSignal(3))
    // yield* waitFor(1)
    // openingTextSignal("e")

    // yield* waitFor(1)
    // openingTextSignal(openingTextSignal() + openingText.pop())
    // yield* waitFor(2)

    // yield* all(
    //     ...openingText.map((elem, index, array) => {
    //         // yield waitFor(0.6);
    //         openingTextSignal(elem)
    //     })
    // )
    // yield* numberSignal(numberSignal() + 10, 3)
    // yield* openingTextSignal("3", 3)
    // yield* openingText.map((elem, index, array) => {
    //     waitFor(1)
    //     openingTextSignal(openingTextSignal() + elem)
    // })

})

// function* singleMessage(text: string, getSignal: SimpleSignal<string, void>): ThreadGenerator {
//     waitFor(1)
//     yield;

// }