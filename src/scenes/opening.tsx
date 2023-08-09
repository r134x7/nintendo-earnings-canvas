import { Txt, makeScene2D, Rect } from "@motion-canvas/2d";

import { createRef, createSignal, DEFAULT, waitFor, all, tween, Thread, ThreadGenerator, SimpleSignal, delay, loop, sequence, chain } from "@motion-canvas/core";

export default makeScene2D(function* (view) {

    const openingText = "Hello World".split("");

    // const textBoxFill: string = Array(openingText.length).fill("").join();

    const openingTextSignal = createSignal("");
    const numberSignal = createSignal(0);

    const getText = createRef<Txt>();

    const textBox = createRef<Rect>();

    view.add(
        <Rect 
            padding={10}
            radius={20}
            fill={"white"}
            layout
        >
            <Rect fill={"black"}>
            <Txt 
                ref={getText}
                text={() => `${openingTextSignal()}`}
                lineHeight={"150%"}
                fill={"white"}
            />
            </Rect>
        </Rect>
    )

    yield* loop(
        openingText.length,
        i => singleMessage(openingText, openingTextSignal, numberSignal, 0.17)
    )


})

function* singleMessage(text: string[], getSignal: SimpleSignal<string, void>, getIndex: SimpleSignal<number, void>, delay: number): ThreadGenerator {
    yield* waitFor(delay)

    const charRange = text.join("").slice(0, getIndex() + 1)

    // getSignal(getSignal() + text[getIndex()] + " ".repeat(text.length - getSignal.length))

    // getSignal((charRange + "_".repeat(text.length - charRange.length)))
    getSignal((charRange + " ".repeat(text.length - charRange.length)))

    // getSignal((charRange + "       _"))

    getIndex(getIndex() + 1)

    if (text.length === getIndex()) {
        yield* waitFor(2)
    }
}