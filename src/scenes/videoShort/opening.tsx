import { Txt, makeScene2D, Rect } from "@motion-canvas/2d";

import { textBlock } from "../../utils/designs";

import { createRef, createSignal, DEFAULT, loop, all, waitFor } from "@motion-canvas/core";

export default makeScene2D(function* (view) {

    const getText = createRef<Txt>();
    const textBox = createRef<Txt>();
    const loadingBar = createRef<Txt>();

    const textSignal = createSignal("");
    const numberSignal = createSignal(0);

    const lines = new Map<number, string>();

    lines.set(lines.size, "Loading...")

    view.add(
        <>
        <Rect 
            padding={10}
            radius={15}
            fill={"white"}
            ref={textBox}
            layout
            // height={20}
            // width={52}
        >
            <Rect fill={"black"}>
            <Txt
                fontFamily={"Consolas"}
                ref={getText}
                text={() => `${textSignal()}`}
                textWrap={"pre"}
                fill={"white"}
                marginLeft={16}
                marginRight={16}
            />
            </Rect>
        </Rect>
        <Rect 
            y={80}
            x={-160}
            padding={10}
            radius={15}
            fill={"white"}
            ref={loadingBar}
            layout
            // height={20}
            // width={52}
        >
            <Rect fill={"black"} height={30}>
            </Rect>
        </Rect>
        </>
    )

    const size = textBox().size();

    yield* loop(
        lines.get(0).length,
        i => all(
         textBlock(lines.get(0), 10, textSignal, numberSignal, 0.07, 0.5),
         loadingBar().size.x(10, 1),
         loadingBar().x(-150, 0).to(150, 1)
        ) 
    )

    yield* waitFor(0.34)

    // textSignal(DEFAULT)
    // numberSignal(DEFAULT)

    // yield* loop(
    //     lines.get(0).length,
    //     i => all(
    //      textBlock(lines.get(0), 10, textSignal, numberSignal, 0.07, 0.5),
    //      loadingBar().size.x(20, 0),
    //      loadingBar().x(-150, 0.12)
    //     ) 
    // )

    // textSignal(DEFAULT)
    // numberSignal(DEFAULT)

    // yield* loop(
    //     lines.get(0).length,
    //     i => textBlock(lines.get(0), 10, textSignal, numberSignal, 0.07, 0.5)
    // )

    // textSignal(DEFAULT)
    // numberSignal(DEFAULT)

    // yield* loop(
    //     lines.get(0).length,
    //     i => textBlock(lines.get(0), 10, textSignal, numberSignal, 0.07, 0.5)
    // )

    // textSignal(DEFAULT)
    // numberSignal(DEFAULT)

    // yield* loop(
    //     lines.get(0).length,
    //     i => textBlock(lines.get(0), 10, textSignal, numberSignal, 0.07, 0.5)
    // )

    // textSignal(DEFAULT)
    // numberSignal(DEFAULT)

    // yield* loop(
    //     lines.get(0).length,
    //     i => textBlock(lines.get(0), 10, textSignal, numberSignal, 0.07, 0.5)
    // )

    // textSignal(DEFAULT)
    // numberSignal(DEFAULT)

    // yield* loop(
    //     lines.get(0).length,
    //     i => textBlock(lines.get(0), 10, textSignal, numberSignal, 0.07, 0.5)
    // )

    // textSignal(DEFAULT)
    // numberSignal(DEFAULT)

    // yield* loop(
    //     lines.get(0).length,
    //     i => textBlock(lines.get(0), 10, textSignal, numberSignal, 0.07, 0.5)
    // )
    // textSignal(DEFAULT)
    // numberSignal(DEFAULT)

    // yield* loop(
    //     lines.get(0).length,
    //     i => textBlock(lines.get(0), 10, textSignal, numberSignal, 0.02, 0.4)
    // )

})
