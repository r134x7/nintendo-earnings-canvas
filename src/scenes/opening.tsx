import { Txt, makeScene2D } from "@motion-canvas/2d";

import { createRef, createSignal, DEFAULT, waitFor, all, tween, Thread, ThreadGenerator, SimpleSignal, delay, loop, sequence, chain } from "@motion-canvas/core";

export default makeScene2D(function* (view) {

    const openingTextSignal = createSignal("");
    const numberSignal = createSignal(0);

    const openingText = "Hello World".split("");

    const getText = createRef<Txt>();

    view.add(
        <Txt 
            ref={getText}
            text={() => `${openingTextSignal()} and ${numberSignal()}`}
            lineHeight={"150%"}
        />
    )

    yield* loop(
        openingText.length,
        i => singleMessage(openingText, openingTextSignal, numberSignal, 1)
    )

    // yield* delay(
    //     2,
    //     loop(
    //         openingText.length,
    //         i => {
    //             openingTextSignal(openingTextSignal() + openingText[i])
    //         }
    //     )
    // )
    // yield* all(
    //     waitFor(1),
    //     loop(
    //         openingText.length,
    //         i => {
    //             waitFor(100000)
    //             openingTextSignal(openingTextSignal() + openingText[i])
    //         } 
    //     )
    // ) 
    // yield* loop(
    //         openingText.length,
    //         i => delay(5, getText().text(openingText[i]))
    // )
    // yield* waitFor(5)

    // yield* waitFor(1)
    // openingTextSignal(openingTextSignal() + openingText[numberSignal()])
    // numberSignal(numberSignal() + 1)
    // yield* waitFor(1)
    // openingTextSignal(openingTextSignal() + openingText[numberSignal()])
    // numberSignal(numberSignal() + 1)
    // yield* waitFor(1)
    // openingTextSignal(openingTextSignal() + openingText[numberSignal()])
    // numberSignal(numberSignal() + 1)
    // yield* waitFor(1)
    // openingTextSignal(openingTextSignal() + openingText[numberSignal()])
    // numberSignal(numberSignal() + 1)

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

function* singleMessage(text: string[], getSignal: SimpleSignal<string, void>, getIndex: SimpleSignal<number, void>, delay: number): ThreadGenerator {
    yield* waitFor(delay)
    getSignal(getSignal() + text[getIndex()])
    getIndex(getIndex() + 1)
}